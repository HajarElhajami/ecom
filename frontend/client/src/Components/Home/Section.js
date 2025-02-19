


// import React, { useState, useEffect } from "react";
// import { FaTrash } from "react-icons/fa";

// const Section = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then(res => res.json())
//       .then(data => {
//         console.log("📥 البيانات المستلمة:", data);
//         setProducts(data);
//       })
//       .catch(error => console.error("❌ خطأ أثناء جلب المنتجات:", error));
//   }, []);

//   const addToCart = (index) => {
//     setCart([...cart, products[index]]);
//   };

//   const removeFromCart = (index) => {
//     const newCart = [...cart];
//     newCart.splice(index, 1);
//     setCart(newCart);
//   };

//   const total = cart.reduce((acc, item) => acc + item.price, 0);

//   return (
//     <div className="flex flex-col items-center p-5">
//       <div className="flex justify-center gap-10">
//         <div className="grid grid-cols-3 gap-4 w-[150%]">
//           {products.length === 0 ? (
//             <p>🚨 لا توجد منتجات متاحة</p>
//           ) : (
//             products.map((item, index) => (
//               <div
//                 className="border p-4 rounded shadow-lg flex flex-col items-center"
//                 key={index}
//               >
//                 <div className="w-full h-[80%] w-[80%] flex justify-center items-center">
//                   <img
//                     className="max-w-full max-h-full object-cover"
//                     src={`http://localhost:5000${item.image}` || "default_image.png"}
//                     alt={item.name}
//                   />
//                 </div>
//                 <div className="text-center mt-5">
//                   <p className="text-lg mt-1">{item.name}</p>
//                   <p className="text-lg mt-1">{item.description}</p>
//                   <h2 className="text-red-500 mt-2 font-bold text-2xl">
//                     ${item.price}.00
//                   </h2>
//                   <button
//                     className="bg-orange-500 text-white px-4 py-2 rounded mt-3 hover:bg-gray-700 hover:text-orange-500"
//                     onClick={() => addToCart(index)}
//                   >
//                     Add to cart
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="w-3/4 p-5 bg-gray-100 rounded shadow-lg text-center">
//           <h3 className="text-xl font-bold mb-4 p-2 rounded shadow-lg bg-orange-400">
//             My Cart
//           </h3>
//           <div>
//             {cart.length === 0 ? (
//               <p>🛒 السلة فارغة</p>
//             ) : (
//               cart.map((item, index) => (
//                 <div
//                   className="flex justify-between items-center bg-white p-3 rounded mb-2 shadow"
//                   key={index}
//                 >
//                   <div className="flex items-center">
//                     <img
//                       className="w-12 h-12 rounded-full border border-orange-500"
//                       src={`http://localhost:5000${item.image}` || "default_image.png"}
//                       alt={item.name}
//                     />
//                     <p className="ml-4 text-sm">{item.name}</p>
//                     <p className="ml-4 text-sm">{item.name}</p>

//                   </div>
//                   <h2 className="text-sm">${item.price}.000000</h2>
//                   <FaTrash
//                     className="text-red-500 cursor-pointer hover:text-gray-700"
//                     onClick={() => removeFromCart(index)}
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//           <div className="flex justify-between mt-4 border-t pt-2">
//             <h3 className="text-lg font-bold">Total</h3>
//             <h2 className="text-lg text-red-500">${total}.00</h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Section;








import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Section = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("📥 البيانات المستلمة:", data);
        setProducts(data);
      })
      .catch((error) =>
        console.error("❌ خطأ أثناء جلب المنتجات:", error)
      );
  }, []);

  const addToCart = (index) => {
    setCart([...cart, products[index]]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("السلة فارغة، الرجاء إضافة منتجات قبل تقديم الطلب.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          total,
          orderDate: new Date(),
        }),
      });

      if (response.ok) {
        alert("تم تقديم الطلب بنجاح!");
        setCart([]); 
      } else {
        alert("فشل في تقديم الطلب.");
      }
    } catch (error) {
      console.error("❌ خطأ أثناء تقديم الطلب:", error);
      alert("حدث خطأ أثناء تقديم الطلب.");
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex justify-center gap-10">
        <div className="grid grid-cols-3 gap-4 w-[150%]">
          {products.length === 0 ? (
            <p>🚨 لا توجد منتجات متاحة</p>
          ) : (
            products.map((item, index) => (
              <div
                className="border p-4 rounded shadow-lg flex flex-col items-center"
                key={item.id || index}
              >
                <div className="w-[80%] h-[80%] flex justify-center items-center">
                  <img
                    className="max-w-full max-h-full object-cover"
                    src={
                      `http://localhost:5000${item.image}` || "default_image.png"
                    }
                    alt={item.name}
                  />
                </div>
                <div className="text-center mt-5">
                  <p className="text-lg mt-1">{item.name}</p>
                  {/* <p className="text-lg mt-1">{item.description}</p> */}
                  <h2 className="text-red-500 mt-2 font-bold text-2xl">
                    ${item.price}.00
                  </h2>
                  <div className="flex gap-2 mt-3">
                    <button
                      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-gray-700 hover:text-orange-500"
                      onClick={() => addToCart(index)}
                    >
                      Add to cart
                    </button>
                    <Link
                      to={`/product/${item._id}`}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      اطلب الان
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-3/4 p-5 bg-gray-100 rounded shadow-lg text-center">
          <h3 className="text-xl font-bold mb-4 p-2 rounded shadow-lg bg-orange-400">
            My Cart
          </h3>
          <div>
            {cart.length === 0 ? (
              <p>🛒 السلة فارغة</p>
            ) : (
              cart.map((item, index) => (
                <div
                  className="flex justify-between items-center bg-white p-3 rounded mb-2 shadow"
                  key={index}
                >
                  <div className="flex items-center">
                    <img
                      className="w-12 h-12 rounded-full border border-orange-500"
                      src={
                        `http://localhost:5000${item.image}` ||
                        "default_image.png"
                      }
                      alt={item.name}
                    />
                    <p className="ml-4 text-sm">{item.name}</p>
                  </div>
                  <h2 className="text-sm">${item.price}.00</h2>
                  <Link
                    to={`/product/${item._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                      اطلب الان
                    </button>
                  </Link>
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:text-gray-700"
                    onClick={() => removeFromCart(index)}
                  />
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between mt-4 border-t pt-2">
            <h3 className="text-lg font-bold">Total</h3>
            <h2 className="text-lg text-red-500">${total}.00</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;

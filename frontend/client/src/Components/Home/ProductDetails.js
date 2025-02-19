

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [customerInfo, setCustomerInfo] = useState({
//     name: "",
//     phone: "",
//     city: "",
//   });
//   const [isOrderSubmitted, setIsOrderSubmitted] = useState(false); 

//   const handleInputChange = (e) => {
//     setCustomerInfo({
//       ...customerInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOrderSubmit = (e) => {
//     e.preventDefault();
//     console.log("طلب جديد من الزبون:", customerInfo);
//     setIsOrderSubmitted(true); 
//     setTimeout(() => navigate("/"), 3000); 
//   };

//   useEffect(() => {
//     console.log("🔎 معرف المنتج:", id);

//     if (!id) {
//       console.error("❌ لم يتم العثور على معرف المنتج!");
//       return;
//     }

//     fetch(`http://localhost:5000/api/products/${id}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("📥 بيانات المنتج:", data);
//         setProduct(data);
//       })
//       .catch((error) => console.error("❌ خطأ أثناء جلب تفاصيل المنتج:", error))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <p>جاري تحميل بيانات المنتج...</p>;
//   if (!product) return <p>⚠️ المنتج غير موجود.</p>;

//   return (
//     <div className="flex flex-col items-center pt-[80px] ">
//       {isOrderSubmitted ? (
//         <div className="text-center p-6 rounded bg-green-100">
//           <h2 className="text-2xl font-bold text-green-600">شكرًا على طلبك!</h2>
//           <p className="mt-2 text-lg">تم إرسال طلبك بنجاح. نحن نقدر ثقتك بنا!</p>
//         </div>
//       ) : (
//         <div className="flex max-w-7xl w-full p-6 rounded">
//           <div className="w-1/2">
//             <img
//               className="w-full h-[70%] object-cover rounded"
//               src={`http://localhost:5000${product.image}` || "default_image.png"}
//               alt={product.name}
//             />
//           </div>

//           <div className="w-1/2 ml-9">
//             <h2 className="text-4xl text-yellow-900 font-bold">{product.name}</h2>
//             <h3 className="text-yellow-500 mt-5 text-[25px] font-bold text-xl">
//               {product.price} درهم
//             </h3>

//             <form onSubmit={handleOrderSubmit} className="mt-10">
//               <div className="mb-5">
//                 <input
//                   type="text"
//                   name="name"
//                   value={customerInfo.name}
//                   onChange={handleInputChange}
//                   placeholder="الإسم الكامل"
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-5">
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={customerInfo.phone}
//                   onChange={handleInputChange}
//                   placeholder="رقم الهاتف"
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-5">
//                 <input
//                   type="text"
//                   name="city"
//                   value={customerInfo.city}
//                   onChange={handleInputChange}
//                   placeholder="المدينة"
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//               >
//                 اطلب الآن
//               </button>
//             </form><br/>
//             <p className="mt-2 text-yellow-900 text-[16px] ">{product.description}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

















































import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    city: "",
  });
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false); 

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  // قم باستبدال دالة handleOrderSubmit القديمة بهذا الكود الجديد
  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // تكوين بيانات الطلب
    const orderData = {
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerCity: customerInfo.city,
      productId: id, // معرف المنتج الحالي
      // يمكنك إضافة حقول أخرى مثل السعر والكمية إذا كانت مطلوبة
    };

    try {
      // إرسال الطلب إلى الخادم
      await axios.post("http://localhost:5000/api/requests", orderData);
      console.log("تم إرسال الطلب بنجاح:", orderData);
      setIsOrderSubmitted(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error("❌ فشل في إرسال الطلب:", error);
    }
  };

  useEffect(() => {
    if (!id) {
      console.error("❌ لم يتم العثور على معرف المنتج!");
      return;
    }

    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("❌ خطأ أثناء جلب تفاصيل المنتج:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>جاري تحميل بيانات المنتج...</p>;
  if (!product) return <p>⚠️ المنتج غير موجود.</p>;

  return (
    <div className="flex flex-col items-center pt-[80px] ">
      {isOrderSubmitted ? (
        <div className="text-center p-6 rounded bg-green-100">
          <h2 className="text-2xl font-bold text-green-600">شكرًا على طلبك!</h2>
          <p className="mt-2 text-lg">تم إرسال طلبك بنجاح. نحن نقدر ثقتك بنا!</p>
        </div>
      ) : (
        <div className="flex max-w-7xl w-full p-6 rounded">
          <div className="w-1/2">
            <img
              className="w-full h-[70%] object-cover rounded"
              src={`http://localhost:5000${product.image}` || "default_image.png"}
              alt={product.name}
            />
          </div>

          <div className="w-1/2 ml-9">
            <h2 className="text-4xl text-yellow-900 font-bold">{product.name}</h2>
            <h3 className="text-yellow-500 mt-5 text-[25px] font-bold text-xl">
              {product.price} درهم
            </h3>

            <form onSubmit={handleOrderSubmit} className="mt-10">
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="الإسم الكامل"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="رقم الهاتف"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  placeholder="المدينة"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                اطلب الآن
              </button>
            </form>
            <br />
            <p className="mt-2 text-yellow-900 text-[16px] ">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

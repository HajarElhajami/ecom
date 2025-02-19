import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("❌ خطأ في جلب المنتجات");
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    if (newProduct.image) formData.append("image", newProduct.image);

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("❌ فشل في إضافة المنتج");
      const product = await response.json();
      setProducts([...products, product]);
      setShowForm(false);
      setNewProduct({ name: "", price: "", description: "", image: null });
      setPreview(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("❌ فشل في حذف المنتج");

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">📦 المنتجات</h1>

      {/* زر إضافة منتج جديد */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white px-7 py-2 text-[18px] rounded mb-4"
      >
        + إضافة منتج
      </button>

      {/* فورم إضافة منتج */}
      {showForm && (
        <div className="bg-white p-4 rounded shadow-lg mb-4">
          <h2 className="text-xl font-semibold mb-5">🆕 إضافة منتج جديد</h2>
          <input
            className="border p-2 w-full mb-3"
            placeholder="اسم المنتج"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            className="border p-2 w-full mb-3"
            type="number"
            placeholder="السعر"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            className="border p-2 w-full mb-3"
            placeholder="الوصف"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />

          <label className="border border-dashed border-gray-400 w-full h-32 flex flex-col items-center justify-center cursor-pointer bg-gray-100 rounded-lg">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500">🖼️ إضافة صور</span>
            )}
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <br />
          <button
            onClick={addProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            إضافة
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
          >
            إلغاء
          </button>
        </div>
      )}

      {loading && <p>⏳ جاري تحميل المنتجات...</p>}
      {error && <p className="text-red-500">❌ حدث خطأ: {error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded shadow-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 text-left">صورة</th>
              <th className="py-2 px-4 text-left">الاسم</th>
              <th className="py-2 px-4 text-left">السعر</th>
              <th className="py-2 px-4 text-left">الطلبات</th>
              <th className="py-2 px-4 text-left">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 font-medium">{product.name}</td>
                <td className="py-2 px-4 text-green-600 font-bold">
                  {product.price} د.م
                </td>
                <td className="py-2 px-4">{product.orders || 0}</td>
                <td className="py-2 px-4">
                  <button
                    className="mr-2 text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setSelectedProduct(product);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] h-auto">
            <h2 className="text-2xl text-center font-semibold mb-4">
              تعديل المنتج
            </h2>
            <img
              src={`http://localhost:5000${selectedProduct.image}`}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-gray-600 text-center mt-2">
              {selectedProduct.description}
            </p>
            <p className="text-green-600 text-xl font-bold text-center mt-2">
              {selectedProduct.price} د.م
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;

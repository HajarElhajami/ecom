import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]); // 🔹 أعطينا `products` قيمة افتراضية []

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("📥 المنتجات:", data);
        setProducts(data); // ✅ تحديث الحالة بالبيانات المسترجعة
      })
      .catch((error) => console.error("❌ خطأ أثناء جلب المنتجات:", error));
  }, []);

  if (!products.length) {
    return <p>⚠️ لا توجد منتجات متاحة.</p>; // ✅ تجنب تنفيذ map() على undefined
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <Link to={`/product/${product._id}`}>
            <button>عرض التفاصيل</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Products;

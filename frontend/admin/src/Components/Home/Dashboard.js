import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productRes = await fetch('http://localhost:5000/api/products');
        if (!productRes.ok) throw new Error('❌ خطأ أثناء جلب المنتجات');
        const products = await productRes.json();
        setProductCount(products.length);

        const orderRes = await fetch('http://localhost:5000/api/requests');
        if (!orderRes.ok) throw new Error('❌ خطأ أثناء جلب الطلبات');
        const orders = await orderRes.json();
        setOrderCount(orders.length);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl text-center pt-[5%] font-semibold mb-4">📊 الصفحة الرئيسية</h1>

      {loading && <p className="text-center text-blue-500">⏳ جاري تحميل البيانات...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 pt-10 gap-6">
       <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <p className="text-center text-xl font-semibold">📦 عدد المنتجات</p>
          <h3 className="text-3xl text-center pt-3 font-bold">{productCount}</h3>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <p className="text-center text-xl font-semibold">🛒 الطلبات الجديدة</p>
          <h3 className="text-3xl text-center pt-3 font-bold">{orderCount}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

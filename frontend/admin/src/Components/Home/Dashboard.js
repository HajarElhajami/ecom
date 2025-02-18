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
        const response = await fetch('http://localhost:5000/api/products'); 
        if (!response.ok) {
          throw new Error('حدث خطأ في الاتصال بالـ API');
        }
        const data = await response.json();
        setProductCount(data.length);  
        setOrderCount(0);      
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
      <h1 className="text-4xl text-center pt-[5%] font-semibold mb-4">الصفحة الرئيسية</h1>
      {loading && <p>جاري تحميل البيانات...</p>}
      {error && <p className="text-red-500">حدث خطأ: {error}</p>}

      <div className="grid grid-cols-2 pt-[10%] gap-6">
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className='text-center text-xl'>عدد المنتجات</p>
          <h3 className="text-2xl text-center pt-3">{productCount}</h3>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className='text-center text-xl'>الطلبات الجديدة</p>
          <h3 className="text-2xl text-center pt-3">{orderCount}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

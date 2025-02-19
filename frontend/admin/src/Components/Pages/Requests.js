import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Requests = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/requests");
        setOrders(response.data);
      } catch (error) {
        console.error("❌ فشل في جلب الطلبات:", error);
      }
    };
    fetchOrders();
  }, []);
  const handleDelete = async (orderId) => {
    const confirmed = window.confirm("هل أنت متأكد أنك تريد حذف هذا الطلب؟");
    if (!confirmed) return;
  
    try {
      // التأكد من المسار الذي يستدعي الـ backend لحذف الطلب
      const response = await axios.delete(`http://localhost:5000/api/requests/${orderId}`);
      console.log(response.data);  // طباعة الرد للتأكد من أن الحذف تم بنجاح
  
      // تحديث الواجهة الأمامية بحذف الطلب من الذاكرة
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  
      alert("✅ تم حذف الطلب بنجاح");
    } catch (error) {
      console.error("❌ فشل في حذف الطلب:", error);  // طباعة الخطأ
      alert("❌ حدث خطأ أثناء حذف الطلب");
    }  
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">صفحة الطلبات</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">رقم الطلب</th>
              <th className="py-2 px-4 border-b">اسم المنتج</th>
              <th className="py-2 px-4 border-b">اسم العميل</th>
              <th className="py-2 px-4 border-b">الهاتف</th>
              <th className="py-2 px-4 border-b">المدينة</th>
              <th className="py-2 px-4 border-b">السعر</th>
              <th className="py-2 px-4 border-b">التاريخ</th>
              <th className="py-2 px-4 border-b">الحالة</th>
              <th className="py-2 px-4 border-b">إجراءات</th> {/* إضافة عمود الإجراءات */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id || index} className="text-center">
                <td className="py-2 px-4 border-b">{order._id}</td>
                <td className="py-2 px-4 border-b">{order?.product?.name}</td>
                <td className="py-2 px-4 border-b">{order.customerName}</td>
                <td className="py-2 px-4 border-b">{order.customerPhone}</td>
                <td className="py-2 px-4 border-b">{order.customerCity}</td>
                <td className="py-2 px-4 border-b">{order?.product?.price} درهم</td>
                <td className="py-2 px-4 border-b">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(order._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;

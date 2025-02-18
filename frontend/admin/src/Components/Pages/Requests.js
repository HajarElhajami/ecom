import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div>
      <h1>الطلبات</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>الطلب رقم: {order._id}</p>
            <p>المبلغ الإجمالي: {order.totalAmount} DH</p>
            <p>الحالة: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requests;

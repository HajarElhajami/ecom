
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-blue-800 text-white p-6 h-screen">
      <h2 className="text-[29px] font-bold">لوحة التحكم</h2>
      <nav className="mt-10 text-[20px] space-y-4">
        <Link className="block hover:underline hover:text-gray-300" to="/">
          الصفحة الرئيسية
        </Link>
        <Link className="block hover:underline hover:text-gray-300" to="/products">
          المنتجات
        </Link>
        <Link className="block hover:underline hover:text-gray-300" to="/users">
          المستخدمون
        </Link>
        <Link className="block hover:underline hover:text-gray-300" to="/requests">
          الطلبات
        </Link>
        <Link className="block hover:underline hover:text-gray-300" to="/settings">
          الإعدادات
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;

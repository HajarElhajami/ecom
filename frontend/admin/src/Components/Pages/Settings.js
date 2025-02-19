import React, { useState } from "react";

function Settings() {
  const [name, setName] = useState("مستخدم مجهول");
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    alert("✅ تم حفظ الإعدادات بنجاح!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white  mt-[100px]">
      <h1 className="text-3xl font-bold text-center mb-10">⚙️ إعدادات الحساب</h1>

      {/* اسم المستخدم */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">👤 الاسم الكامل</label>
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">📧 البريد الإلكتروني</label>
        <input
          type="email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">🔒 كلمة المرور الجديدة</label>
        <input
          type="password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <button
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        onClick={handleSave}
      >
         حفظ التعديلات
      </button>
    </div>
  );
}

export default Settings;

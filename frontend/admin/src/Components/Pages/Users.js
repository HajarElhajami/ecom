import React, { useState, useEffect } from "react";
import { HiMiniTrash, HiMiniPencil } from "react-icons/hi2";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (!response.ok) throw new Error("❌ فشل في جلب المستخدمين");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateUser = async () => {
    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `http://localhost:5000/api/users/${selectedUser._id}`
      : "http://localhost:5000/api/users";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error("❌ فشل في العملية");

      const updatedUser = await response.json();

      if (editMode) {
        setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
        setMessage("✅ تم تحديث المستخدم بنجاح!");
      } else {
        setUsers([...users, updatedUser]);
        setMessage("✅ تم إضافة المستخدم بنجاح!");
      }

      setShowForm(false);
      setNewUser({ name: "", email: "", role: "user" });
      setEditMode(false);
      setSelectedUser(null);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("❌ فشل في حذف المستخدم");

      setUsers(users.filter((user) => user._id !== id));
      setMessage("🗑️ تم حذف المستخدم بنجاح!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">👤 إدارة المستخدمين</h1>
      {message && <p className="bg-green-200 text-green-700 p-2 rounded mb-3">{message}</p>}

      <button onClick={() => setShowForm(true)} className="bg-green-500 text-white px-5 py-2 rounded my-4">
        + إضافة مستخدم
      </button>

      {showForm && (
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">{editMode ? "✏️ تعديل المستخدم" : "🆕 إضافة مستخدم"}</h2>
          <input className="border p-2 w-full mb-3" placeholder="الاسم" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <input className="border p-2 w-full mb-3" type="email" placeholder="البريد الإلكتروني" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <select className="border p-2 w-full mb-3" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
            <option value="user">مستخدم</option>
            <option value="admin">مسؤول</option>
          </select>

          <button onClick={handleAddOrUpdateUser} className="bg-blue-600 text-white px-4 py-2 rounded">
            {editMode ? "تحديث" : "إضافة"}
          </button>
          <button onClick={() => { setShowForm(false); setEditMode(false); }} className="ml-2 bg-gray-400 text-white px-4 py-2 rounded">
            إلغاء
          </button>
        </div>
      )}

      {loading && <p>⏳ جاري تحميل المستخدمين...</p>}
      {error && <p className="text-red-500">❌ حدث خطأ: {error}</p>}

      <div className="grid grid-cols-3 gap-6 mt-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-green-500 font-semibold">{user.role === "admin" ? "🛠️ مسؤول" : "👤 مستخدم"}</p>

              <div className="flex mt-3">
                <button onClick={() => { setShowForm(true); setEditMode(true); setSelectedUser(user); setNewUser({ name: user.name, email: user.email, role: user.role }); }} className="bg-yellow-500 text-white px-3 py-1 rounded mx-1">
                  <HiMiniPencil />
                </button>
                <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  <HiMiniTrash />
                </button>
              </div>
            </div>
          ))
        ) : (!loading && <p className="text-gray-500">⚠️ لا يوجد مستخدمون متاحون</p>)}
      </div>
    </div>
  );
}

export default Users;

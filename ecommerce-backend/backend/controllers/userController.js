const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // MongoDB
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "❌ فشل في جلب المستخدمين" });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) return res.status(400).json({ message: "❌ الاسم والإيميل مطلوبان" });

    const newUser = new User({ name, email, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "❌ فشل في إضافة المستخدم" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "❌ المستخدم غير موجود" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "❌ فشل في تحديث المستخدم" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) return res.status(404).json({ message: "❌ المستخدم غير موجود" });

    res.json({ message: "✅ تم حذف المستخدم بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "❌ فشل في حذف المستخدم" });
  }
};

module.exports = { getUsers, addUser, updateUser, deleteUser };

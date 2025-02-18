const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;
    if (!user || !products || !totalAmount) {
      return res.status(400).json({ message: "❌ جميع الحقول مطلوبة" });
    }

    const newOrder = new Order({ user, products, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "❌ فشل في إنشاء الطلب", error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "❌ فشل في جلب الطلبات" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user products.product");
    if (!order) {
      return res.status(404).json({ message: "❌ الطلب غير موجود" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "❌ فشل في جلب الطلب" });
  }
};

module.exports = { createOrder, getOrders, getOrderById };

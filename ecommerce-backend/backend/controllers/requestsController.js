const Order = require("../models/Requests"); // تأكد أن الاسم متطابق

const createOrder = async (req, res) => {
  console.log("✅ بدء إنشاء الطلب...");
  
  try {
    const { customerName, customerPhone, customerCity, productId } = req.body;

    if (!customerName || !customerPhone || !customerCity || !productId) {
      return res.status(400).json({ message: "❌ جميع الحقول مطلوبة" });
    }

    const newOrder = new Order({
      customerName,
      customerPhone,
      customerCity,
      product: productId, 
    });

    await newOrder.save();
    res.status(201).json({ message: "✅ تم إنشاء الطلب بنجاح!", order: newOrder });

  } catch (error) {
    console.error("❌ خطأ أثناء إنشاء الطلب:", error);
    res.status(500).json({ message: "❌ فشل في إنشاء الطلب", error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "❌ خطأ في جلب الطلبات", error });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("product");
    if (!order) {
      return res.status(404).json({ message: "❌ الطلب غير موجود" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "❌ خطأ في جلب الطلب", error });
  }
};



module.exports = { createOrder, getOrders, getOrderById };

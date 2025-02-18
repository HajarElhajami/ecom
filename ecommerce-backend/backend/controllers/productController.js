const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "❌ خطأ في جلب المنتجات", error });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "❌ جميع الحقول مطلوبة" });
    }

    const newProduct = new Product({ name, price, description, image: req.file ? `/uploads/${req.file.filename}` : null });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "❌ فشل في إضافة المنتج", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "❌ المنتج غير موجود" });
    }

    res.json({ message: `تم حذف المنتج بمعرف ${productId}` });
  } catch (error) {
    res.status(500).json({ message: "❌ خطأ في حذف المنتج", error });
  }
};

module.exports = { getProducts, addProduct, deleteProduct };

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// require("dotenv").config();

// // استيراد النماذج
// const Product = require("./models/Product");
// const User = require("./models/User");
// const Requests = require("./routes/Requests");


// // استيراد الموجهات
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");
// const RequestsRoutes = require("./routes/RequestsRoutes");


// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/uploads", express.static("uploads"));

// // إعداد تخزين الصور للمنتجات 
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // الاتصال بقاعدة البيانات
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// // إضافة مسارات المنتجات والمستخدمين
// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/Requests", RequestsRoutes);

// // جلب المنتجات
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "❌ خطأ في جلب المنتجات", error });
//   }
// });

// // إضافة منتج جديد
// app.post("/api/products", upload.single("image"), async (req, res) => {
//   try {
//     const { name, price } = req.body;
//     if (!name || !price) {
//       return res.status(400).json({ message: "❌ جميع الحقول مطلوبة" });
//     }

//     const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
//     const newProduct = new Product({ name, price, image: imagePath });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: "❌ فشل في إضافة المنتج", error });
//   }
// });

// // حذف منتج مع صورته
// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "❌ المنتج غير موجود" });
//     }

//     // حذف الصورة من السيرفر إذا كانت موجودة
//     if (product.image) {
//       const imagePath = path.join(__dirname, product.image);
//       fs.unlink(imagePath, (err) => {
//         if (err) console.error("❌ خطأ في حذف الصورة:", err);
//       });
//     }

//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "🗑️ تم حذف المنتج بنجاح!" });
//   } catch (error) {
//     res.status(500).json({ message: "❌ فشل في حذف المنتج", error });
//   }
// });

// // تشغيل السيرفر
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });








const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const productRoutes = require("./backend/routes/productRoutes");
const userRoutes = require("./backend/routes/userRoutes");
const requestsRoutes = require("./backend/routes/requestsRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestsRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
















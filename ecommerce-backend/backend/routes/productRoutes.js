const express = require("express");
const multer = require("multer");
const path = require("path");  
const { getProducts, addProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  
  },
});

const upload = multer({ storage });

router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

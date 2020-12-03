const path = require("path");
const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-products =>GET req
router.get("/add-products", adminController.getAddProduct);

// adin products=> GET req
router.get("/products", adminController.getProducts);

// // /admin/add-products =>POST req
router.post("/add-products", adminController.postAddProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeletProduct);

module.exports = router;

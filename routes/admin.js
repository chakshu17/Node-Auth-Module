const path = require("path");
const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-products =>GET req
router.get("/add-products", isAuth, adminController.getAddProduct);

// adin products=> GET req
router.get("/products", isAuth, adminController.getProducts);

// // /admin/add-products =>POST req
router.post("/add-products", isAuth, adminController.postAddProducts);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/edit-product", isAuth, adminController.postEditProduct);

router.post("/delete-product", isAuth, adminController.postDeletProduct);

module.exports = router;

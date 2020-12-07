const path = require("path");
const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator");

const router = express.Router();

// /admin/add-products =>GET req
router.get("/add-products", isAuth, adminController.getAddProduct);

// adin products=> GET req
router.get("/products", isAuth, adminController.getProducts);

// // /admin/add-products =>POST req
router.post(
	"/add-products",
	[
		body("title").isString().isLength({ min: 3 }).trim(),
		body("imageUrl").isURL(),
		body("price").isFloat(),
		body("description").isLength({ min: 5, max: 400 }).trim(),
	],
	isAuth,
	adminController.postAddProducts
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
	"/edit-product",
	[
		body("title").isAlphanumeric().isLength({ min: 3 }).trim(),
		body("imageUrl").isURL(),
		body("price").isFloat(),
		body("description").isLength({ min: 5, max: 400 }).trim(),
	],
	isAuth,
	adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeletProduct);

module.exports = router;

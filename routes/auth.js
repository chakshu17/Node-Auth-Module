const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");
const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.post(
	"/signup",
	[
		check("email")
			.isEmail()
			.withMessage("Please Enter a Valid Email")
			.custom((value, { req }) => {
				if (value === "test@test.com") {
					throw new Error("This email address is Forbidden");
				}
				return true;
			}),
		body(
			"password",
			"Please enter a password with number and text only with min of 6 characters "
		)
			.isLength({ min: 8 })
			.isAlphanumeric(),
		body("confirmPassword").custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Passwords have to matched");
			}
			return true;
		}),
	],
	authController.postSignup
);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;

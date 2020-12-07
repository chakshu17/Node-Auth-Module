const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");
const User = require("../models/user");
const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
	"/login",
	[
		body("email")
			.isEmail()
			.withMessage("Please enter a valid email address."),
		body("password", "Password has to be valid.")
			.isLength({ min: 5 })
			.isAlphanumeric(),
		
	],
	authController.postLogin
);

router.post("/logout", authController.postLogout);

router.post(
	"/signup",
	[
		check("email")
			.isEmail()
			.withMessage("Please Enter a Valid Email")
			.custom((value, { req }) => {
				// if (value === "test@test.com") {
				// 	throw new Error("This email address is Forbidden");
				// }
				// return true;
				// validation  done at server side, i.e. we need not to add checking login incontroller, but router will first check it in database.
				// for this node will wait for response from database for urther tasks. THIS IS ASYNC VALIDATION
				return User.findOne({ email: value }).then((userDoc) => {
					if (userDoc) {
						return Promise.reject(
							"Email already Exist.Please choose different one."
						);
					}
				});
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

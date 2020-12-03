const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: false,
	});
};

exports.getSignup = (req, res, next) => {
	res.render("auth/signup", {
		path: "/signup",
		pageTitle: "Signup",
		isAuthenticated: false,
	});
};

exports.postLogin = (req, res, next) => {
	User.findById("5fae1c0df3c5fe1ac80c4ddb")
		.then((user) => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			// Normally we do't need to save this, but If we need to garentee that session is save & then page is redirected, we use THIS
			req.session.save((err) => {
				console.log(err);
				res.redirect("/");
			});
		})
		.catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				return res.redirect("/signup");
			}
			const user = new User({
				email: email,
				password: password,
				cart: { items: [] },
			});
			return user.save();
		})
		.then((result) => {
			res.redirect("/login");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect("/");
	});
};

// const User = require("../models/user");

// exports.getLogin = (req, res, next) => {
// 	// console.log(req.get("Cookie").split(";")[0].trim().split("=")[1] );
// 	// const isLoggedIn =
// 	// 	req.get("Cookie").split(";")[0].trim().split("=")[1] === "true";
// 	// console.log(req.session.isLoggedIn);
// 	// console.log(
// 	// 	"IN this when you press login yo u have a user, so whenever you comeack to login opage console will show truer, otherwiasse undefined. BUT, if you change the browser and still login it will not becausetherer is no pprior knowledge of user"
// 	// );
// 	res.render("auth/login", {
// 		pageTitle: "Login",
// 		path: "/login",
// 		isAuthenticated: false,
// 	});
// };

// exports.postLogin = (req, res, next) => {
// 	// res.setHeader("Set-Cookie", "isloggedIn=true; ");

// In this case we might end upa scenario when you login , other option which we need to display, is hsown as accordingly. so for this ,
//  first we can save the session. and in that session saved method we can redirect.

// sometimes this may appear because redirect works , here we wirte the session in mongodb,
// so this method takes a some milliSeconds or depending on your net speed.
// Redirect is fired independent from it. so we need to save that session and then redir3ect

// 	User.findById("5fae1c0df3c5fe1ac80c4ddb")
// 		.then((user) => {
// 			req.session.isLoggedIn = true;
// 			req.session.user = user;
// 			res.redirect("/");
// 		})
// 		.catch((err) => console.log(err));
// };
// // res.setHeader("Set-Cookie", "isloggedIn=true; Max-Age=10"); => cookie live upto 10s only i.e. no is is seconds
// // res.setHeader("Set-Cookie", "isloggedIn=true; Expires= "); => cookie live upto given date only { format can be searched }
// // res.setHeader("Set-Cookie", "isloggedIn=true; Secure"); => cookie does not allow http server to acces coookie
// // res.setHeader("Set-Cookie", "isloggedIn=true; HttpOnly"); => cookie omly allow http server to access coookie

// exports.postLogout = (req, res, next) => {
// 	req.session.destroy((err) => {
// 		console.log(err);
// 		res.redirect("/");
// 	});
// };

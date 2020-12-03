const Product = require("../models/product");
const Order = require("../models/order");

// to get all products
exports.getProducts = (req, res, next) => {
	Product.find()
		.then((products) => {
			// console.log(products);
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "Shop",
				path: "/products",
				isAuthenticated:req.session.isLoggedIn
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// to get single product
exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then((product) => {
			res.render("shop/product-details", {
				product: product,
				pageTitle: product.title,
				path: "/products",
				isAuthenticated:req.session.isLoggedIn
			});
		})
		.catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
	Product.find()
		.then((products) => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
				isAuthenticated:req.session.isLoggedIn
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.populate("cart.items.productId")
		.execPopulate()
		.then((user) => {
			const products = user.cart.items;
			res.render("shop/cart", {
				pageTitle: "Your Cart",
				path: "/cart",
				products: products,
				isAuthenticated:req.session.isLoggedIn
			});
		})
		.catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId)
		.then((product) => {
			return req.user.addToCart(product);
		})
		.then((result) => {
			console.log(result);
			res.redirect("/cart");
		})
		.catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	req.user
		.removeFromCart(prodId)
		.then((result) => {
			res.redirect("/cart");
		})
		.catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
	req.user
		.populate("cart.items.productId")
		.execPopulate()
		.then((user) => {
			const products = user.cart.items.map((i) => {
				return { quantity: i.quantity, product: { ...i.productId._doc } };
			});
			const order = new Order({
				user: {
					name: req.user.name,
					userId: req.user,
				},
				products: products,
			});
			return order.save();
		})
		.then((result) => {
			req.user.clearCart();
		})
		.then(() => {
			res.redirect("/orders");
		})
		.catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
	Order.find({ "user.userId": req.user._id })
		.then((orders) => {
			res.render("shop/orders", {
				pageTitle: "Your Orders",
				path: "/orders",
				orders: orders,
				isAuthenticated:req.session.isLoggedIn
			});
		})
		.catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		prods: products,
		pageTitle: "Your CheckOut",
		path: "/checkout",
		isAuthenticated:req.session.isLoggedIn
	});
};

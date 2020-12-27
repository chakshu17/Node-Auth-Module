const deleteProduct = (btn) => {
	
	const prodId = btn.parentNode.querySelector("[name=productId]").value;
	const csrf = btn.parentNode.querySelector("[name=_csrf]").value;

	const productElemnt = btn.closest("article");

	fetch("/admin/product/" + prodId, {
		method: "DELETE",
		headers: {
			"csrf-token": csrf,
		},
	})
		.then((result) => {
			return result.json();
		})
		.then((data) => {
			console.log(data);
			productElemnt.parentNode.removeChild(productElemnt);
		})
		.catch((err) => {
			console.log(err);
		});
};

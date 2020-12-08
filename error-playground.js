//Synchronous code
const sum = (a, b) => {
	if (a && b) {
		return a + b;
	}
	throw new Error("Invalid Args");
};

// try {
// 	console.log(sum(1));
// } catch {
// 	console.log("Error Occured");
// 	//console.log(error);
// }

console.log(sum(1));
console.log('this works');
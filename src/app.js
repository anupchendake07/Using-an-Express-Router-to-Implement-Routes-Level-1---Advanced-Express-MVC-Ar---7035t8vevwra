const fs = require('fs');
const express = require('express');
const app = express();
//Aim: With the help of router, get all the product with router.GET request and create a product with router.POST request

//middleware
app.use(express.json());

//write router middleware here
const router = express.Router();
app.use(router);

//Including product.json file
const product = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/product.json`)
);

// Defining The Router
// Get all the products
router.get('/api/v1/product', (req, res) => {
	try {
		//Write your code here
		res.status(200).json({
			status: 'success',
			results: product.length,
			data: { product },
		});
	} catch (error) {
		res.status(400).json(error);
	}
});

//Create a new Product
router.post('/api/v1/product', (req, res) => {
	try {
		//Write your code here
		const newProduct = req.body;
		if (!newProduct.title || !newProduct.price) {
			return res.status(404).json({
				status: 'Error',
				message: 'Title and price are required',
			});
		}
		const id = product[product.length - 1].id + 1;
		newProduct.id = id;
		const products = [...product, newProduct];
		console.log(products);
		fs.writeFileSync(
			`${__dirname}/../dev-data/product.json`,
			JSON.stringify(products)
		);
		res.status(201).json({
			status: 'success',
			data: {
				product: newProduct,
			},
		});
	} catch (error) {
		res.status(400).json({
			message: 'Error creating product',
			status: 'Error',
		});
	}
});

//Registering our Router
//Write here to register router

module.exports = app;

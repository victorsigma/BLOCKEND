const express = require("express");
const router = express.Router();
const products = require("../models/products");

router.get("/", async (req, res, next) => {
	const productos = await products.find().lean();
  	res.json(productos);
});

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	const productos = await products.findOne({id: id}).lean();
  	res.json(productos);
});

router.post("/", async (req, res, next) => {
	const producto = await products(req.body)
	const productoGuardado = await producto.save()
	res.json(productoGuardado);
});

router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	const { name, price, description, images } = req.body
	await products.updateOne({id: id}, {$set: {name: name, price: price, description: description, images: images}})
	const product = await products.findOne({id: id});
	if(!product) res.json(product);
	else res.json("Producto no encontradp");
});

router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	const product = await products.deleteOne({id: id});
	res.json(product);
});

module.exports = router;

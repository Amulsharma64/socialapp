const Product = require("../model/product");
const router = require("express").Router();

router.post("/", async(req,res) => {
    const newProduct = new Product(req.body);
    try {
        const saveProduct = await newProduct.save();
        console.log(saveProduct);
        res.status(200).json(saveProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
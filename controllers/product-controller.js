const HttpError = require("../models/http-error");
const Product = require("../models/product");

const getAllProducts = async (req,res,next)=>{
    let products;
    try {
        products = await Product.find();
    } catch (err) {
        const error = new HttpError(
            "Couldn't find products, please try again later",
            500
        );
        return next(error);
    }
    res.send(products);
}

module.exports = getAllProducts;
const HttpError = require("../models/http-error");
const Product = require("../models/product");

//---------------All Products Data From here---------------
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
//------------------------------------------------------------

//---------------Add New Products From here---------------

const postNewProduct = async (req,res,next)=>{
    const imagesUrl=[];
    req.files.map(file=>{
        imagesUrl.push(file.path)
    })
    const newProduct = new Product(
        {
            name: req.body.name,
            description: req.body.description,
            soldOut: false,
            images: imagesUrl,
        }
    )
    try {
        await newProduct.save();
    } catch (err){
        const error = new HttpError(
            "Couldn't add Product, Please try again",
            500
        )
        return next(error);
    }
    res.send("Product Successfully Added");
}

//------------------------------------------------------------

exports.getAllProducts = getAllProducts;
exports.postNewProduct = postNewProduct;
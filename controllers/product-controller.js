const HttpError = require("../models/http-error");
const Product = require("../models/product");

//---------------All Products Data From here---------------
const getAllProducts = async (req, res, next) => {
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
};
//------------------------------------------------------------

//---------------Add New Products From here---------------

const postNewProduct = async (req, res, next) => {
  const imagesUrl = [];
  req.files.map((file) => {
    imagesUrl.push(file.path);
  });
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    soldOut: false,
    images: imagesUrl,
  });
  try {
    await newProduct.save();
  } catch (err) {
    const error = new HttpError("Couldn't add Product, Please try again", 500);
    return next(error);
  }
  res.send("Product Successfully Added");
};

//------------------------------------------------------------

//---------------Get Single Product From here---------------

const getSingleProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.productId);
  } catch (err) {
    const error = new HttpError("Couldn't get Poduct's information", 500);
    return next(error);
  }
  res.send(product);
};

//------------------------------------------------------------

//---------------Delete Single Product From here---------------

const deleteSingleProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
  } catch (err) {
    const error = new HttpError("Couldn't delete Poduct", 500);
    return next(error);
  }
  res.send("Product Deleted Successfully");
};

//------------------------------------------------------------

//---------------Add New Products From here---------------

const updateProduct = async (req, res, next) => {
  try {
    await Product.findById(req.params.productId, (err, result) => {
      result.soldOut = !result.soldOut;
      result.save();
    });
  } catch (err) {
    const error = new HttpError(
      "Could not update Product, Please Try Again",
      500
    );
    return next(error);
  }
  res.send("Successfully Updated Product");
};

//------------------------------------------------------------

//---------------Search Products From here---------------

const searchProducts = async (req, res, next) => {
  let products;
  const term = req.body.searchTerm;
  try {
    if (term) {
      products = await Product.find({ $text: { $search: term } });
    } else {
      products = await Product.find();
    }
  } catch (err) {
    const error = new HttpError("No Products Found...", 500);
    return next(error);
  }
  res.send(products);
};

//------------------------------------------------------------

exports.getAllProducts = getAllProducts;
exports.postNewProduct = postNewProduct;
exports.updateProduct = updateProduct;
exports.getSingleProduct = getSingleProduct;
exports.deleteSingleProduct = deleteSingleProduct;
exports.searchProducts = searchProducts;

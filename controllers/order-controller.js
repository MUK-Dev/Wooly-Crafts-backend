const HttpError = require("../models/http-error");
const Order = require("../models/order");



//---------------Get All Orders From here---------------

const getAllOrders = async (req,res,next)=>{
    let orders;
    try {
        orders = await Order.find();
    } catch (err) {
        const error = new HttpError(
            "Couldn't get all orders, please try again",
            500
        );
        return next(error);
    }
    res.send(orders);
}

//------------------------------------------------------------

//---------------Post New Order From here---------------

const postNewOrder = async (req,res,next)=>{
    const order = Order(
        {
            customerName: req.body.name,
            customerEmail: req.body.email,
            customerAddress: req.body.address,
            totalBill: req.body.totalBill,
            paymentMethod: req.body.paymentMethod,
            order: req.body.order,
        }
    );
    try {
        await order.save();
    } catch (err) {
        const error = new HttpError(
            "Couldn't Post Error, please try again",
            500
        );
        return next(error);
    }
    res.send("Order Posted. We will contact you as soon as we can");
}

//------------------------------------------------------------

exports.getAllOrders = getAllOrders;
exports.postNewOrder = postNewOrder;
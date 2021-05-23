const HttpError = require("../models/http-error");
const Order = require("../models/order");



//---------------Get All Pending Orders From here---------------

const getAllOrders = async (req,res,next)=>{
    let orders;
    try {
        orders = await Order.find({finished: false});
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

//---------------Get Finished Orders From here---------------

const getFinishedOrders = async (req,res,next)=>{
    let orders;
    try {
        orders = await Order.find({finished: true});
    } catch (err) {
        const error = new HttpError(
            "Couldn't get Finished orders, please try again",
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
            customerPhone: req.body.phone,
            totalBill: req.body.totalBill,
            finished: false,
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

//---------------Complete Order From here---------------

const completeOrder = async (req,res,next)=>{
    try {
        Order.findById(req.params.orderId,(err,result)=>{
            result.finished = !result.finished;
            result.save();
        });
    } catch (err) {
        const error = new HttpError(
            "Could not Finish the Order, please try again",
            500
        );
        return next(error);
    }
    res.send("Order Finished Successfully");
}

//------------------------------------------------------------
exports.getAllOrders = getAllOrders;
exports.postNewOrder = postNewOrder;
exports.completeOrder = completeOrder;
exports.getFinishedOrders = getFinishedOrders;
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        customerName: {type: String, required: true},
        customerEmail: {type: String, required: true},
        customerAddress: {type: String, required: true},
        totalBill: {type: String, required: true},
        paymentMethod: {type: String, required: true},
        order: [
            {
                image: {type: String, required: true},
                productName: {type: String, required: true},
                productPrice: {type: String, required: true},
            }
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model("Order",orderSchema);
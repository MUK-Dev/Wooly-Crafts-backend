const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        customerName: String,
        customerEmail: String,
        customerAddress: String,
        customerPhone: String,
        totalBill: String,
        paymentMethod: String,
        finished: Boolean,
        order: [
            {
                image: String,
                productName: String,
                productPrice: String,
            }
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model("Order",orderSchema);

// {
//     "name": "M Usman Khilji",
//     "email": "manian1221@gmail.com",
//     "address": "This is where my address will be",
//     "totalBill": "5000",
//     "customerPhone": "03313933344",
//     "paymentMethod": "Cash On Delivery",
//     "finished": false,
//     "order": [
//         {
//             "image": "imageUrl",
//             "productName": "Sweater",
//             "productPrice": "2500"
//         },
//         {
//             "image": "imageUrl",
//             "productName": "Sweater",
//             "productPrice": "2500"
//         }
//     ]
// }
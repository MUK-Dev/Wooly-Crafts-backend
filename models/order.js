const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        customerName: String,
        customerEmail: String,
        customerAddress: String,
        totalBill: String,
        paymentMethod: String,
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
//     "paymentMethod": "Cash On Delivery",
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
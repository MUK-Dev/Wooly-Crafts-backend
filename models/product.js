const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    price: String,
    soldOut: Boolean,
    images: [],
  },
  { timestamps: true }
);

productSchema.index(
  { name: "text", description: "text" },
  {
    weights: {
      name: 5,
      description: 1,
    },
  }
);

module.exports = mongoose.model("Product", productSchema);

// {
//     "_id": "60a756a145926d0998fea992",
//     "name": "Sweater",
//     "description": "This is a very nice sweater",
//     "price": "2500",
//     "soldOut": false,
//     "images": [
//         {
//             "_id": "60a756a145926d0998fea993",
//             "url": "imageUrl1"
//         },
//         {
//             "_id": "60a756a145926d0998fea994",
//             "url": "imageUrl1"
//         },
//         {
//             "_id": "60a756a145926d0998fea995",
//             "url": "imageUrl1"
//         }
//     ],
//     "createdAt": "2021-05-21T06:43:45.248Z",
//     "updatedAt": "2021-05-21T06:43:45.248Z",
//     "__v": 0
// }

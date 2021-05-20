const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        soldOut: { type: Boolean, required: true },
        images: [
            {url: { type: String, required: true }}
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model("Product",productSchema);
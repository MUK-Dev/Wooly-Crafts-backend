const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        topic: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Message",messageSchema);
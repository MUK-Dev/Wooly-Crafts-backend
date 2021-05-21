const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        topic: String,
        name: String,
        email: String,
        phone: String,
        message: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model("Message",messageSchema);

// {
//     "topic": "I Didn't get my product",
//     "name": "M Usman Khilji",
//     "email": "manian1221@gmail.com",
//     "phone": "03313933344",
//     "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
// }
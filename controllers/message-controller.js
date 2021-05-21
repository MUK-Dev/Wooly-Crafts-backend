const HttpError = require("../models/http-error");
const Message = require("../models/message");



//---------------Get All Messages From here---------------

const getAllMessages = async (req,res,next)=>{
    let messages;
    try {
        messages = await Message.find();
    } catch (err) {
        const error = new HttpError(
            "Couldn't Find Messages, please try again",
            500
            );
        return next(error);
    }
    res.send(messages);
}
    
//------------------------------------------------------------
    
//---------------Post New Messages From here---------------
    
const postNewMessage = async (req,res,next)=>{
    const message= new Message(
        {
            topic: req.body.topic,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        }
    );
    try {
        await message.save();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong couldn't send the message",
            500
        );
        return next(error);
    }
    res.send("Message Sent Successfully");
}
    
//------------------------------------------------------------

exports.getAllMessages = getAllMessages;
exports.postNewMessage = postNewMessage;
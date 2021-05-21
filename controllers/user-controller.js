const bcrypt = require("bcrypt");
const saltRounds = 10;

const HttpError = require("../models/http-error");
const User = require("../models/user");

//---------------Get All Users Data Except Password From here---------------

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Couldn't Get Users, please try again", 500);
    return next(error);
  }
  res.send(users);
};

//------------------------------------------------------------

//---------------Register New User---------------------

const register = async (req, res, next) => {
  let existingUser;
  let registeredUser;
  try {
    existingUser = await User.findOne({ email: req.body.email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "Email already in use, please try a different email address",
      422
    );
    return next(error);
  }

  bcrypt.hash(req.body.password, saltRounds, async (e, hash) => {
    if (!e) {
      const user = User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
      });
      try {
        await user.save((err, result) => {
            if (!err) {
                if(result === true){
                    registeredUser = {
                        _id: foundUser._id,
                        name: foundUser.name,
                        email: foundUser.email,
                        phone: foundUser.phone,
                    };
                }
            } else {
                res.send(err);
            }
        });
      } catch (err) {
          const error = new HttpError(
              "Couldn't Register, please try again",
              500
          );
          return next(error);
      }
      //Send back use data and session token from here
      res.send(registeredUser);
    }
  });
};

//------------------------------------------------------------

//---------------Login Existing User---------------------

const login = async (req,res,next)=>{
    let loggedInUser;
    try {
        await User.findOne({ email: req.body.email }, (err, foundUser) => {
            if(!err){
                if (foundUser) {
                    bcrypt.compare(req.body.password, foundUser.password, (error, result)=> {
                        if(result === true){
                            loggedInUser = {
                                _id: foundUser._id,
                                name: foundUser.name,
                                email: foundUser.email,
                                phone: foundUser.phone,
                            };
                        }
                    });
                } 
            }
        });
    } catch (err) {
        const error = new HttpError(
            "Login Failed, please try again",
            500
        );
        return next(error);
    }
    //Login user and send a session token here
    res.send(loggedInUser);
}

//------------------------------------------------------------

exports.getAllUsers = getAllUsers;
exports.register = register;
exports.login = login;
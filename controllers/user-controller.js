require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  let token;
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
        await user.save();
      } catch (err) {
        const error = new HttpError("Couldn't Register, please try again", 500);
        return next(error);
      }
      try {
        const tokenUser = {
          name: user.name,
          phone: user.phone,
          email: user.email,
        };
        token = jwt.sign({ tokenUser }, process.env.JWT_KEY, {
          expiresIn: "2h",
        });
      } catch (err) {
        const error = new HttpError("Couldn't generate token", 500);
        return next(error);
      }

      res.send({
        message: "Successfully Registered, Happy Shopping!",
        userInfo: {
          name: user.name,
          phone: user.phone,
          email: user.email,
        },
        token: token,
      });
    }
  });
};

//------------------------------------------------------------

//---------------Login Existing User---------------------

const login = async (req, res, next) => {
  let token;
  try {
    await User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (!err) {
        if (foundUser) {
          bcrypt.compare(req.body.password, foundUser.password, (e, result) => {
            if (result === true) {
              let payload = {
                name: foundUser.name,
                email: foundUser.email,
                phone: foundUser.phone,
              };
              try {
                token = jwt.sign({ payload }, process.env.JWT_KEY, {
                  expiresIn: "2h",
                });
              } catch (erro) {
                const error = new HttpError(
                  "Couldn't Login, please try again",
                  500
                );
                return next(error);
              }

              res.send({
                message: "Login Successful",
                userInfo: {
                  _id: foundUser._id,
                  name: foundUser.name,
                  email: foundUser.email,
                  phone: foundUser.phone,
                },
                token: token,
              });
            }
          });
        }
      }
    });
  } catch (err) {
    const error = new HttpError("Login Failed, please try again", 500);
    return next(error);
  }
};

//------------------------------------------------------------

exports.getAllUsers = getAllUsers;
exports.register = register;
exports.login = login;

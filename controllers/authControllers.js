const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const register = async (req, res, next) => {
  const { firstName, lastName, username, password, googleId } = req.body;

  console.log("req.body: ", req.body);
  if (!firstName || !username || !password) {
    console.error("Please fill in required fields.");
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashPassword,
      googleId,
    });
    console.log("newUser:", newUser);
    await newUser.save();

    req.login(newUser, (err) => {
      console.log("Login");
      if (err) {
        return next(err);
      }
    });

    newUser.password = undefined;

    return res.status(201).json({
      success: { message: "User created." },
      data: { user: newUser },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

// login - GET
const login = async (req, res, next) => {
  return res.status(200).json({
    success: { message: "User logged in." },
    statusCode: 200,
  });
};

// login/error - GET where we'll send a json message that says "Login error"
// const loginError = async (req, res, next) => {
//   return res.status(400).json({
//     error: { message: "Login error" },
//   });
// };

// login/local - GET

const localLogin = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      return res.status(401).json({
        error: { message: info.message },
      });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
    });

    const userCopy = { ...req.user._doc };
    userCopy.password = undefined;
    return res.status(200).json({
      success: { message: "Successful login." },
      data: { user },
      statusCode: 200,
    });
  })(req, res, next);
};

// logout - GET
const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }

    res.clearCookie("connect.sid");

    res.status(200).json({
      success: { message: "User logged out!" },
      statusCode: 200,
    });

    function sessionDestruction(err) {
      if (err) {
        return next(err);
      }
    }
    sessionDestruction();
  });
};

// unauthenticated - GET where we'll send a console.log that says "Returning to the homepage..." and redirect the user back home to the index -get

module.exports = { register, login, logout, localLogin };

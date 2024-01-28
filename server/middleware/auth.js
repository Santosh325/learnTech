const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth

exports.auth = async (req, res, next) => {
  try {
    console.log('middleware auth is executed..')
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorisation").replace("Bearer ", "");

    //  if token is missing
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log('printing decode -> ',decode);
      req.user = decode;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    console.log('before auth next comes here..');
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token!",
    });
  }
};

// isStudent

exports.isStudent = async (req, res, next) => {
  try {
    console.log('middleware isStudent executed..')
    if (req.user.accountType !== "Student") {
      return res.status(400).json({
        success: false,
        message: "You are not a student !",
      });
    }
    console.log('here isStudent is before next')
    next(); // next middleware
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token!",
    });
  }
};
// isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
  console.log('middleware isInstructor executed..')

    if (req.user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "You are not a instructor !",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token!",
    });
  }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    console.log('middleware isAdmin executed..')
    console.log(req.user.accountType);
    if (req.user.accountType !== "Admin") {
      return res.status(400).json({
        success: false,
        message: "You are not an admin !",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token!",
    });
  }
};

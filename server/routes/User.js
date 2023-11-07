const express = require("express");
const router = express.Router();

// import the required controllers and middleware functions
const {
  login,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const { auth } = require("../middleware/auth");

// Routes for Login, Signup and Authentication

// ***************************************************************************
//                             Authentication routes
// ***************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending otp to the users mail
router.post("/sendotp", sendotp);

// Route for changing the password
router.post("/changepassword", auth, changePassword);

// ***************************************************************************
// Reset Passord
// ***************************************************************************

// Route for generating a reset password  token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

module.exports = router;

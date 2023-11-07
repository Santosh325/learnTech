const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    //   get email from req.body
    const { email } = req.body;

    // check user for this email and validate
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not registered!",
      });
    }

    // generate token
    const token = crypto.randomUUID();

    // update user by adding token and expiry date

    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );

    // create Url
    const url = `http://localhost:3000/update-password/${token}`;

    // send mail continaing the url
    await mailSender(
      email,
      "Password reset Link",
      `Password reset link: ${url}`
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Reset password link send to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending reset password mail",
    });
  }
};

// resetPassword
exports.resetPassword = async (req, res) => {
  try {
    // data fetch
    const { password, confirmPassword, token } = req.body;
    // validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // get userDetails from db using token
    const userDetails = await User.findOne({ token: token });

    // if no entry - invalid token

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    // check time expire or not
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token expired, please generate a new one",
      });
    }
    // hashPassword

    const hashedPassword = await bcrypt.hash(password, 10);

    // update Password
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    // send response
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password",
    });
  }
};

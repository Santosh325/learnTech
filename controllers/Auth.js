const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");
const { passwordUpdate } = require("../mail/templates/passwordUpdate");
require("dotenv").config();
// Send otp
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    // check user already exist or not
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Generated otp -> ", otp);

    // check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    console.log("Result is Generate otp function");
    console.log("OTP->", otp);
    console.log("Result -> ", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }

    const otpPayload = {
      email,
      otp,
    };

    // create an entry in db

    const otpBody = await OTP.create(otpPayload);

    console.log(otpBody);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp: otpBody.otp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Otp could not sent!",
      success: false,
      error: error.message,
    });
  }
};

// Signup

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      accountType,
      contactNumber,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and confirm password does not match, Please try again!",
      });
    }

    // check existing user or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // find most recent otp stored for the User
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log("recentOtp", recentOtp);

    // validate otp

    if (recentOtp.length === 0) {
      // otp not found
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid!",
      });
    } else if (otp !== recentOtp[0].otp) {
      // otp not match
      return res.status(400).json({
        success: false,
        message: "OTP does not match, Please try again!",
      });
    }

    // hashPassword
    const hashPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // create entry in db

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      additionalDetails: profileDetails._id,
      accountType,
      contactNumber,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "user Cannot be registered, Please try again !",
    });
  }
};

// login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check existing user or not
    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, Please try again !",
      });
    }

    // match password using bcrypt.compatre()
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      //   generate token after password matched using jwt.sign()
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully!",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect, Please try again !",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "user Cannot be registered, Please try again !",
    });
  }
};
// changePassword

exports.changePassword = async (req, res) => {
  try {
  } catch (error) {}
};

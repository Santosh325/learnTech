const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", gender, contactNumber } = req.body;
    // if (!gender || !contactNumber) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Missing properties!",
    //   });
    // }
    const id = req.user.id;

    // find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    // update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    // save in db
    await profileDetails.save();

    // return response
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Error occured while updating profile",
    });
  }
};

// deleteAccount
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById({_id: id});
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found!",
      });
    }
    // delete Profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    // delete User
    await User.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Error occured while deleting account",
    });
  }
};

// getAllUserDetails
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found!",
      });
    }
    console.log(userDetails);

    return res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      message: "Error occured while fetching user details",
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );

    return res.send({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Profile image could not Update!",
      error: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({ _id: userId })
      .populate("courses")
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Couldnot find user with id: ${userDetails}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

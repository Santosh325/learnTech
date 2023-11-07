const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

// createCourse handler function
exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    // fetch Data
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructons,
    } = req.body;

    //   fetch thumbnail
    let thumbnail = req.files.thumbnailImage;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required !",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    // check for instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    console.log("Instructor Details -> ", instructorDetails);

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor Details not found !",
      });
    }
    // check given tag is valid or not
    const categoryDetails = await Category.findById(category);
    console.log('categoryDetails ->', categoryDetails);
    if (!categoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid categoryDetails !",
      });
    }

    // upload thumbnail to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      thumbnail: thumbnailImage.secure_url,
      instructor: instructorDetails._id,
      tag: tag,
      category: categoryDetails._id,
      status: status,
      instructons: instructons,
    });

    //   Add the new course to the user Schema of instructor

    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to create Course !",
    });
  }
};

// getAllCourses handler function
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({}).populate("courseContent").exec();
    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      allCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      message: "Failed to get all courses !",
    });
  }
};

// getCourse handler function
exports.getCourseDetails = async (req, res) => {
  try {
    // get Id
    const { courseId } = req.body;

    // find course Details
    const courseDetails = await Course.find({ _id: courseId })
      
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      
      // .populate("ratingAndReviews")
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "Course not found !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      message: "Failed to get course details !",
    });
  }
};

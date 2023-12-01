const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");
// createRating
exports.createRating = async (req, res) => {
  try {
    // get userId
    const userId = req.user.id;

    // fetch data from request body
    const { rating, review, courseId } = req.body;

    // check if user is enrolled or not
    const courseDetails = await Course.findById({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    // validatation

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "User is not enrolled in this course",
        
      });
    }

    // check if user already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "User already reviewed the course",
      
      });
    }
    // create Rating and review
    const ratingAndReview = new RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });
    // update course with the rating and review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      {
        _id: courseId,
      },
      {
        $push: { ratingAndReviews: ratingAndReview._id },
      }
    );

    // return response

    res.status(200).json({
      success: true,
      message: "Rating and Review created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: "Rating and Review could not created",
      error: error.message,
    });
  }
};

// getAverageRating
exports.getAverageRating = async (req, res) => {
  try {
    // get course Id
    const courseId = req.body.courseId;

    // calculate average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    // return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }
    // if not rating and review exist
    return res.status(200).json({
      success: true,
      message: "No rating and review found",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// getAllRating
exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get all reviews",
      error: error.message,
    });
  }
};

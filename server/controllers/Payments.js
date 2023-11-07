const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

// capture the payment and initiate the razorpay ordre
exports.capturePayment = async (req, res) => {
  try {
    //  get usreId and courseId
    const { course_id } = req.body;
    const userId = req.user._id;

    // validation
    // valid course Id

    if (!course_id) {
      return res.status(401).json({
        success: false,
        message: "Please provide valid course id!",
      });
    }

    // valid courseDetail

    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(401).json({
          success: false,
          message: "Could not find course ",
        });
      }
      // user already pay for the same course or not
      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentsEnrolled.includes(uid)) {
        return res.status(401).json({
          success: false,
          message: "You have already enrolled for this course!",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // order create
    const amount = course.amount;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: Math.rondom(Date.now().toLowerCase()),
      notes: {
        course_id: course._id,
        userId,
      },
    };

    try {
      // initiate the payment using razorpay
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      // return response

      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Could not initiate the payment",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// verify signature
exports.verifySignature = async (req, res) => {
  const webhookSecret = "123456789";
  const signature = req.headers["x-razorpay-signature"];
  // algo - sha256
  // secretkey = webhookSecret
  const shasum = Crypto.createHmac("sha256", webhookSecret);
  // convert hmac to string format
  shasum.update(JSON.stringify(req.body));
  // shashum digested using digest function
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Data is verified, Payment is authorized");
    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      // fulfill action
      // find the course and enroll the student in it

      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(401).json({
          success: false,
          message: "Could not enroll the user in the course",
        });
      }

      console.log(enrolledCourse);

      // find the user and update the courses they have enrolled in
      const enrolledStudent = await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          $push: { courses: courseId },
        },
        { new: true }
      );
      console.log(enrolledStudent);

      // mail send

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulation from CodeHelp",
        "Congratulations, you are onboarded into new Codehelp Course"
      );

      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: error.message,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      }); 
    }
  } else {
    console.log("Data is not verified, Payment is unauthorized");
    return res.status(401).json({
      success: false,
      message: "Data is not verified, Payment is unauthorized",
    });
  }
};

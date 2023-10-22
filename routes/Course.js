const express = require("express");
const router = express.Router();
const { get } = require("mongoose");

// Import the controllers

// course controllers

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course");

// Categories controllers import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Section controllers import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// SubSection controllers import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// Rating controllers import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

// importing middleware
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middleware/auth");

// ***************************************************************************
//                             Course routes
// ***************************************************************************

// courses can only be created by instructor
router.post("/createCourse", auth, isInstructor, createCourse);

// add a section to course
router.post("/addSection", auth, isInstructor, createSection);

// update section
router.post("/updateSection", auth, isInstructor, updateSection);

// delete Section
router.post("/deleteSection", auth, isInstructor, deleteSection);

// edit sub section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

// delete sub section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// add a subsection to a section
router.post("/addSubSection", auth, isInstructor, createSubSection);

// get all registered courses
router.get("/getAllCourses", getAllCourses);

// get details for a specific course
router.post("/getCourseDetails", getCourseDetails);

// ***************************************************************************
//                             Category routes
// ***************************************************************************

// Category can only be created by admin
// TODO: put isAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ***************************************************************************
//                             Rating and Reviews
// ***************************************************************************

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;

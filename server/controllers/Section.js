const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;
    //   data validation

    console.log("section name-> ", sectionName);
    console.log("course id -> ", courseId);
    if (!sectionName || !courseId) {
      return res.status(401).json({
        success: false,
        message: "Missing properties!",
      });
    }

    // create Section
    const newSection = await Section.create({ sectionName });

    // update course with section id
    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updateCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      message: "Failed to create section !",
    });
    ß;
  }
};

// update section

exports.updateSection = async (req, res) => {
  try {
    const { sectionId, sectionName } = req.body;
    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "Missing properties!",
      });
    }

    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to update section !",
    });
  }
};

// delete section
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    // delete section using section id

    await Section.findByIdAndDelete(sectionId);
    await Course.findByIdAndUpdate(courseId);
    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to update section !",
    });
  }
};

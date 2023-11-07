const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
exports.createSubSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, description, timeDuration } = req.body;

    const video = req.files.videoFile;

    //  validation
    if (!sectionId || !title || !description || !timeDuration || !video) {
      return res.status(401).json({
        success: false,
        message: "Missing properties!",
      });
    }

    // upload video to cloudinary
    const uploatDetails = await uploadImageToCloudinary(
      video,
      process.env.FoLDER_NAME
    );

    // Create subsection
    const subSectionDetails = await SubSection.create({
      title: title,
      description: description,
      timeDuration: timeDuration,
      videoUrl: uploatDetails.secure_url,
    });

    // update section with the subsection object id
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      {
        new: true,
      }
    )
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "SubSection could not created",
      error: error.message,
    });
  }
};

// update subsection
exports.updateSubSection = async (req, res) => {
  try {
    // fetch data
    const { subSectionId, title, description, timeDuration } = req.body;
    // validation
    if (!subSectionId || !title || !description || !timeDuration) {
      return res.status(401).json({
        success: false,
        message: "Missing properties!",
      });
    }
    //    update subsection
    const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId, {
      title,
      description,
      timeDuration,
    });
    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      updatedSubSection,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "SubSection could not updated",
      error: error.message,
    });
  }
};

// delete subsection
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.params;
    // delete subsection
    const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      deletedSubSection,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "SubSection could not deleted",
      error: error.message,
    });
  }
};

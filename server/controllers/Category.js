const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    console.log('finally createCategory executed..');
    const { name, description } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create entry in db
    const tagDetails = await Category.create({
      name: name,
      description: description,
    });

    console.log('tagDetails -> :',tagDetails);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      tagDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );

    return res.status(200).json({
      success: true,
      message: "All Category fetched successfully",
      allCategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// category pageDetails
exports.categoryPageDetails = async (req, res) => {
  try {
    // get category Id;
    const { categoryId } = req.body;

    // get courses for speciied categoryId
    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();

    // validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    // get courses for different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

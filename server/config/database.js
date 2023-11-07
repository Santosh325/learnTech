const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDb = () => {
  console.log('db got connected ...');
  console.log(process.env.MONGODB_URL);
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
      console.log("Error connecting to MongoDB");
      process.exit(1);
    });
};

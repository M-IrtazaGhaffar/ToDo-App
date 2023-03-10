const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

const connection = async () => {
  try {
    mongoose.connect(
      process.env.DATABASE_URL,
      {
        useNewUrlParser: true,
        // useCreateIndex: true,
      },
      (err) => {
        if (!err) console.log("MongoDB Connection Succeeded.");
      }
    );
  } catch (error) {
    console.log("Error in DB connection: " + err);
  }
};

module.exports = connection;

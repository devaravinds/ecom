const mongoose = require("mongoose");
const logger = require("./logger");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB Connected: ${mongoose.connection.name}`)
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

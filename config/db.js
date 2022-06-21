const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = () => {
  try {
    mongoose.connect(db, { useNewURLParser: true });
    console.log("Database connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;

const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

async function connectDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecting to MongoDB");
    return {
        success: true,
        message: "Connected to MongoDB!"
    }
  } catch (error) {
    console.error(error);
    return {
        success: false,
        message: error.message
    }
  }
}

module.exports = {
  connectDatabase
};


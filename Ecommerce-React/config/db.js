import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add other options if needed
    });
    console.log(
      `Connected To MongoDB Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.error("Error in MongoDB connection:", error.message.bgRed.white);
    process.exit(1); // Exit the process with a failure code
  }
};

export default connectDB;

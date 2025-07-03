import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("MonogoDB connected raaa rey 🤩");
  } catch (error) {
    console.error(`Error mawa Chuskoo 😣 : ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "../../routes/UserRoutes.js";
import donorRoutes from "../../routes/donorRoutes.js";
import connectDB from "../../config/db.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: 'https://blood-bridge-app.vercel.app',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to BB Server ✅");
});

app.use("/api/bb/user", UserRoutes);
app.use("/api/bb/donors", donorRoutes);

// Vercel-style export
export default app;

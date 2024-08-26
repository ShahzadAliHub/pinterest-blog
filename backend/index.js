import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const port = process.env.PORT;

// Using middlewares
app.use(express.json());
app.use(cookieParser());

// Importing routes
import userRoutes from "./routes/userRoutes.js";
import pinRoutes from "./routes/pinRoutes.js";

// Using routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

// Serving static files from the root directory
app.use(express.static(path.join(__dirname, "public")));

// For single-page applications (SPA) fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import apiRouter from "./routes/api.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// API Route
app.use("/api/v1", apiRouter);

// Error Handler
app.use(errorHandler);

// Set port based on env variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});

import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from 'mongoose';
import gamesRouter from './routes/games.js';

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use("/games", gamesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});

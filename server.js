import dotenv from 'dotenv';
dotenv.config();

import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Worlds!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});

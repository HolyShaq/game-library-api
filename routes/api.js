import express from "express";
import gamesRouter from "./games.js";

export const apiRouter = express.Router();

apiRouter.use("/games", gamesRouter);

export default apiRouter;

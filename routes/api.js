import express from "express";
import authRouter from "./auth.js";
import gamesRouter from "./games.js";

export const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/games", gamesRouter);

export default apiRouter;

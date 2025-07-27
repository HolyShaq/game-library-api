import express from "express";
import authRouter from "./auth.js";
import gamesRouter from "./games.js";
import authGuard from "../middleware/authGuard.js";

export const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/games", authGuard, gamesRouter);

export default apiRouter;

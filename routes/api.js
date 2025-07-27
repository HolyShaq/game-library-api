import express from "express";
import authRouter from "./auth.js";
import gamesRouter from "./games.js";
import { rateLimit } from "express-rate-limit";

export const apiRouter = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per window
  message: { error: "Too many requests, please try again later." },
});

apiRouter.use(limiter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/games", gamesRouter);

export default apiRouter;

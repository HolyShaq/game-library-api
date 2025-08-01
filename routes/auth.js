import express from "express";
import { makeAuthController } from "../controllers/authController.js";
import { User } from "../models/User.js";

// Inject mongoose User model into controller
const { register, login, refresh} = makeAuthController({ model: User });

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);

export default authRouter;

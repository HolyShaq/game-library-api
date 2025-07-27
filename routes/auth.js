import express from "express";
import { makeAuthController } from "../controllers/authController.js";
import { User } from "../models/User.js";

// Inject mongoose User model into controller
const { register } = makeAuthController({ model: User });

const authRouter = express.Router();

authRouter.post("/register", register);

export default authRouter;

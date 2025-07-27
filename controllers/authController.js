import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

// Factory for an auth controller
//    has a dependency injection for the model to be used
//    returns an object containing the essential methods for CRUD
//    hits the User model

export const makeAuthController = ({ model }) => ({
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      // Check if email is already in use
      const existingUser = await model.findOne({ email });
      if (existingUser) throw new Error("Email already in use");

      // Create new user
      const user = await model.create({ username, email, password });

      // Issue refresh and access tokens
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      res
        .status(201)

        // Return refresh token as cookie
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })

        // Return created user with access token attached
        .json({
          message: "User registered successfully",
          payload,
          accessToken,
        });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Authenticate credentials
      const user = await model.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error("Invalid credentials");

      // Issue refresh and access tokens
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      res
        .status(200)

        // Return refresh token as cookie
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })

        // Return access token
        .json({
          message: `${user.username} logged in successfully`,
          accessToken,
        });
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) throw new Error("Missing refresh token");

      // Verify if refresh token is valid
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      // Sanitize decoded payload
      const payload = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      };

      // Generate a new access token with the payload
      const accessToken = generateAccessToken(payload);

      // Return the access token
      res.status(200).json({ accessToken });
    } catch (err) {
      next(err);
    }
  },
});

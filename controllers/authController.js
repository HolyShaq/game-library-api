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
          user,
          accessToken,
        });
    } catch (err) {
      next(err);
    }
  },
});

import jwt from "jsonwebtoken";

const authGuard = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) throw new Error("Unauthorized");

    const accessToken = authHeader.split(" ")[1];

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
  } catch (error) {
    next(error);
  }
};

export default authGuard;

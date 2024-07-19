import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to verify token for protected routes
export const requireSignIn = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user object from token payload to request object
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Error in requireSignIn middleware:", error.message);
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

// Middleware to check admin access
export const isAdmin = async (req, res, next) => {
  try {
    // Find user by ID extracted from token payload
    const user = await userModel.findById(req.user._id);

    // Check if user is an admin (role === 1)
    if (!user || user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error.message);
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

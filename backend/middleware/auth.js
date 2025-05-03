import jwt from "jsonwebtoken";
import { UserSchema } from "../models/User.js";
import mongoose from "mongoose";

const User = mongoose.model("User", UserSchema);

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = req.header("Authorization").replace("Bearer ", "");

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }

    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user; // Attach user to the request
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

export default auth;

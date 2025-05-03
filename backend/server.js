import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expenseRoutes from "./routes/expenses.js";
import goalRoutes from "./routes/goals.js";
import authRoutes from "./routes/auth.js";
import auth from "./middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/budgetflow", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/expenses", auth, expenseRoutes);
app.use("/api/goals", auth, goalRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import mongoose from "mongoose";
import { CategorySchema } from "../models/Category.js";
import dotenv from "dotenv";

dotenv.config();

const categories = [
  { value: "Food", label: "Food", color: "#10b981" },
  { value: "Shopping", label: "Shopping", color: "#f43f5e" },
  { value: "Utilities", label: "Utilities", color: "#64748b" },
  { value: "Entertainment", label: "Entertainment", color: "#8b5cf6" },
  { value: "Travel", label: "Travel", color: "#0ea5e9" },
  { value: "Other", label: "Other", color: "#f59e0b" },
];

// "node scripts/seedCategories.js" to run the seeding script

const Category = mongoose.model("Category", CategorySchema);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log("Categories seeded");
    process.exit();
  })
  .catch((err) => console.error(err));

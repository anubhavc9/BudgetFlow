import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  // name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

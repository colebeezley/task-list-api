import { Schema, Document, model } from "mongoose";
import mongoose from "mongoose";

interface myUser {
  username: String;
  password: String;
  todo_list: [String];
}

interface UserDocument extends myUser, Document {}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todo_list: [String],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

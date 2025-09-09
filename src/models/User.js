import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Please enter a valid email address",
      },
    },
    role: {
      type: String,
      enum: ["Admin", "Donor", "Employee"],
      default: "Donor",
    },
    password: {
      type: String,
      required: true,
    },
    active_account: {
      type: Boolean,
      default: false,
    },
    area_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Village",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: validator.isStrongPassword,
        message: "Password is not strong enough",
      },
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function (next) {
  // Encrypt password
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

export const User = mongoose.model("User", userSchema);

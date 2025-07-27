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
        validator: (password) =>
          validator.isStrongPassword(password, {
            minLength: 9,
            minNumbers: 1,
            minUppercase: 0,
            minSymbols: 0,
          }),
        message:
          "Password is not strong enough. It must be at least 9 characters long and contain at least one number.",
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

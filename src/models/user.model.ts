import mongoose from "mongoose";

export interface TUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  watchlist: string[];
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
}

const userSchema = new mongoose.Schema<TUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    watchlist: {
      type: [String],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
    },
    verifyCodeExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User =
  (mongoose.models?.User as mongoose.Model<TUser>) ||
  mongoose.model<TUser>("User", userSchema);

export default User;

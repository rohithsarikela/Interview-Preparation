import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const statsSchema = new mongoose.Schema(
  {
    totalSolved: { type: Number, default: 0 },
    totalAttempts: { type: Number, default: 0 },
    perTopic: [
      {
        topic: String,
        solved: { type: Number, default: 0 }
      }
    ],
    lastDailyQuestion: {
      question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      date: Date
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    stats: { type: statsSchema, default: () => ({}) }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";

const practiceSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    status: {
      type: String,
      enum: ["attempted", "solved"],
      default: "attempted"
    },
    timeTaken: { type: Number, default: 0 }, // seconds
    notes: String
  },
  { timestamps: true }
);

const PracticeSession = mongoose.model("PracticeSession", practiceSessionSchema);

export default PracticeSession;

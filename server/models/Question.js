import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g. "Arrays", "DP"
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy"
    },
    tags: [{ type: String }],
    examples: [
      {
        input: String,
        output: String,
        explanation: String
      }
    ],
    hints: [{ type: String }],
    solution: { type: String }, // explanation or link
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: true }
  },
  { timestamps: true }
);

questionSchema.virtual("score").get(function () {
  return this.upvotes - this.downvotes;
});

const Question = mongoose.model("Question", questionSchema);

export default Question;

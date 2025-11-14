import express from "express";
import PracticeSession from "../models/PracticeSession.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users/progress
router.get("/progress", protect, async (req, res) => {
  const userId = req.user._id;

  const sessions = await PracticeSession.find({ user: userId }).populate(
    "question"
  );

  const perTopic = {};
  let totalSolved = 0;
  let totalAttempts = sessions.length;

  sessions.forEach((s) => {
    const topic = s.question?.category || "General";
    if (!perTopic[topic]) perTopic[topic] = { solved: 0, attempts: 0 };
    perTopic[topic].attempts += 1;
    if (s.status === "solved") {
      perTopic[topic].solved += 1;
      totalSolved += 1;
    }
  });

  res.json({
    totalAttempts,
    totalSolved,
    perTopic
  });
});

// GET /api/users/bookmarks
router.get("/bookmarks", protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate("bookmarks");
  res.json(user.bookmarks || []);
});

export default router;

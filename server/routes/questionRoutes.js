import express from "express";
import { body, validationResult } from "express-validator";
import Question from "../models/Question.js";
import PracticeSession from "../models/PracticeSession.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================================
   GET ALL QUESTIONS
   /api/questions
   Supports: category, difficulty, search
========================================================= */
router.get("/", async (req, res) => {
  const { category, difficulty, search } = req.query;
  const filter = { isApproved: true };

  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;
  if (search) filter.title = { $regex: search, $options: "i" };

  const questions = await Question.find(filter).sort({ createdAt: -1 });
  res.json(questions);
});

/* =========================================================
   DAILY QUESTION — MUST BE BEFORE /:id !!!
   /api/questions/daily/today
========================================================= */
router.get("/daily/today", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If user already got today's daily question
  if (
    user.stats.lastDailyQuestion &&
    user.stats.lastDailyQuestion.date &&
    new Date(user.stats.lastDailyQuestion.date).getTime() === today.getTime()
  ) {
    const q = await Question.findById(user.stats.lastDailyQuestion.question);
    return res.json({ question: q, reused: true });
  }

  // Pick a random question
  const count = await Question.countDocuments({ isApproved: true });
  if (count === 0) {
    return res.status(404).json({ message: "No questions available" });
  }

  const randomIndex = Math.floor(Math.random() * count);
  const [randomQuestion] = await Question.find({ isApproved: true })
    .skip(randomIndex)
    .limit(1);

  // Save in user stats
  user.stats.lastDailyQuestion = {
    question: randomQuestion._id,
    date: today,
  };
  await user.save();

  res.json({ question: randomQuestion, reused: false });
});

/* =========================================================
   GET SINGLE QUESTION — MUST BE LAST
   /api/questions/:id
========================================================= */
router.get("/:id", async (req, res) => {
  const q = await Question.findById(req.params.id);
  if (!q) return res.status(404).json({ message: "Question not found" });
  res.json(q);
});

/* =========================================================
   CREATE QUESTION (USER SUBMISSION)
========================================================= */
router.post(
  "/",
  protect,
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("category").notEmpty(),
    body("difficulty").isIn(["Easy", "Medium", "Hard"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category, difficulty, tags, hints, solution } =
      req.body;

    const question = await Question.create({
      title,
      description,
      category,
      difficulty,
      tags: tags || [],
      hints: hints || [],
      solution: solution || "",
      createdBy: req.user._id,
    });

    res.status(201).json(question);
  }
);

/* =========================================================
   VOTING
========================================================= */
router.post("/:id/vote", protect, async (req, res) => {
  const { value } = req.body;

  if (![1, -1].includes(value)) {
    return res.status(400).json({ message: "Invalid vote value" });
  }

  const q = await Question.findById(req.params.id);
  if (!q) return res.status(404).json({ message: "Question not found" });

  value === 1 ? q.upvotes++ : q.downvotes++;
  await q.save();

  res.json({ upvotes: q.upvotes, downvotes: q.downvotes, score: q.score });
});

/* =========================================================
   BOOKMARK
========================================================= */
router.post("/:id/bookmark", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const qId = req.params.id;

  if (!user.bookmarks.includes(qId)) {
    user.bookmarks.push(qId);
    await user.save();
  }

  res.json({ bookmarks: user.bookmarks });
});

router.delete("/:id/bookmark", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const qId = req.params.id;

  user.bookmarks = user.bookmarks.filter(
    (b) => b.toString() !== qId.toString()
  );
  await user.save();

  res.json({ bookmarks: user.bookmarks });
});

/* =========================================================
   SUBMIT SESSION
========================================================= */
router.post("/:id/submit-session", protect, async (req, res) => {
  const { status, timeTaken, notes } = req.body;

  const session = await PracticeSession.create({
    user: req.user._id,
    question: req.params.id,
    status: status || "attempted",
    timeTaken: timeTaken || 0,
    notes: notes || "",
  });

  const user = await User.findById(req.user._id);
  user.stats.totalAttempts += 1;
  if (status === "solved") user.stats.totalSolved += 1;

  await user.save();

  res.status(201).json(session);
});

export default router;

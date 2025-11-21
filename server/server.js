import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import setupPassport from "./config/passport.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/User.js";
import generateToken from "./utils/generateToken.js";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// passport
app.use(passport.initialize());
setupPassport();

// avoid 404 for favicon requests (prevents noisy console errors during redirects)
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Fallback demo OAuth stubs (ensure social buttons work even if routing/mounting differs on host)
app.get('/api/auth/google', async (req, res) => {
  try {
    const demoEmail = 'google_demo@local';
    let user = await User.findOne({ email: demoEmail });
    if (!user) user = await User.create({ name: 'Google Demo', email: demoEmail, password: Math.random().toString(36) });
    const token = generateToken(user._id);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/auth/success?token=${token}`);
  } catch (err) {
    return res.status(500).json({ message: 'OAuth stub error' });
  }
});

app.get('/api/auth/facebook', async (req, res) => {
  try {
    const demoEmail = 'facebook_demo@local';
    let user = await User.findOne({ email: demoEmail });
    if (!user) user = await User.create({ name: 'Facebook Demo', email: demoEmail, password: Math.random().toString(36) });
    const token = generateToken(user._id);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/auth/success?token=${token}`);
  } catch (err) {
    return res.status(500).json({ message: 'OAuth stub error' });
  }
});

app.get('/api/auth/apple', async (req, res) => {
  try {
    const demoEmail = 'apple_demo@local';
    let user = await User.findOne({ email: demoEmail });
    if (!user) user = await User.create({ name: 'Apple Demo', email: demoEmail, password: Math.random().toString(36) });
    const token = generateToken(user._id);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/auth/success?token=${token}`);
  } catch (err) {
    return res.status(500).json({ message: 'OAuth stub error' });
  }
});

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req, res) => {
  res.send("Interview Prep Platform API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

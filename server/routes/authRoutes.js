import express from "express";
import { body, validationResult } from "express-validator";
import passport from "passport";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// If Passport strategies are configured, use them; otherwise fall back to simple demo stubs.
const GOOGLE_CONFIGURED = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_CONFIGURED = !!process.env.FACEBOOK_APP_ID && !!process.env.FACEBOOK_APP_SECRET;

// Start Google OAuth or fallback stub
router.get('/google', (req, res, next) => {
  if (GOOGLE_CONFIGURED) return passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  // stub
  (async () => {
    try {
      const demoEmail = 'google_demo@local';
      let user = await User.findOne({ email: demoEmail });
      if (!user) {
        user = await User.create({ name: 'Google Demo', email: demoEmail, password: Math.random().toString(36) });
      }
      const token = generateToken(user._id);
      const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
      return res.redirect(`${clientUrl}/auth/success?token=${token}`);
    } catch (error) {
      return res.status(500).send('OAuth stub error');
    }
  })();
});

// Google callback
router.get('/google/callback', (req, res, next) => {
  if (!GOOGLE_CONFIGURED) return res.status(404).send('Not configured');
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) return res.status(500).send('OAuth error');
    const token = generateToken(user._id);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/auth/success?token=${token}`);
  })(req, res, next);
});

// Start Facebook OAuth or fallback stub
router.get('/facebook', (req, res, next) => {
  if (FACEBOOK_CONFIGURED) return passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
  // stub
  (async () => {
    try {
      const demoEmail = 'facebook_demo@local';
      let user = await User.findOne({ email: demoEmail });
      if (!user) {
        user = await User.create({ name: 'Facebook Demo', email: demoEmail, password: Math.random().toString(36) });
      }
      const token = generateToken(user._id);
      const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
      return res.redirect(`${clientUrl}/auth/success?token=${token}`);
    } catch (error) {
      return res.status(500).send('OAuth stub error');
    }
  })();
});

// Facebook callback
router.get('/facebook/callback', (req, res, next) => {
  if (!FACEBOOK_CONFIGURED) return res.status(404).send('Not configured');
  passport.authenticate('facebook', { session: false }, (err, user) => {
    if (err || !user) return res.status(500).send('OAuth error');
    const token = generateToken(user._id);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/auth/success?token=${token}`);
  })(req, res, next);
});

// Apple remains as a demo stub (implementing Apple Sign-In requires additional setup)
router.get('/apple', async (req, res) => {
  try {
    const demoEmail = 'apple_demo@local';
    let user = await User.findOne({ email: demoEmail });
    if (!user) {
      user = await User.create({ name: 'Apple Demo', email: demoEmail, password: Math.random().toString(36) });
    }
    const token = generateToken(user._id);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/auth/success?token=${token}`);
  } catch (error) {
    return res.status(500).send('OAuth stub error');
  }
});

// POST /api/auth/register
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Min 6 chars password")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await User.create({ name, email, password });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// GET /api/auth/me
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

export default router;

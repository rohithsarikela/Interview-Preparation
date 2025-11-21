import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// DB Connection
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import playgroundRoutes from "./routes/playgroundRoutes.js";

// Error middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load .env
dotenv.config();

// --------------------------------------
// CREATE APP  (this MUST be at the top)
// --------------------------------------
const app = express();

// --------------------------------------
// CONNECT DATABASE
// --------------------------------------
connectDB();

// --------------------------------------
// MIDDLEWARE
// --------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Prevent favicon error
app.get("/favicon.ico", (req, res) => res.status(204).end());

// --------------------------------------
// BASE ROUTE
// --------------------------------------
app.get("/", (req, res) => {
  res.send("Interview Prep Platform API is running");
});

// --------------------------------------
// API ROUTES
// --------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);

// --------------------------------------
// CODING PLAYGROUND ROUTE
// --------------------------------------
app.use("/playground", playgroundRoutes);

// --------------------------------------
// ERROR HANDLERS
// --------------------------------------
app.use(notFound);
app.use(errorHandler);

// --------------------------------------
// START SERVER
// --------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

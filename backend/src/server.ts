import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import session from "express-session";

import passport from "./config/passport";
import mongoose from 'mongoose';

import mongoRouter from "./routes/mongoRoute";
import googleRouter from "./routes/googleRoute";
import geminiRouter from "./routes/geminiRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5001", // frontend dev server URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.use(
    session({
    secret: process.env.SESSION_SECRET || "supersecret", // Used to sign the session ID cookie
    resave: false, // Don't force session save if unmodified
    saveUninitialized: false, // Don't save empty sessions
    cookie: {
      secure: false, // Set true if using HTTPS (e.g., production)
      httpOnly: true, // Helps prevent client-side JS from accessing cookie
      maxAge: 1000 * 60 * 60 * 24, // 1 day session expiration
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI!, {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use("/google", googleRouter)
app.use("/database", mongoRouter)
app.use('/gemini', geminiRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
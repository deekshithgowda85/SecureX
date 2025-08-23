import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import News from "./models/news.js";
import aiRoutes from "./routes/aiRoutes.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "https://securex-innovatrix.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  credentials: true
}));

const NEWS_API_KEY = process.env.NEWS_API_KEY  ;
 
// 🔹 MongoDB connection
mongoose.connect(process.env.MONGO_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => console.log("✅ MongoDB connected"));

// Adjustable refresh interval (in minutes)
const REFRESH_INTERVAL_MIN = process.env.REFRESH_INTERVAL || 100;

// Function to fetch and cache in DB
const fetchAndStoreNews = async () => {
  try {
    const api = `https://newsapi.org/v2/everything?q=cyber&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;
    const response = await axios.get(api);

    if (response.data.status === "ok" && response.data.articles) {
      await News.deleteMany({}); // Clear old cache
      await News.insertMany(response.data.articles);
      console.log("✅ News updated in DB");
    }
  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
  }
};

// 🔹 API endpoint
app.get("/api/cyber-news", async (req, res) => {
  try {
    const latest = await News.find().sort({ publishedAt: -1 });

    if (!latest.length) {
      console.log("⚡ DB empty, fetching from API...");
      await fetchAndStoreNews();
      const fresh = await News.find().sort({ publishedAt: -1 });
      return res.json({ articles: fresh });
    }

    res.json({ articles: latest });
  } catch (error) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({ error: "Failed to fetch cyber news" });
  }
});

// 🔹 Schedule periodic refresh
setInterval(fetchAndStoreNews, REFRESH_INTERVAL_MIN * 60 * 1000);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

app.use("/ai",aiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 AI routes: http://localhost:${PORT}/ai/gemini/:topic`);
});

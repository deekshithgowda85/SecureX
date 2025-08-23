import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
const app = express();
const PORT = 5000;
app.use(cors());
const NEWS_API_KEY = process.env.NEWS_API_KEY||"3fc5b5802df542b7b4514d01ab92cf4c";

app.get("/api/cyber-news", async (req, res) => {
  try {
    const api = `https://newsapi.org/v2/everything?q=cyber&from=2025-07-23&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

    const response = await axios.get(api);

    if (response.data.status !== "ok") {
      console.error("❌ NewsAPI error:", response.data);
      return res.status(500).json(response.data);
    }

    res.json(response.data); // send to frontend
  } catch (error) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({ error: "Failed to fetch cyber news" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

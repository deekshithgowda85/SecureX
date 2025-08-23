// routes/gemini.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { lessonQuizPrompt } from "../prompts/geminiPrompts.js";
import dotenv from "dotenv";
dotenv.config();
// In your main app file (e.g., app.js or server.js), use the route
import aiRoutes from "./routes/gemini.js";
app.use("/ai", aiRoutes);

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper: clean Gemini output
function cleanGeminiResponse(text) {
  try {
    // Remove Markdown fences if present
    let cleaned = text.replace(/```json|```/g, "").trim();

    // Parse JSON
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ Failed to parse Gemini output:", err.message);
    return null;
  }
}

// Cybersecurity Lessons + Quizzes
router.get("/ai/gemini/:topic", async (req, res) => {
  const { topic } = req.params;
  const prompt = lessonQuizPrompt(topic);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const lessonData = cleanGeminiResponse(text);

    if (!lessonData) {
      return res.status(500).json({
        error: "Failed to parse Gemini response",
        raw: text
      });
    }

    res.json(lessonData);
  } catch (error) {
    console.error("❌ Gemini error:", error.message);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

export default router;



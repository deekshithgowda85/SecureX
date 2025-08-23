// routes/gemini.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { lessonQuizPrompt } from "../prompts/geminiPrompts.js";
import dotenv from "dotenv";
dotenv.config();
// In your main app file (e.g., app.js or server.js), use the route
 

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
router.get("/gemini/:topic", async (req, res) => {
  const { topic } = req.params;
  
  if (!topic) {
    return res.status(400).json({ error: "Topic parameter is required" });
  }

  console.log("🎯 Generating content for topic:", topic);
  const prompt = lessonQuizPrompt(topic);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("📝 Raw Gemini response:", text.substring(0, 200) + "...");

    const lessonData = cleanGeminiResponse(text);

    if (!lessonData) {
      console.error("❌ Failed to parse Gemini response for topic:", topic);
      return res.status(500).json({
        error: "Failed to parse AI response. Please try again.",
        topic: topic
      });
    }

    // Validate the response structure
    if (!lessonData.quiz || !Array.isArray(lessonData.quiz)) {
      console.error("❌ Invalid quiz structure for topic:", topic, lessonData);
      return res.status(500).json({
        error: "Invalid quiz structure received from AI. Please try again.",
        topic: topic
      });
    }

    console.log("✅ Successfully generated content for topic:", topic);
    res.json(lessonData);
  } catch (error) {
    console.error("❌ Gemini error for topic:", topic, error.message);
    res.status(500).json({ 
      error: "Failed to generate content. Please try again.",
      topic: topic,
      details: error.message
    });
  }
});

// Test endpoint for debugging
router.get("/test/:topic", (req, res) => {
  const { topic } = req.params;
  res.json({
    topic: topic,
    lesson: `This is a test lesson about ${topic}.`,
    tips: [
      `First tip about ${topic}`,
      `Second tip about ${topic}`,
      `Third tip about ${topic}`
    ],
    quiz: [
      {
        question: `What is the main concern with ${topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option A"
      },
      {
        question: `How can you protect against ${topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option B"
      },
      {
        question: `Which tool is best for ${topic} detection?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option C"
      }
    ]
  });
});

export default router;



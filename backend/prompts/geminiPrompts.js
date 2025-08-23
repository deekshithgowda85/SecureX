// prompts/geminiPrompts.js

export const lessonQuizPrompt = (topic) => `
You are a cybersecurity trainer. 
Create a structured cybersecurity lesson about "${topic}".

Include:
1. Lesson (200–300 words, simple explanation)
2. 3 Key Safety/Best Practices
3. 3 Multiple-choice Quiz Questions (with options + correct answer)

Return the response strictly in JSON format:
{
  "topic": "${topic}",
  "lesson": "...",
  "tips": ["...", "...", "..."],
  "quiz": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "answer": "..."
    }
  ]
}
`;

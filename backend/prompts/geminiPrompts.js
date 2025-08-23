// prompts/geminiPrompts.js

export const lessonQuizPrompt = (topic) => `
You are a cybersecurity trainer. 
Create a structured cybersecurity lesson about "${topic}".

IMPORTANT: You MUST return ONLY valid JSON. No markdown, no explanations, just pure JSON.

Include:
1. Lesson (200–300 words, simple explanation)
2. 3 Key Safety/Best Practices
3. 3 Multiple-choice Quiz Questions (with options + correct answer)

The response MUST be in this exact JSON format:
{
  "topic": "${topic}",
  "lesson": "Your lesson content here...",
  "tips": [
    "First safety tip",
    "Second safety tip", 
    "Third safety tip"
  ],
  "quiz": [
    {
      "question": "Your first question here?",
      "options": [
        "Option A",
        "Option B", 
        "Option C",
        "Option D"
      ],
      "answer": "Correct option from the options array"
    },
    {
      "question": "Your second question here?",
      "options": [
        "Option A",
        "Option B",
        "Option C", 
        "Option D"
      ],
      "answer": "Correct option from the options array"
    },
    {
      "question": "Your third question here?",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "answer": "Correct option from the options array"
    }
  ]
}

Remember: Return ONLY the JSON object, no other text or formatting.
`;

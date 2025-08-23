import React from 'react';
import { useParams } from 'react-router-dom';

const quizData = {
  students: [
    {
      question: "What is a common scam targeting students?",
      options: ["Fake job offers", "Tech support scams", "Pension fraud", "Agricultural scams"],
      answer: 0
    }
  ],
  professionals: [
    {
      question: "Which is a typical phishing attempt?",
      options: ["Fake investment schemes", "Medicine fraud", "Prize scams", "Mobile banking fraud"],
      answer: 0
    }
  ],
  homemakers: [
    {
      question: "What should you check before shopping online?",
      options: ["Website security", "Color of the site", "Number of ads", "None"],
      answer: 0
    }
  ],
  rural: [
    {
      question: "How to avoid digital payment fraud?",
      options: ["Verify recipient", "Ignore OTPs", "Share passwords", "Trust all links"],
      answer: 0
    }
  ],
  seniors: [
    {
      question: "What is a health insurance fraud?",
      options: ["Fake policies", "Real policies", "Government schemes", "Tech support"],
      answer: 0
    }
  ]
};

const Quiz = () => {
  const { demographic } = useParams();
  const questions = quizData[demographic] || [];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-600">
      <h2 className="text-2xl font-bold mb-6">Quiz for {demographic.charAt(0).toUpperCase() + demographic.slice(1)}</h2>
      {questions.length === 0 ? (
        <p>No quiz available for this demographic.</p>
      ) : (
        <div className="bg-blue-500 p-6 rounded shadow w-full max-w-md">
          {questions.map((q, idx) => (
            <div key={idx} className="mb-6">
              <p className="font-medium mb-2">{q.question}</p>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i} className="mb-1">
                    <button className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-500">{opt}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
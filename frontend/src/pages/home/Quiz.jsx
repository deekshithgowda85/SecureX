import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const teachContent = {
  students: "Students are often targeted by scams such as fake job offers, phishing emails, and requests for sensitive documents. Always verify sources and never share personal information online.",
  professionals: "Professionals should be wary of phishing attempts, fake investment schemes, and suspicious emails. Always check sender addresses and avoid clicking unknown links.",
  homemakers: "Homemakers should check website security before shopping online and be cautious of fake offers. Read reviews and avoid sharing financial details.",
  rural: "Rural residents should verify recipients before making digital payments and avoid sharing OTPs or passwords. Hang up on suspicious calls.",
  seniors: "Seniors are targeted by health insurance and pension scams. Always verify sources and never share OTPs or personal details with unknown callers."
};

const quizData = {
  students: [
    {
      question: "What is a common scam targeting students?",
      options: ["Fake job offers", "Tech support scams", "Pension fraud", "Agricultural scams"],
      answer: 0
    },
    {
      question: "Which document should you never share online?",
      options: ["Aadhaar card", "Library card", "Bus pass", "College ID"],
      answer: 0
    },
    {
      question: "What should you do if you receive a suspicious email?",
      options: ["Ignore or report it", "Reply immediately", "Share with friends", "Click all links"],
      answer: 0
    },
    {
      question: "Which is a safe way to apply for jobs?",
      options: ["Through official portals", "Via random WhatsApp links", "By paying upfront", "Through unknown emails"],
      answer: 0
    },
    {
      question: "What is phishing?",
      options: ["Fake emails to steal info", "A type of fish", "Online shopping", "Mobile recharge"],
      answer: 0
    },
    {
      question: "How can you verify a job offer?",
      options: ["Check company website", "Trust all offers", "Ignore details", "Pay money first"],
      answer: 0
    },
    {
      question: "What should you do with your passwords?",
      options: ["Keep them private", "Share with friends", "Write on social media", "Email to strangers"],
      answer: 0
    },
    {
      question: "Which is a sign of a scam?",
      options: ["Too good to be true", "Official logo", "Correct grammar", "Known sender"],
      answer: 0
    },
    {
      question: "What is the safest way to pay online?",
      options: ["Secure payment gateway", "Send cash", "Share OTP", "Trust unknown apps"],
      answer: 0
    },
    {
      question: "What should you do if you suspect a scam?",
      options: ["Report to authorities", "Ignore", "Share with friends", "Pay anyway"],
      answer: 0
    }
  ],
  professionals: [
    {
      question: "Which is a typical phishing attempt?",
      options: ["Fake investment schemes", "Medicine fraud", "Prize scams", "Mobile banking fraud"],
      answer: 0
    },
    {
      question: "What should you check in suspicious emails?",
      options: ["Sender address", "Font style", "Attachment size", "Color scheme"],
      answer: 0
    },
    {
      question: "What is vishing?",
      options: ["Voice phishing", "Video phishing", "Visually impaired phishing", "Viral phishing"],
      answer: 0
    },
    {
      question: "How can professionals protect their data?",
      options: ["Use strong passwords", "Share passwords with colleagues", "Write passwords on sticky notes", "Use the same password for all accounts"],
      answer: 0
    },
    {
      question: "What should you do if you receive an unsolicited job offer?",
      options: ["Research the company", "Reply with your details", "Accept immediately", "Ignore it"],
      answer: 0
    },
    {
      question: "Which of these is a secure website?",
      options: ["http://example.com", "https://example.com", "ftp://example.com", "www.example.com"],
      answer: 1
    },
    {
      question: "What is the risk of using public Wi-Fi for banking?",
      options: ["High risk", "Low risk", "No risk", "Depends on the bank"],
      answer: 0
    },
    {
      question: "How often should you update your passwords?",
      options: ["Regularly", "Never", "Only when you forget", "Once a year"],
      answer: 0
    },
    {
      question: "What is a common feature of phishing emails?",
      options: ["Urgent language", "Personal greeting", "Correct spelling", "Official logo"],
      answer: 0
    },
    {
      question: "What should you do with unknown email attachments?",
      options: ["Delete them", "Open them", "Forward to friends", "Save them"],
      answer: 0
    }
  ],
  homemakers: [
    {
      question: "What should you check before shopping online?",
      options: ["Website security", "Color of the site", "Number of ads", "None"],
      answer: 0
    },
    {
      question: "How to spot fake offers?",
      options: ["Check reviews", "Trust all ads", "Ignore prices", "Buy immediately"],
      answer: 0
    },
    {
      question: "What is the first step in online shopping?",
      options: ["Research the product", "Buy immediately", "Ignore reviews", "Trust the seller"],
      answer: 0
    },
    {
      question: "How can you ensure a website is secure?",
      options: ["Look for HTTPS", "Check for ads", "Ignore the URL", "Trust any website"],
      answer: 0
    },
    {
      question: "What should you do if a deal seems too good to be true?",
      options: ["Verify the offer", "Share with friends", "Ignore it", "Accept it immediately"],
      answer: 0
    },
    {
      question: "How to protect your financial information online?",
      options: ["Use secure websites", "Share with trusted friends", "Ignore security warnings", "Use public Wi-Fi"],
      answer: 0
    },
    {
      question: "What is a common tactic used in online scams?",
      options: ["Urgency", "Discounts", "Free gifts", "All of the above"],
      answer: 0
    },
    {
      question: "How to identify a secure payment gateway?",
      options: ["Look for padlock symbol", "Check for low prices", "Ignore the URL", "Trust any payment method"],
      answer: 0
    },
    {
      question: "What should you do if you receive unsolicited offers via email?",
      options: ["Delete them", "Reply with personal info", "Trust the sender", "Forward to everyone"],
      answer: 0
    },
    {
      question: "How can you verify the authenticity of an online store?",
      options: ["Check reviews and ratings", "Trust the website design", "Ignore customer feedback", "Assume all stores are genuine"],
      answer: 0
    }
  ],
  rural: [
    {
      question: "How to avoid digital payment fraud?",
      options: ["Verify recipient", "Ignore OTPs", "Share passwords", "Trust all links"],
      answer: 0
    },
    {
      question: "What should you do if you get a suspicious call?",
      options: ["Hang up", "Share details", "Send money", "Trust caller"],
      answer: 0
    },
    {
      question: "What is the safest way to make a digital payment?",
      options: ["Use trusted apps", "Share your PIN", "Ignore security alerts", "Use public Wi-Fi"],
      answer: 0
    },
    {
      question: "How to identify a scam call?",
      options: ["Unknown number", "Too good to be true offers", "Urgent requests", "All of the above"],
      answer: 0
    },
    {
      question: "What should you do if you receive a suspicious message?",
      options: ["Do not respond", "Reply with personal info", "Click on links", "Share with friends"],
      answer: 0
    },
    {
      question: "How can you protect your phone from scams?",
      options: ["Use security apps", "Ignore updates", "Share with strangers", "Trust all downloads"],
      answer: 0
    },
    {
      question: "What is the risk of sharing OTPs?",
      options: ["High risk", "Low risk", "No risk", "Depends on the amount"],
      answer: 0
    },
    {
      question: "How to verify the authenticity of a caller?",
      options: ["Call back on official number", "Trust the caller ID", "Ignore the call", "Share information to confirm"],
      answer: 0
    },
    {
      question: "What should you do if you suspect a scam?",
      options: ["Report to authorities", "Ignore it", "Share with friends", "Get involved"],
      answer: 0
    },
    {
      question: "How can you educate others about scams?",
      options: ["Share your knowledge", "Ignore the issue", "Assume everyone knows", "Rely on authorities"],
      answer: 0
    }
  ],
  seniors: [
    {
      question: "What is a health insurance fraud?",
      options: ["Fake policies", "Real policies", "Government schemes", "Tech support"],
      answer: 0
    },
    {
      question: "How to avoid pension scams?",
      options: ["Verify sources", "Share OTP", "Trust unknown callers", "Ignore documents"],
      answer: 0
    },
    {
      question: "What should you do if you receive a suspicious call about your pension?",
      options: ["Hang up", "Provide details", "Ask for more information", "Trust the caller"],
      answer: 0
    },
    {
      question: "How can you protect yourself from identity theft?",
      options: ["Shred documents", "Share your Aadhaar number", "Ignore bank statements", "Use simple passwords"],
      answer: 0
    },
    {
      question: "What is the safest way to access your bank account?",
      options: ["Official bank app", "Public Wi-Fi", "Shared computers", "Unknown links"],
      answer: 0
    },
    {
      question: "How often should you check your bank statements?",
      options: ["Regularly", "Only when you suspect fraud", "Never", "Once a year"],
      answer: 0
    },
    {
      question: "What should you do if you fall victim to a scam?",
      options: ["Report to the police", "Ignore it", "Tell everyone", "Pay the scammer"],
      answer: 0
    },
    {
      question: "How can you recognize a legitimate government scheme?",
      options: ["Official website", "Social media", "Word of mouth", "Emails from unknown sources"],
      answer: 0
    },
    {
      question: "What is the danger of sharing your pension details?",
      options: ["Risk of scams", "No danger", "Only with family", "Only with trusted friends"],
      answer: 0
    },
    {
      question: "How to stay updated about common scams?",
      options: ["Read newspapers", "Ignore news", "Rely on TV", "Ask friends"],
      answer: 0
    }
  ]
};

const Quiz = () => {
  const { demographic } = useParams();
  const questions = quizData[demographic] || [];
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  const handleSelect = (qIdx, optIdx) => {
    const updated = [...selected];
    updated[qIdx] = optIdx;
    setSelected(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black-600">
      {!started ? (
        <div className="w-full max-w-2xl bg-black-400 p-8 rounded shadow flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">
            Learn About Scams ({demographic.charAt(0).toUpperCase() + demographic.slice(1)})
          </h2>
          <p className="text-lg mb-8">{teachContent[demographic]}</p>
          <button
            className="px-6 py-3 bg-black-600 text-white rounded hover:bg-blue-700 text-xl"
            onClick={handleStart}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="bg-black-500 p-6 rounded shadow w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">
            Quiz for {demographic.charAt(0).toUpperCase() + demographic.slice(1)}
          </h2>
          {questions.length === 0 ? (
            <p>No quiz available for this demographic.</p>
          ) : (
            <form>
              {questions.map((q, idx) => (
                <div key={idx} className="mb-6">
                  <p className="font-medium mb-2">
                    Question {idx + 1}: {q.question}
                  </p>
                  <ul>
                    {q.options.map((opt, i) => {
                      let optionStyle = "mr-2";
                      if (submitted) {
                        if (selected[idx] === i && i === q.answer) {
                          optionStyle += " text-green-600 font-bold"; // Correct selected
                        } else if (selected[idx] === i && i !== q.answer) {
                          optionStyle += " text-red-600 font-bold"; // Wrong selected
                        } else if (i === q.answer) {
                          optionStyle += " text-green-600"; // Correct answer
                        }
                      }
                      return (
                        <li key={i} className="mb-1">
                          <label className={`flex items-center ${submitted ? "cursor-default" : ""}`}>
                            <input
                              type="radio"
                              name={`question-${idx}`}
                              value={i}
                              checked={selected[idx] === i}
                              disabled={submitted}
                              onChange={() => handleSelect(idx, i)}
                              className={optionStyle}
                            />
                            <span className={optionStyle}>{opt}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  {submitted && (
                    <div className="mt-1">
                      {selected[idx] === q.answer ? (
                        <span className="text-green-700 font-semibold">Correct</span>
                      ) : (
                        <span className="text-red-700 font-semibold">
                          Wrong. Correct answer: <span className="text-green-700">{q.options[q.answer]}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {!submitted ? (
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
                  onClick={handleSubmit}
                  disabled={selected.includes(null)}
                >
                  Submit
                </button>
              ) : (
                <div className="mt-4 text-lg font-semibold text-white">
                  Your Score: {selected.filter((val, idx) => val === questions[idx]?.answer).length} / {questions.length}
                </div>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
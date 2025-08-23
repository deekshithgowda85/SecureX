import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

// ✅ Gemini client
const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const FloatingChatbot = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm your Cybersecurity Assistant. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = async (userMessage) => {
    const fallback = "⚠️ Something went wrong. Please try again.";

    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are a helpful cybersecurity assistant.
       Always give well-structured answers with proper formatting.
      If the user asks for code, respond with clean markdown code blocks.
            
     User: ${userMessage}`;

      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.error("Gemini error:", err);
      return fallback;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    const reply = await getBotResponse(userMsg);
    setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Expose openChat to parent via ref
  useImperativeHandle(ref, () => ({
    openChat: () => setIsOpen(true)
  }));

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-white text-black rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center relative group z-50 border border-black"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            backgroundColor: '#fff',
            color: '#000',
            borderRadius: '50%',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.08)',
            zIndex: 9999,
            border: '2px solid #000',
            cursor: 'pointer'
          }}
        >
          <MessageCircle size={24} color="black" />
          {/* Notification dot */}
          <div 
            className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full animate-pulse"
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '12px',
              height: '12px',
              backgroundColor: '#000',
              borderRadius: '50%'
            }}
          ></div>
          {/* Tooltip */}
          <div 
            className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-white text-black text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-black"
            style={{
              position: 'absolute',
              right: '64px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#fff',
              color: 'black',
              fontSize: '14px',
              padding: '4px 12px',
              borderRadius: '8px',
              whiteSpace: 'nowrap',
              opacity: 0,
              border: '1px solid #000',
              transition: 'opacity 0.3s'
            }}
          >
            Need cybersecurity help?
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-6 w-80 sm:w-96 min-h-[400px] max-h-[80vh] bg-white text-black rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-black animate-in slide-in-from-bottom-5 duration-300 z-50"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '384px',
            minHeight: '400px',
            maxHeight: '80vh',
            backgroundColor: '#fff',
            color: '#000',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
            border: '2px solid #000',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-white text-black border-b border-black">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <h2 className="font-semibold text-lg">Cybersecurity Assistant</h2>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 hover:bg-black/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white min-h-[300px] max-h-[60vh]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 break-words ${
                    msg.sender === "user"
                      ? "bg-black text-white rounded-br-md"
                      : "bg-white text-black rounded-bl-md shadow-sm border border-black"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {msg.sender === 'bot' && (
                      <Bot className="w-4 h-4 mt-0.5 text-black flex-shrink-0" />
                    )}
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none text-black">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code: ({node, inline, className, children, ...props}) => {
                            return inline ? (
                              <code className="bg-black text-white px-1 py-0.5 rounded text-xs" {...props}>
                                {children}
                              </code>
                            ) : (
                              <code className="block bg-black text-white p-2 rounded text-xs overflow-x-auto" {...props}>
                                {children}
                              </code>
                            );
                          },
                          p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({children}) => <ul className="ml-4 mb-2">{children}</ul>,
                          ol: ({children}) => <ol className="ml-4 mb-2">{children}</ol>,
                          li: ({children}) => <li className="mb-1">{children}</li>,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    {msg.sender === 'user' && (
                      <User className="w-4 h-4 mt-0.5 text-black flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-black rounded-2xl rounded-bl-md px-4 py-2 shadow-sm border border-black">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-black" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white border-black">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border border-black bg-white text-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm placeholder-black"
                placeholder="Ask about cybersecurity..."
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-black text-white p-2 rounded-full hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating particles effect */}
      {!isOpen && (
        <div 
          className="fixed bottom-6 right-6 pointer-events-none z-40"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            pointerEvents: 'none',
            zIndex: 9998
          }}
        >
          <div className="absolute w-2 h-2 bg-black rounded-full opacity-20 animate-ping" style={{top: '10%', left: '20%', animationDelay: '0s'}}></div>
          <div className="absolute w-1 h-1 bg-black rounded-full opacity-30 animate-ping" style={{top: '60%', left: '80%', animationDelay: '1s'}}></div>
          <div className="absolute w-1.5 h-1.5 bg-black rounded-full opacity-25 animate-ping" style={{top: '80%', left: '30%', animationDelay: '2s'}}></div>
        </div>
      )}
    </>
  );
});

export default FloatingChatbot;
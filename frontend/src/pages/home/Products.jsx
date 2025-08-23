import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsNavbar from '../../components/NewsNavbar';
import Footer from '../../components/Footer';
import { 
  Shield, 
  Search,
  Mail,
  MessageCircle,
  Network,
  Eye,
  CreditCard,
  Lock,
  Globe,
  CheckCircle,
  Brain,
  AlertTriangle,
  Zap,
  Star
} from 'lucide-react';
import FloatingChatbot from '../../components/Chatbot'; // Import your chatbot

const Products = () => {
  const stats = [
    { number: '12.9M+', label: 'Protected Users' },
    { number: '45K+', label: 'Daily Threats Blocked' },
    { number: '99.7%', label: 'Detection Accuracy' },
    { number: '24/7', label: 'Real-time Protection' }
  ];

  const navigate = useNavigate();
  const chatbotRef = useRef();

  // Function to open chatbot
  const openChatbot = () => {
    if (chatbotRef.current && chatbotRef.current.openChat) {
      chatbotRef.current.openChat();
    } else if (window && window.$crisp) {
      window.$crisp.push(['do', 'chat:open']);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <NewsNavbar />
      {/* Hero Section */}
      <section className="bg-white text-black py-16 border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Advanced Cybersecurity Made Simple
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-black">
            Protect yourself and your family from phishing, fraud, and cyber threats with our AI-powered security suite designed specifically for Indian users.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2 text-black">{stat.number}</div>
                <div className="text-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className='flex flex-row justify-center items-center gap-8 bg-white py-16'>
        {/* Profile/News Card Section */}
        <section>
          <div
            className="max-w-md w-full bg-white text-black rounded-lg shadow-lg p-8 flex flex-col items-center border border-black cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate('/news')}
          >
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&q=80"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 border-4 border-black"
            />
            <h4 className="text-2xl font-bold mb-2">Cybersecurity News</h4>
            <p className="text-base mb-4 text-center">
              <strong>Latest:</strong> Over 45,000 phishing attempts blocked this week. Stay vigilant and check all suspicious emails and links before clicking.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-5 h-5" />
              <span>SecureX News Desk</span>
            </div>
          </div>
        </section>

        <section>
          <div
            className="max-w-md w-full bg-white text-black rounded-lg shadow-lg p-8 flex flex-col items-center border border-black cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate('/quiz')}
          >
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80"
              alt="Product"
              className="w-24 h-24 rounded-full mb-4 border-4 border-black"
            />
            <h4 className="text-2xl font-bold mb-2">SecureX Quiz</h4>
            <p className="text-base mb-4 text-center">
              <strong>Latest:</strong> Test your knowledge with our interactive quiz! Learn about cybersecurity threats and how to protect yourself.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-5 h-5" />
              <span>SecureX Learning Desk</span>
            </div>
          </div>
        </section>

        {/* Product Card Section */}
        <section>
          <div
            className="max-w-md w-full bg-white text-black rounded-lg shadow-lg p-8 flex flex-col items-center border border-black cursor-pointer hover:shadow-xl transition"
            onClick={openChatbot}
            tabIndex={0}
            role="button"
            aria-label="Open SecureX Chatbot Assistance"
          >
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80"
              alt="Chatbot"
              className="w-24 h-24 rounded-full mb-4 border-4 border-black"
            />
            <h4 className="text-2xl font-bold mb-2">SecureX Chatbot Assistance</h4>
            <p className="text-base mb-4 text-center">
              <strong>Need help?</strong> Our AI-powered chatbot is available 24/7 to answer your cybersecurity questions, guide you through threat detection, and provide instant support.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-5 h-5" />
              <span>SecureX Support</span>
            </div>
          </div>
        </section>
      </div>
      {/* Place the chatbot component at the root so it's always available */}
      <FloatingChatbot ref={chatbotRef} />
      <Footer />
    </div>
  );
};

export default Products;
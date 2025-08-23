import { useState } from 'react'
import React from 'react'
import Navbar from '../../components/Navbar'
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

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('protection');

  const featureCategories = {
    protection: {
      title: 'Threat Protection',
      icon: Shield,
      features: [
        {
          icon: Mail,
          title: 'Email & SMS Spam Detector',
          description: 'AI-powered detection of phishing emails and fake OTP requests with 99.7% accuracy',
          highlight: '45K+ threats blocked daily'
        },
        {
          icon: Search,
          title: 'IP Address & URL Checker',
          description: 'Real-time verification of suspicious websites and IP addresses before you visit',
          highlight: 'Checks 2M+ URLs daily'
        },
        {
          icon: MessageCircle,
          title: 'WhatsApp & Call Protector',
          description: 'Identifies suspicious messages, fake forwards, and fraudulent calls automatically',
          highlight: '98% scam call detection'
        },
        {
          icon: Network,
          title: 'WiFi Security Scanner',
          description: 'Monitors public WiFi networks for security risks and suspicious activities',
          highlight: 'Real-time network monitoring'
        }
      ]
    },
    verification: {
      title: 'Identity Verification',
      icon: CheckCircle,
      features: [
        {
          icon: Eye,
          title: 'Caller ID Intelligence',
          description: 'Instantly identifies unknown numbers with fraud risk scores and business verification',
          highlight: '10M+ numbers in database'
        },
        {
          icon: CreditCard,
          title: 'UPI Payment Guardian',
          description: 'Scans QR codes and payment requests for safety before transactions',
          highlight: 'Protects ₹500Cr+ transactions'
        },
        {
          icon: Lock,
          title: 'Document Authenticity Scanner',
          description: 'Verifies certificates, IDs, and official documents using advanced image analysis',
          highlight: 'Supports 50+ document types'
        },
        {
          icon: Globe,
          title: 'Website Safety Validator',
          description: 'Checks e-commerce sites, banking portals, and government websites for authenticity',
          highlight: 'Validates 1M+ sites monthly'
        }
      ]
    },
    monitoring: {
      title: 'Smart Monitoring',
      icon: Brain,
      features: [
        {
          icon: AlertTriangle,
          title: 'Threat Intelligence Dashboard',
          description: 'Live visualization of fraud incidents and emerging threat patterns across India',
          highlight: 'Real-time threat mapping'
        },
        {
          icon: Zap,
          title: 'Behavioral Analytics',
          description: 'AI monitors your digital behavior to detect unusual activities and potential threats',
          highlight: 'Learns your patterns'
        },
        {
          icon: Search,
          title: 'Dark Web Monitoring',
          description: 'Watches for your personal data being sold on underground markets',
          highlight: 'Monitors 500+ dark sites'
        },
        {
          icon: Network,
          title: 'Data Breach Alerts',
          description: 'Instant notifications when your email/phone appears in known data breaches',
          highlight: 'Tracks 10K+ breaches'
        }
      ]
    }
  };

  const stats = [
    { number: '12.9M+', label: 'Protected Users' },
    { number: '45K+', label: 'Daily Threats Blocked' },
    { number: '99.7%', label: 'Detection Accuracy' },
    { number: '24/7', label: 'Real-time Protection' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
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

      {/* Feature Categories */}
      <section className="py-16 bg-white border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-black mb-4">
              Comprehensive Security Features
            </h3>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Our platform offers multiple layers of protection tailored to Indian cyber threats
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-black p-1 flex space-x-1">
              {Object.entries(featureCategories).map(([key, category]) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                      activeCategory === key
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{category.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featureCategories[activeCategory].features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-black p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-black text-white">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-black mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-black mb-3">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-sm">
                        <Star className="w-4 h-4 text-black mr-1" />
                        <span className="font-medium text-black">{feature.highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className='flex flex-row justify-center items-center gap-8 bg-white py-16'>
        {/* Profile/News Card Section */}
        <section>
          <div className="max-w-md w-full bg-white text-black rounded-lg shadow-lg p-8 flex flex-col items-center border border-black">
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
          <div className="max-w-md w-full bg-white text-black rounded-lg shadow-lg p-8 flex flex-col items-center border border-black">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80"
              alt="Product"
              className="w-24 h-24 rounded-full mb-4 border-4 border-black"
            />
            <h4 className="text-2xl font-bold mb-2">SecureX Antivirus Pro</h4>
            <p className="text-base mb-4 text-center">
              <strong>Latest:</strong> The ultimate protection for your devices. Real-time virus scanning, ransomware shield, and privacy guard—all in a simple, fast package.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-5 h-5" />
              <span>SecureX News Desk</span>
            </div>
          </div>
        </section>

        {/* Product Card Section */}
        <section>
          <div className="max-w-md w-full bg-white text-black rounded-lg shadow-lg p-8 flex flex-col items-center border border-black">
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

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span className="text-lg font-semibold">SecureX</span>
            </div>
            <p className="text-white">
              Protecting India's Digital Future
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;
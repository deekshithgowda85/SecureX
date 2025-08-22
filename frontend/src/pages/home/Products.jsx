import { useState } from 'react'
import React from 'react'
import Navbar from '../../components/Navbar'
import { 
  Shield, 
  Smartphone, 
  Globe, 
  Users, 
  Eye, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Brain, 
  Network,
  Search,
  Mail,
  MessageCircle,
  CreditCard,
  Home,
  GraduationCap,
  Briefcase,
  Heart,
  ChevronRight,
  Star
} from 'lucide-react';
const Products = () => {
  const [activeCategory, setActiveCategory] = useState('protection');

  const featureCategories = {
    protection: {
      title: 'Threat Protection',
      icon: Shield,
      color: 'blue',
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
      color: 'green',
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
      color: 'purple',
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

  const demographicFeatures = [
    {
      icon: GraduationCap,
      title: 'Students',
      description: 'Job scam detection, social media safety, campus network protection',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      icon: Briefcase,
      title: 'Professionals', 
      description: 'Email security, investment fraud protection, LinkedIn safety',
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      icon: Home,
      title: 'Homemakers',
      description: 'Shopping safety, WhatsApp protection, family finance monitoring',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      icon: Globe,
      title: 'Rural Users',
      description: 'Government scheme validation, digital payment safety, local language support',
      color: 'bg-green-100 text-green-700'
    },
    {
      icon: Heart,
      title: 'Senior Citizens',
      description: 'Health scam protection, simplified interface, family connection features',
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  const stats = [
    { number: '12.9M+', label: 'Protected Users' },
    { number: '45K+', label: 'Daily Threats Blocked' },
    { number: '99.7%', label: 'Detection Accuracy' },
    { number: '24/7', label: 'Real-time Protection' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      purple: 'bg-purple-500 text-white'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Advanced Cybersecurity Made Simple
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Protect yourself and your family from phishing, fraud, and cyber threats with our AI-powered security suite designed specifically for Indian users.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Security Features
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers multiple layers of protection tailored to Indian cyber threats
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-1 flex space-x-1">
              {Object.entries(featureCategories).map(([key, category]) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                      activeCategory === key
                        ? `${getColorClasses(category.color)}`
                        : 'text-gray-500 hover:text-gray-700'
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
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getColorClasses(featureCategories[activeCategory].color)}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 mb-3">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-sm">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-medium text-green-600">{feature.highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demographic-Specific Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Tailored Protection for Every Indian
            </h3>
            <p className="text-lg text-gray-600">
              Specialized security features designed for different demographics and their unique vulnerabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demographicFeatures.slice(0, 3).map((demo, index) => {
              const IconComponent = demo.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${demo.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{demo.title}</h4>
                  <p className="text-gray-600 mb-4">{demo.description}</p>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
            {demographicFeatures.slice(3, 5).map((demo, index) => {
              const IconComponent = demo.icon;
              return (
                <div key={index + 3} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${demo.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{demo.title}</h4>
                  <p className="text-gray-600 mb-4">{demo.description}</p>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Secure Your Digital Life?
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of Indians who trust SecureX for comprehensive cyber protection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              See Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span className="text-lg font-semibold">SecureX</span>
            </div>
            <p className="text-gray-400">
              Protecting India's Digital Future
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;
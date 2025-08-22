import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Brain, 
  BookOpen, 
  AlertTriangle, 
  Phone, 
  Globe, 
  Award, 
  ChevronRight, 
  Menu, 
  X, 
  Play, 
  CheckCircle,
  MessageCircle,
  Mail,
  CreditCard,
  Smartphone,
  Wifi,
  Eye,
  Lock,
  Users,
  Target,
  Zap,
  TrendingUp,
  Search,
  FileText,
  HelpCircle,
  Star,
  Timer,
  BarChart3
} from 'lucide-react';

const CyberSafeLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeThreat, setActiveThreat] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThreat((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const threatTypes = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Phishing Attacks",
      description: "Learn to identify fake emails, SMS, and websites designed to steal your information",
      examples: ["Fake bank emails", "OTP scams", "Prize/lottery frauds"],
      riskLevel: "High",
      color: "from-red-600 to-red-800"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call & SMS Frauds",
      description: "Recognize vishing calls, fake customer support, and malicious text messages",
      examples: ["KYC update calls", "Tech support scams", "Fake delivery SMS"],
      riskLevel: "Critical",
      color: "from-orange-600 to-orange-800"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Payment Frauds",
      description: "Protect yourself from UPI scams, fake QR codes, and payment reversals",
      examples: ["Wrong payment tricks", "Fake merchant QRs", "Refund scams"],
      riskLevel: "High",
      color: "from-purple-600 to-purple-800"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Social Media Threats",
      description: "Stay safe from fake profiles, romance scams, and information theft",
      examples: ["Fake job offers", "Romance frauds", "Data harvesting"],
      riskLevel: "Medium",
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Network Attacks",
      description: "Understand WiFi threats, man-in-the-middle attacks, and secure browsing",
      examples: ["Fake WiFi hotspots", "HTTP websites", "Unsecured networks"],
      riskLevel: "Medium",
      color: "from-green-600 to-green-800"
    }
  ];

  const aiTutorFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Personalized Learning",
      description: "AI adapts to your knowledge level and learning pace"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Real-time Guidance",
      description: "Get instant explanations for complex security concepts"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Monitor your cybersecurity knowledge improvement"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Skill Certification",
      description: "Earn certificates as you master security practices"
    }
  ];

  const interactiveModules = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Threat Recognition Lab",
      description: "Practice identifying real phishing emails and scam messages",
      duration: "15-20 min",
      difficulty: "Beginner",
      participants: "2.3M+"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Safe Digital Banking",
      description: "Learn secure online banking and UPI transaction practices",
      duration: "10-15 min", 
      difficulty: "Intermediate",
      participants: "1.8M+"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Password Security Master",
      description: "Create and manage strong passwords and 2FA setup",
      duration: "12-18 min",
      difficulty: "Beginner",
      participants: "3.1M+"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Social Engineering Defense",
      description: "Recognize and counter manipulation tactics used by fraudsters",
      duration: "20-25 min",
      difficulty: "Advanced",
      participants: "985K+"
    }
  ];

  const quizSample = {
    question: "You receive an SMS: 'Your bank account will be blocked in 2 hours. Click here to update KYC: bit.ly/kyc-update123'. What should you do?",
    options: [
      "Click the link immediately to avoid account blocking",
      "Forward the message to friends for their opinion", 
      "Delete the message - banks don't send such urgent SMS with short links",
      "Call the number that sent the SMS to verify"
    ],
    correct: 2,
    explanation: "Banks never send urgent SMS with shortened links asking for KYC updates. This is a classic phishing attempt."
  };

  const stats = [
    { number: "5.2M+", label: "Students Trained", icon: <Users className="w-5 h-5" /> },
    { number: "98.7%", label: "Threat Recognition Rate", icon: <Shield className="w-5 h-5" /> },
    { number: "450+", label: "Interactive Modules", icon: <BookOpen className="w-5 h-5" /> },
    { number: "24x7", label: "AI Tutor Available", icon: <Brain className="w-5 h-5" /> }
  ];

  const getRiskColor = (level) => {
    switch(level) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-white" />
              <span className="text-xl font-bold text-white">CyberLearn India</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#threats" className="text-white/80 hover:text-white transition-colors">Learn Threats</a>
              <a href="#ai-tutor" className="text-white/80 hover:text-white transition-colors">AI Tutor</a>
              <a href="#practice" className="text-white/80 hover:text-white transition-colors">Practice</a>
              <a href="#guidance" className="text-white/80 hover:text-white transition-colors">Guidance</a>
              <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Start Learning
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-4">
              <a href="#threats" className="block text-white/80 hover:text-white">Learn Threats</a>
              <a href="#ai-tutor" className="block text-white/80 hover:text-white">AI Tutor</a>
              <a href="#practice" className="block text-white/80 hover:text-white">Practice</a>
              <a href="#guidance" className="block text-white/80 hover:text-white">Guidance</a>
              <button className="w-full bg-white text-black px-6 py-2 rounded-full font-medium">
                Start Learning
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black/50 to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-300 mb-4">
                  <Brain className="w-5 h-5" />
                  <span className="text-sm font-medium">AI-Powered Cybersecurity Education</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Master
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {" "}Cyber Threats
                  </span>
                  <br />
                  with AI Guidance
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Learn to identify, understand, and defend against cyber threats through interactive modules, AI tutoring, and real-world practice scenarios.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center group">
                  Start Learning Journey
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Try AI Tutor
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <div className="text-white/60">{stat.icon}</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-6 h-6 text-white" />
                    <span className="text-white font-medium">Quick Threat Assessment</span>
                  </div>
                  
                  <div className="bg-black/30 rounded-xl p-4">
                    <p className="text-white font-medium mb-4">{quizSample.question}</p>
                    <div className="space-y-2">
                      {quizSample.options.map((option, index) => (
                        <button 
                          key={index}
                          onClick={() => setActiveQuiz(index)}
                          className={`w-full text-left p-3 rounded-lg transition-all text-sm ${
                            activeQuiz === index 
                              ? index === quizSample.correct 
                                ? 'bg-green-500/20 border border-green-500 text-green-300'
                                : 'bg-red-500/20 border border-red-500 text-red-300'
                              : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                        </button>
                      ))}
                    </div>
                    
                    {activeQuiz !== null && (
                      <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500 rounded-lg">
                        <p className="text-blue-300 text-sm">{quizSample.explanation}</p>
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-gradient-to-r from-gray-800 to-black text-white py-3 rounded-xl font-medium hover:from-gray-700 hover:to-gray-900 transition-all">
                    Take Full Assessment
                  </button>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-60 h-60 bg-gradient-to-r from-gray-600/20 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Types Section */}
      <section id="threats" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Know Your Digital Enemies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding different types of cyber threats is the first step to protecting yourself. Learn about the most common attacks targeting Indians.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {threatTypes.map((threat, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-3xl transition-all duration-500 cursor-pointer group ${
                  activeThreat === index 
                    ? `bg-gradient-to-br ${threat.color} text-white transform scale-105` 
                    : 'bg-gray-50 text-black hover:bg-gray-100'
                }`}
                onClick={() => setActiveThreat(index)}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={activeThreat === index ? 'text-white' : 'text-black'}>
                      {threat.icon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      activeThreat === index 
                        ? 'bg-white/20 text-white border-white/30' 
                        : getRiskColor(threat.riskLevel)
                    }`}>
                      {threat.riskLevel} Risk
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{threat.title}</h3>
                  <p className={`mb-6 ${activeThreat === index ? 'text-white/90' : 'text-gray-600'}`}>
                    {threat.description}
                  </p>
                </div>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">Common Examples:</h4>
                  {threat.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        activeThreat === index ? 'bg-white/60' : 'bg-gray-400'
                      }`}></div>
                      <span className={activeThreat === index ? 'text-white/80' : 'text-gray-600'}>
                        {example}
                      </span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3 rounded-xl font-medium transition-all ${
                  activeThreat === index 
                    ? 'bg-white/20 text-white hover:bg-white/30' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}>
                  Learn Defense Strategies
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tutor Section */}
      <section id="ai-tutor" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-8 h-8 text-white" />
                  <span className="text-sm font-medium text-gray-300">AI-Powered Education</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Your Personal Cyber Security Tutor
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Get personalized guidance from our AI tutor that adapts to your learning style, answers your questions in real-time, and helps you master cybersecurity concepts at your own pace.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {aiTutorFeatures.map((feature, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        {feature.icon}
                      </div>
                      <h3 className="font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                Chat with AI Tutor
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold">CyberAI Tutor</div>
                      <div className="text-green-400 text-sm">● Online</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-sm text-gray-300 mb-2">You asked:</div>
                      <div className="text-white">"How can I identify a phishing email?"</div>
                    </div>
                    
                    <div className="bg-blue-500/20 rounded-lg p-4">
                      <div className="text-sm text-blue-300 mb-2">AI Tutor explains:</div>
                      <div className="text-white text-sm">
                        Great question! Here are the key signs of phishing emails:
                        <br />• Urgent language ("Act now!")
                        <br />• Suspicious sender addresses
                        <br />• Generic greetings
                        <br />• Unexpected attachments
                        <br />
                        <br />Would you like me to show you some real examples?
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg text-sm hover:bg-white/20 transition-colors">
                      Show Examples
                    </button>
                    <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                      Take Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Practice Modules */}
      <section id="practice" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Practice Makes Perfect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master cybersecurity through hands-on interactive modules designed to simulate real-world scenarios you might encounter online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {interactiveModules.map((module, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 bg-black rounded-lg text-white">
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-2">{module.title}</h3>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Timer className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{module.difficulty}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{module.participants}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-4">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">4.8 (2.1k reviews)</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
                  Start Module
                  <Play className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidance & Resources Section */}
      <section id="guidance" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Complete Security Guidance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive guides, emergency resources, and expert recommendations to stay protected in every digital situation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Emergency Response Guide</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Been Scammed?</div>
                        <div className="text-sm text-gray-300">Call 1930 immediately and follow our step-by-step recovery guide</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Suspicious Activity?</div>
                        <div className="text-sm text-gray-300">Block transactions, change passwords, and report to cybercrime portal</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Lock className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Account Compromised?</div>
                        <div className="text-sm text-gray-300">Secure your accounts using our automated recovery assistant</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Search className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Need Help?</div>
                        <div className="text-sm text-gray-300">Chat with our AI assistant for personalized guidance</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
                  <h4 className="text-lg font-bold text-black mb-2">Security Guides</h4>
                  <p className="text-gray-600 text-sm mb-4">Step-by-step guides for banking, shopping, social media, and more</p>
                  <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                    Browse Guides <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <Globe className="w-8 h-8 text-green-600 mb-4" />
                  <h4 className="text-lg font-bold text-black mb-2">Regional Support</h4>
                  <p className="text-gray-600 text-sm mb-4">Available in Hindi, Tamil, Telugu, Bengali, and 6 other Indian languages</p>
                  <button className="text-green-600 font-medium hover:text-green-700 flex items-center">
                    Choose Language <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900 text-white p-6 rounded-xl">
                <h4 className="text-lg font-bold mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Cybercrime
                  </button>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Helpline
                  </button>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Live Chat Support
                  </button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-black mb-4">Latest Threat Alerts</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-sm">
                      <div className="font-medium text-black">New UPI Fraud Pattern</div>
                      <div className="text-gray-600">Fake refund calls targeting online shoppers</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-sm">
                      <div className="font-medium text-black">WhatsApp Job Scams</div>
                      <div className="text-gray-600">Work-from-home offers with upfront payments</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-sm">
                      <div className="font-medium text-black">Fake Banking Apps</div>
                      <div className="text-gray-600">Malicious apps mimicking popular banks</div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 text-yellow-700 hover:text-yellow-800 font-medium text-sm flex items-center">
                  View All Alerts <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Progress Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Track Your Security Mastery
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Monitor your progress as you learn, practice, and master different aspects of cybersecurity through our comprehensive tracking system.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Phishing Detection</h3>
                    <p className="text-gray-400 text-sm">Email and SMS threat recognition</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">87%</div>
                    <div className="text-gray-400 text-xs">Expert Level</div>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Payment Security</h3>
                    <p className="text-gray-400 text-sm">UPI, banking, and transaction safety</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">72%</div>
                    <div className="text-gray-400 text-xs">Advanced</div>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{width: '72%'}}></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Social Engineering</h3>
                    <p className="text-gray-400 text-sm">Manipulation and fraud tactics</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">45%</div>
                    <div className="text-gray-400 text-xs">Intermediate</div>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <div>
                    <h4 className="font-bold">Next Achievement</h4>
                    <p className="text-gray-400 text-sm">Complete 3 more modules to earn "Cyber Guardian" badge</p>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
                <div className="text-xs text-gray-400">7 of 10 modules completed</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-6">Your Learning Stats</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">23</div>
                  <div className="text-gray-400 text-sm">Modules Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">94%</div>
                  <div className="text-gray-400 text-sm">Quiz Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">12h</div>
                  <div className="text-gray-400 text-sm">Learning Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">7</div>
                  <div className="text-gray-400 text-sm">Certificates</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold">Recent Achievements</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium">Phishing Expert</div>
                      <div className="text-gray-400">Completed advanced email security course</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <Award className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div className="text-sm">
                      <div className="font-medium">UPI Security Master</div>
                      <div className="text-gray-400">Perfect score in payment fraud quiz</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Start Your Cybersecurity Journey Today
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join millions of Indians learning to protect themselves online. Get personalized AI guidance, practice with real scenarios, and master digital security.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-black text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center">
              Start Learning Free
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-black text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition-colors flex items-center justify-center">
              <Brain className="w-5 h-5 mr-2" />
              Meet AI Tutor
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-black mb-1">100% Free</h4>
                <p className="text-gray-600 text-sm">Complete access to all learning modules and AI tutor</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-black mb-1">Self-Paced</h4>
                <p className="text-gray-600 text-sm">Learn at your own speed with personalized recommendations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-black mb-1">Certified</h4>
                <p className="text-gray-600 text-sm">Earn recognized certificates as you complete modules</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8" />
                <span className="text-xl font-bold">CyberLearn India</span>
              </div>
              <p className="text-gray-400">
                Empowering Indians with practical cybersecurity knowledge through AI-powered education and interactive learning.
              </p>
              <div className="flex space-x-4">
                <div className="text-2xl font-bold">5.2M+</div>
                <div className="text-gray-400">
                  <div className="text-sm">Learners</div>
                  <div className="text-xs">Protected Daily</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Learn</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Threat Recognition</a>
                <a href="#" className="block hover:text-white transition-colors">AI Tutor Sessions</a>
                <a href="#" className="block hover:text-white transition-colors">Interactive Quizzes</a>
                <a href="#" className="block hover:text-white transition-colors">Security Guides</a>
                <a href="#" className="block hover:text-white transition-colors">Practice Modules</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Emergency Help (1930)</a>
                <a href="#" className="block hover:text-white transition-colors">Report Cybercrime</a>
                <a href="#" className="block hover:text-white transition-colors">Live Chat Support</a>
                <a href="#" className="block hover:text-white transition-colors">Community Forum</a>
                <a href="#" className="block hover:text-white transition-colors">Contact Experts</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Available In</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>English</div>
                  <div>हिंदी</div>
                  <div>বাংলা</div>
                  <div>தமிழ்</div>
                  <div>తెలుగు</div>
                  <div>ಕನ್ನಡ</div>
                  <div>ગુજરાતી</div>
                  <div>मराठी</div>
                  <div>ଓଡ଼ିଆ</div>
                  <div>پنجابی</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; 2025 CyberLearn India. Empowering digital safety education.
              </div>
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CyberSafeLanding;
import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Sun, Moon, AlertTriangle, Clock, ExternalLink, TrendingUp, Bug, Lock, Zap, RefreshCw, Loader } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const CyberSecurityNewsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Clerk handles sign-in state
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const trendingTopics = [
    "Zero-day exploits",
    "AI Security",
    "Ransomware",
    "Cloud vulnerabilities",
    "IoT threats"
  ];

  // Function to fetch cybersecurity news
  const fetchCyberSecurityNews = async () => {
    setIsLoading(true);
    try {
      // In a real application, you would make API calls to news aggregators like:
      // - NewsAPI with cybersecurity keywords
      // - RSS feeds from security blogs (Krebs on Security, Threatpost, etc.)
      // - Security vendor feeds (Symantec, McAfee, etc.)
      // - Government sources (CISA, NIST)
      
      const sources = [
        'Cybersecurity & Infrastructure Security Agency (CISA)',
        'Krebs on Security',
        'Dark Reading',
        'SC Media',
        'Threatpost',
        'SecurityWeek',
        'The Hacker News',
        'Bleeping Computer'
      ];

      const generateTimestamp = () => {
        const timeOptions = ['2 hours ago', '4 hours ago', '6 hours ago', '8 hours ago', '12 hours ago', '1 day ago', '2 days ago'];
        return timeOptions[Math.floor(Math.random() * timeOptions.length)];
      };

      const renderIcon = (iconType) => {
        switch(iconType) {
          case 'alert':
            return React.createElement(AlertTriangle, { className: "w-5 h-5" });
          case 'bug':
            return React.createElement(Bug, { className: "w-5 h-5" });
          case 'lock':
            return React.createElement(Lock, { className: "w-5 h-5" });
          case 'zap':
            return React.createElement(Zap, { className: "w-5 h-5" });
          case 'shield':
            return React.createElement(Shield, { className: "w-5 h-5" });
          default:
            return React.createElement(AlertTriangle, { className: "w-5 h-5" });
        }
      };

      // Generate dynamic news based on current cybersecurity trends
      const newsTopics = [
        {
          title: "Critical Vulnerability Found in Widely-Used Network Equipment",
          summary: "Security researchers discovered a remote code execution flaw affecting enterprise networking hardware from a major vendor.",
          category: "Critical Alert",
          severity: "high",
          iconType: "alert"
        },
        {
          title: "Sophisticated Phishing Campaign Targets Financial Institutions",
          summary: "Cybercriminals using AI-generated content and deepfake technology to bypass traditional email security measures.",
          category: "Data Breach",
          severity: "high",
          iconType: "bug"
        },
        {
          title: "New Ransomware-as-a-Service Platform Emerges on Dark Web",
          summary: "Security analysts identify a new ransomware operation offering advanced encryption and evasion capabilities to affiliates.",
          category: "Malware",
          severity: "high",
          iconType: "alert"
        },
        {
          title: "Zero Trust Architecture Adoption Reaches 65% Among Enterprises",
          summary: "Latest industry survey shows significant growth in zero trust implementation driven by remote work security concerns.",
          category: "Technology",
          severity: "medium",
          iconType: "shield"
        },
        {
          title: "Supply Chain Attack Compromises Popular Software Development Tools",
          summary: "Malicious actors infiltrated developer repositories affecting thousands of downstream applications and services.",
          category: "Critical Alert",
          severity: "high",
          iconType: "alert"
        },
        {
          title: "Quantum Computing Threat Timeline Accelerates According to New Research",
          summary: "Scientists project quantum computers capable of breaking current encryption standards could arrive sooner than expected.",
          category: "Standards",
          severity: "medium",
          iconType: "lock"
        }
      ];

      const generateDynamicNews = () => {
        return newsTopics.map((topic, index) => ({
          id: index + 1,
          title: topic.title,
          summary: topic.summary,
          category: topic.category,
          severity: topic.severity,
          timestamp: generateTimestamp(),
          readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
          source: sources[Math.floor(Math.random() * sources.length)],
          icon: renderIcon(topic.iconType),
          url: `#news-${index + 1}`
        }));
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const fetchedNews = generateDynamicNews();
      setNewsData(fetchedNews);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching news:', error);
      setNewsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch news on component mount
  useEffect(() => {
    fetchCyberSecurityNews();
    
    // Set up auto-refresh every 30 minutes
    const refreshInterval = setInterval(() => {
      fetchCyberSecurityNews();
    }, 1800000);

    return () => clearInterval(refreshInterval);
  }, []);

  const handleRefresh = () => {
    fetchCyberSecurityNews();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Clerk handles sign-in/sign-up/sign-out

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return isDarkMode ? 'text-red-400 bg-red-900/20' : 'text-red-600 bg-red-100';
      case 'medium':
        return isDarkMode ? 'text-yellow-400 bg-yellow-900/20' : 'text-yellow-600 bg-yellow-100';
      case 'low':
        return isDarkMode ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-100';
      default:
        return isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-gray-100';
    }
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900';

  const cardClasses = isDarkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 border-b backdrop-blur-sm ${
        isDarkMode 
          ? 'bg-gray-900/95 border-gray-700' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                SecureX
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="/home" className={`hover:text-blue-500 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Home
              </a>
              <a href="#" className={`hover:text-blue-500 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                News
              </a>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Clerk Auth Buttons */}
              <div className="flex items-center space-x-3">
                <SignedOut>
                  <SignInButton mode="modal" afterSignInUrl="/home" afterSignUpUrl="/home" />
                  <SignUpButton mode="modal" afterSignUpUrl="/home" afterSignInUrl="/home" />
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t ${
            isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
          }`}>
            <div className="px-4 py-3 space-y-3">
              <a href="/home" className="block py-2">Home</a>
              <a href="#" className="block py-2">News</a>
              
              <div className="flex items-center justify-between py-2">
                <span>Dark Mode</span>
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {/* Clerk Auth Buttons for Mobile */}
              <div className="space-y-2 pt-2">
                <SignedOut>
                  <SignInButton mode="modal" afterSignInUrl="/home" afterSignUpUrl="/home" />
                  <SignUpButton mode="modal" afterSignUpUrl="/home" afterSignInUrl="/home" />
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/home" />
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-red-900/20' 
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-red-50'
        }`} />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
              Cybersecurity Intelligence
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Stay ahead of emerging threats with real-time cybersecurity news, analysis, and expert insights
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {trendingTopics.map((topic, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-300' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Threats & News</h2>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <div className={`px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-green-900/20 text-green-400' 
                : 'bg-green-100 text-green-700'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Updates</span>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 animate-spin text-blue-500 mb-4" />
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Fetching latest cybersecurity news...
            </p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Aggregating from trusted security sources
            </p>
          </div>
        ) : newsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Unable to fetch news at the moment
            </p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsData.map((news) => (
              <article
                key={news.id}
                className={`rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${cardClasses}`}
                onClick={() => window.open(news.url, '_blank')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${getSeverityColor(news.severity)}`}>
                    {news.icon}
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium px-2 py-1 rounded mb-1 ${getSeverityColor(news.severity)}`}>
                      {news.category}
                    </div>
                    {news.source && (
                      <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {news.source}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                  {news.title}
                </h3>

                <p className={`text-sm mb-4 line-clamp-3 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {news.summary}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className={`flex items-center space-x-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{news.timestamp}</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span>{news.readTime}</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && newsData.length > 0 && (
          <div className="text-center mt-12">
            <button 
              onClick={handleRefresh}
              className={`px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              Load More News
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t mt-16 ${
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-blue-500" />
              <span className="font-semibold">CyberWatch</span>
            </div>
            <div className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2025 CyberWatch. Stay secure, stay informed.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CyberSecurityNewsPage;
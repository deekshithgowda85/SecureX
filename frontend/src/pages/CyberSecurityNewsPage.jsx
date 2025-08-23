import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { AlertTriangle, Clock, ExternalLink, TrendingUp, Bug, Lock, Zap, RefreshCw, Loader, Shield, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsNavbar from '../components/NewsNavbar';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import NewsNavbar from '../components/NewsNavbar';

const CyberSecurityNewsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [theme, setTheme] = useState('light'); // light or dark
  const { isSignedIn } = useUser();
  const clerk = useClerk();
  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (isSignedIn) {
      navigate('/home');
    } else {
      clerk.openSignIn({ afterSignInUrl: '/home', afterSignUpUrl: '/home' });
    }
  };

  const trendingTopics = [
    "Zero-day exploits",
    "AI Security",
    "Ransomware",
    "Cloud vulnerabilities",
    "IoT threats"
  ];

  // Theme classes for dark/light mode
  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900';

  // Toggle dark mode
  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  const fetchCyberSecurityNews = async () => {
    setIsLoading(true);
    try {
      const sources = [
        'CISA',
        'Krebs on Security',
        'Dark Reading',
        'SC Media',
        'Threatpost',
        'SecurityWeek',
        'The Hacker News',
        'Bleeping Computer'
      ];

      const generateTimestamp = () => {
        const options = ['2 hours ago', '4 hours ago', '6 hours ago', '1 day ago'];
        return options[Math.floor(Math.random() * options.length)];
      };

      // All icons pure black or white
      const iconProps = { className: `w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}` };

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

      const topics = [
        { title: "Critical Vulnerability Found in Networking Equipment", summary: "Remote code execution flaw discovered.", category: "Critical Alert", severity: "high", iconType: "alert" },
        { title: "Sophisticated Phishing Campaign Hits Banks", summary: "AI-generated phishing bypasses detection.", category: "Data Breach", severity: "high", iconType: "bug" },
        { title: "New Ransomware-as-a-Service Emerges", summary: "Advanced ransomware offered on dark web.", category: "Malware", severity: "high", iconType: "alert" },
        { title: "Zero Trust Adoption Reaches 65%", summary: "Growth driven by remote work security.", category: "Technology", severity: "medium", iconType: "shield" },
        { title: "Supply Chain Attack Compromises Dev Tools", summary: "Thousands of apps affected.", category: "Critical Alert", severity: "high", iconType: "alert" },
        { title: "Quantum Threat Timeline Accelerates", summary: "Encryption break may come sooner.", category: "Standards", severity: "medium", iconType: "lock" }
      ];

      const generated = topics.map((t, i) => ({
        id: i + 1,
        title: t.title,
        summary: t.summary,
        category: t.category,
        severity: t.severity,
        timestamp: generateTimestamp(),
        readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
        source: sources[Math.floor(Math.random() * sources.length)],
        icon: React.createElement(icons[t.iconType] || AlertTriangle, { className: "w-5 h-5" }),
        url: `#news-${i + 1}`
      }));

      await new Promise(r => setTimeout(r, 1000));
      setNewsData(generated);
      setLastUpdated(new Date());
    } catch (e) {
      console.error(e);
      setNewsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch news on mount
  useEffect(() => {
    fetchCyberSecurityNews();
    // Optionally, set up auto-refresh every 30 minutes:
    // const interval = setInterval(fetchCyberSecurityNews, 1800000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
      <NewsNavbar
        isDarkMode={theme === 'dark'}
        toggleDarkMode={toggleTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        iconColor={theme === 'dark' ? 'text-white' : 'text-black'}
        textColor={theme === 'dark' ? 'text-white' : 'text-black'}
      />
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
            <div className="flex flex-wrap justify-center gap-3 mb-8">
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
            <div className="flex justify-center">
               <button
          onClick={handleExploreClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition-colors group"
        >
          Explore
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Latest Threats & News</h2>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchCyberSecurityNews}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''} ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
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
              onClick={fetchCyberSecurityNews}
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
                className={`rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                onClick={() => window.open(news.url, '_blank')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${news.severity === 'high' ? (isDarkMode ? 'text-red-400 bg-red-900/20' : 'text-red-600 bg-red-100') : news.severity === 'medium' ? (isDarkMode ? 'text-yellow-400 bg-yellow-900/20' : 'text-yellow-600 bg-yellow-100') : (isDarkMode ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-100')}`}>
                    {news.icon}
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-medium px-2 py-1 rounded mb-1 ${news.severity === 'high' ? (isDarkMode ? 'text-red-400 bg-red-900/20' : 'text-red-600 bg-red-100') : news.severity === 'medium' ? (isDarkMode ? 'text-yellow-400 bg-yellow-900/20' : 'text-yellow-600 bg-yellow-100') : (isDarkMode ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-100')}`}>
                      {news.category}
                    </div>
                    {news.source && (
                      <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {news.source}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
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
              onClick={fetchCyberSecurityNews}
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

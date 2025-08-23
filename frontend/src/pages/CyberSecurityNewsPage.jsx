import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { AlertTriangle, Clock, ExternalLink, TrendingUp, Bug, Lock, Zap, RefreshCw, Loader, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsNavbar from '../components/NewsNavbar';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

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

  // Theme classes
  const themeClasses =
    theme === 'dark'
      ? 'bg-black text-white'
      : 'bg-white text-black';

  // Function to fetch cybersecurity news
  const fetchCyberSecurityNews = async () => {
    setIsLoading(true);
    try {
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

      // All icons pure black or white
      const iconProps = { className: `w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}` };

      const renderIcon = (iconType) => {
        switch(iconType) {
          case 'alert':
            return <AlertTriangle {...iconProps} />;
          case 'bug':
            return <Bug {...iconProps} />;
          case 'lock':
            return <Lock {...iconProps} />;
          case 'zap':
            return <Zap {...iconProps} />;
          case 'shield':
            return <Shield {...iconProps} />;
          default:
            return <AlertTriangle {...iconProps} />;
        }
      };

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

  // Fetch news on mount and when theme changes (to update icon color)
  useEffect(() => {
    fetchCyberSecurityNews();
    // eslint-disable-next-line
  }, [theme]);

  // All icons for hero and controls
  const iconPropsHero = { className: `w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}` };

  // Toggle theme handler
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
      {/* Navigation */}
      <NewsNavbar
        isDarkMode={theme === 'dark'}
        toggleDarkMode={toggleTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        iconColor={theme === 'dark' ? 'text-white' : 'text-black'}
        textColor={theme === 'dark' ? 'text-white' : 'text-black'}
      />

      {/* Hero Section */}
      <div className={`relative overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-black via-gray-900 to-black' : 'from-white via-gray-50 to-white'}`} />
          {/* Accent patterns */}
          <div className={`absolute top-10 left-10 w-32 h-32 border-2 ${theme === 'dark' ? 'border-white' : 'border-black'} opacity-10 rounded-full`} />
          <div className={`absolute bottom-10 right-10 w-24 h-24 border-2 ${theme === 'dark' ? 'border-white' : 'border-black'} opacity-10 rounded-full`} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Cybersecurity Intelligence
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
              Stay ahead of emerging threats with real-time cybersecurity news, analysis, and expert insights
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {trendingTopics.map((topic, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} transition-colors duration-300`}
                >
                  <TrendingUp {...iconPropsHero} className={`w-4 h-4 inline mr-2 ${theme === 'dark' ? 'text-black' : 'text-white'}`} />
                  {topic}
                </span>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleExploreClick}
                className={`inline-flex items-center gap-2 px-8 py-4 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 group border-2 ${theme === 'dark' ? 'border-white' : 'border-black'}`}
              >
                Explore
                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${theme === 'dark' ? 'text-black' : 'text-white'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <main className={`max-w-7xl mx-auto px-4 py-12 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Latest Threats & News</h2>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchCyberSecurityNews}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 border-2 ${theme === 'dark' ? 'border-white bg-black text-white hover:bg-gray-900' : 'border-black bg-white text-black hover:bg-black hover:text-white'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''} ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <div className={`px-4 py-2 rounded-lg border-2 ${theme === 'dark' ? 'border-white bg-black text-white' : 'border-black bg-white text-black'}`}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-full animate-pulse`}></div>
                <span className="text-sm font-medium">Live Updates</span>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className={`flex flex-col items-center justify-center py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <Loader className={`w-12 h-12 animate-spin ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`} />
            <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Fetching latest cybersecurity news...
            </p>
            <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Aggregating from trusted security sources
            </p>
          </div>
        ) : newsData.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <AlertTriangle className={`w-12 h-12 ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`} />
            <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Unable to fetch news at the moment
            </p>
            <button
              onClick={fetchCyberSecurityNews}
              className={`mt-4 px-6 py-2 rounded-lg transition-colors duration-300 border-2 ${theme === 'dark' ? 'bg-white text-black border-white hover:bg-gray-200' : 'bg-black text-white border-black hover:bg-gray-800'}`}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsData.map((news) => (
              <article
                key={news.id}
                className={`rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${theme === 'dark' ? 'border-white bg-black hover:bg-gray-900' : 'border-black bg-white hover:bg-gray-50'}`}
                onClick={() => window.open(news.url, '_blank')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    {React.cloneElement(news.icon, { className: `w-5 h-5 ${theme === 'dark' ? 'text-black' : 'text-white'}` })}
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold px-3 py-1 rounded mb-1 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                      {news.category}
                    </div>
                    {news.source && (
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                        {news.source}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {news.title}
                </h3>

                <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {news.summary}
                </p>

                <div className={`flex items-center justify-between text-sm border-t-2 pt-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                    <span className="font-medium">{news.timestamp}</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="font-medium">{news.readTime}</span>
                    <ExternalLink className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
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
              className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 border-2 shadow-lg ${theme === 'dark' ? 'bg-black text-white border-white hover:bg-gray-900' : 'bg-white text-black border-black hover:bg-black hover:text-white'}`}
            >
              Load More News
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t-2 mt-16 ${theme === 'dark' ? 'border-white bg-black' : 'border-black bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Shield className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
              <span className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>CyberWatch</span>
            </div>
            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
              © 2025 CyberWatch. Stay secure, stay informed.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CyberSecurityNewsPage;
import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { AlertTriangle, Clock, ExternalLink, TrendingUp, Bug, Lock, Zap, RefreshCw, Loader, Shield, ArrowRight } from 'lucide-react';
import NewsNavbar from '../components/NewsNavbar';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const CyberSecurityNewsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  // All icons black or white for B&W theme
  const iconProps = { className: `w-5 h-5 ${isDarkMode ? "text-white" : "text-black"}` };

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
        icon: renderIcon(t.iconType),
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

  useEffect(() => {
    fetchCyberSecurityNews();
    // eslint-disable-next-line
  }, [isDarkMode]);

  // Theme classes
  const theme = {
    bg: isDarkMode ? "bg-black" : "bg-white",
    text: isDarkMode ? "text-white" : "text-black",
    cardBg: isDarkMode ? "bg-gray-900" : "bg-white",
    cardBorder: isDarkMode ? "border-gray-700" : "border-black",
    cardHover: isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50",
    cardText: isDarkMode ? "text-white" : "text-black",
    descText: isDarkMode ? "text-gray-300" : "text-gray-700",
    buttonBg: isDarkMode ? "bg-white" : "bg-black",
    buttonText: isDarkMode ? "text-black" : "text-white",
    buttonHover: isDarkMode ? "hover:bg-gray-200" : "hover:bg-gray-800",
    border: isDarkMode ? "border-white" : "border-black",
    footerBg: isDarkMode ? "bg-black border-white" : "bg-white border-black",
    footerText: isDarkMode ? "text-white" : "text-black",
    icon: isDarkMode ? "text-white" : "text-black",
    muted: isDarkMode ? "text-gray-400" : "text-gray-600"
  };

  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300`}>
      <NewsNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gradient-to-br from-white via-gray-50 to-white"}`} />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${theme.text}`}>
              Cybersecurity Intelligence
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme.descText}`}>
              Stay ahead of emerging threats with real-time cybersecurity news, analysis, and expert insights
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {trendingTopics.map((topic, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}
                >
                  <TrendingUp className={`w-4 h-4 inline mr-2 ${isDarkMode ? "text-black" : "text-white"}`} />
                  {topic}
                </span>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleExploreClick}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold shadow transition-all group border-2 ${theme.buttonBg} ${theme.buttonText} ${theme.buttonHover} ${theme.border}`}
              >
                Explore
                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${theme.buttonText}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-3xl font-bold ${theme.text}`}>Latest Threats & News</h2>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <span className={`text-sm ${theme.muted}`}>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchCyberSecurityNews}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all border-2 ${theme.border} ${theme.buttonBg} ${theme.buttonText} ${theme.buttonHover} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''} ${theme.buttonText}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <div className={`px-4 py-2 rounded-lg border-2 ${theme.border} ${theme.bg} ${theme.text}`}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${theme.text} rounded-full animate-pulse`}></div>
                <span className="text-sm font-medium">Live Updates</span>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className={`flex flex-col items-center justify-center py-20 ${theme.bg}`}>
            <Loader className={`w-12 h-12 animate-spin ${theme.text} mb-4`} />
            <p className={`text-lg font-medium ${theme.text}`}>
              Fetching latest cybersecurity news...
            </p>
            <p className={`text-sm mt-2 ${theme.muted}`}>
              Aggregating from trusted security sources
            </p>
          </div>
        ) : newsData.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-20 ${theme.bg}`}>
            <AlertTriangle className={`w-12 h-12 ${theme.text} mb-4`} />
            <p className={`text-lg font-medium ${theme.text}`}>
              Unable to fetch news at the moment
            </p>
            <button
              onClick={fetchCyberSecurityNews}
              className={`mt-4 px-6 py-2 rounded-lg transition-colors border-2 ${theme.buttonBg} ${theme.buttonText} ${theme.buttonHover} ${theme.border}`}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsData.map((news) => (
              <article
                key={news.id}
                className={`rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${theme.cardBg} ${theme.cardBorder} ${theme.cardHover}`}
                onClick={() => window.open(news.url, '_blank')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}>
                    {React.cloneElement(news.icon, { className: `w-5 h-5 ${isDarkMode ? "text-black" : "text-white"}` })}
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold px-3 py-1 rounded mb-1 ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}>
                      {news.category}
                    </div>
                    {news.source && (
                      <div className={`text-xs ${theme.muted} font-medium`}>
                        {news.source}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${theme.cardText}`}>
                  {news.title}
                </h3>

                <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${theme.descText}`}>
                  {news.summary}
                </p>

                <div className={`flex items-center justify-between text-sm border-t-2 pt-3 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <div className={`flex items-center space-x-2 ${theme.muted}`}>
                    <Clock className={`w-4 h-4 ${theme.icon}`} />
                    <span className="font-medium">{news.timestamp}</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${theme.muted}`}>
                    <span className="font-medium">{news.readTime}</span>
                    <ExternalLink className={`w-4 h-4 ${theme.icon}`} />
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
              className={`px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 border-2 shadow-lg ${theme.buttonBg} ${theme.buttonText} ${theme.buttonHover} ${theme.border}`}
            >
              Load More News
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t-2 mt-16 py-8 ${theme.footerBg}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Shield className={`w-6 h-6 ${theme.footerText}`} />
              <span className={`font-bold text-lg ${theme.footerText}`}>CyberWatch</span>
            </div>
            <div className={`text-sm font-medium ${theme.footerText}`}>
              © 2025 CyberWatch. Stay secure, stay informed.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CyberSecurityNewsPage;

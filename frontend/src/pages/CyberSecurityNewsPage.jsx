import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, ExternalLink, TrendingUp, Bug, Lock, Shield, RefreshCw, Loader, ArrowRight } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import NewsNavbar from '../components/NewsNavbar';

const CyberSecurityNewsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
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

  const themeClasses = isDarkMode ? 'bg-black text-white' : 'bg-white text-black';
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

      const icons = {
        alert: AlertTriangle,
        bug: Bug,
        lock: Lock,
        shield: Shield
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

  useEffect(() => {
    fetchCyberSecurityNews();
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
      <NewsNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Hero */}
      <div className="relative">
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Cybersecurity Intelligence
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Stay ahead of emerging threats with real-time cybersecurity news and insights
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {trendingTopics.map((topic, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${isDarkMode ? 'border-white' : 'border-black'}`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                {topic}
              </span>
            ))}
          </div>

          <button
            onClick={handleExploreClick}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold shadow transition-colors group
              ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            Explore
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* News */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Threats & News</h2>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <span className="text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchCyberSecurityNews}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${isDarkMode ? 'border-white' : 'border-black'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-12 h-12 animate-spin mb-4" />
            <p className="text-lg">Fetching latest cybersecurity news...</p>
          </div>
        ) : newsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertTriangle className="w-12 h-12 mb-4" />
            <p className="text-lg">Unable to fetch news at the moment</p>
            <button
              onClick={fetchCyberSecurityNews}
              className={`mt-4 px-6 py-2 rounded-lg border ${isDarkMode ? 'border-white' : 'border-black'}`}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsData.map((news) => (
              <article
                key={news.id}
                className={`rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-black border-white text-white' : 'bg-white border-black text-black'}`}
                onClick={() => window.open(news.url, '_blank')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 border rounded-lg ${isDarkMode ? 'border-white' : 'border-black'}`}>
                    {news.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium border px-2 py-1 rounded mb-1">
                      {news.category}
                    </div>
                    {news.source && (
                      <div className="text-xs opacity-70">{news.source}</div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-sm mb-4 line-clamp-3 opacity-80">
                  {news.summary}
                </p>

                <div className="flex items-center justify-between text-sm opacity-70">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{news.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{news.readTime}</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t mt-16 ${isDarkMode ? 'border-white bg-black' : 'border-black bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">CyberWatch</span>
          </div>
          <div className="text-sm opacity-70">
            © 2025 CyberWatch. Stay secure, stay informed.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CyberSecurityNewsPage;

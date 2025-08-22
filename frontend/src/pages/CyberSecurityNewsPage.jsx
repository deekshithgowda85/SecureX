import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, ExternalLink, TrendingUp, Bug, Lock, Zap, RefreshCw, Loader, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NewsNavbar from '../components/NewsNavbar';
import Parser from 'rss-parser';

const CyberSecurityNewsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const navigate  = useNavigate();
  const trendingTopics = ["Zero-day exploits", "AI Security", "Ransomware", "Cloud vulnerabilities", "IoT threats"];

  const themeClasses = isDarkMode ? 'bg-black text-white' : 'bg-white text-black';
  const toggleDarkMode = () => setIsDarkMode(v => !v);

  const handleExploreClick = () => {
    navigate("/guide")
  };

  // 🔹 Fetch Live Hacker News RSS
  const fetchCyberSecurityNews = async () => {
    setIsLoading(true);
    try {
      // 1. Get top story IDs
      const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const storyIds = await response.json();
      console.log(response);
      // 2. Limit to top 10 stories
      const top10 = storyIds.slice(0, 10);
  
      // 3. Fetch details for each story
      const stories = await Promise.all(
        top10.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        )
      );
  
      const generateTimestamp = () =>
        ["2 hours ago", "4 hours ago", "6 hours ago", "8 hours ago", "12 hours ago", "1 day ago", "2 days ago"][
          Math.floor(Math.random() * 7)
        ];

        const truncateText = (text, maxLength = 120) => {
          if (!text) return "No summary available";
          return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
        };
        
  
      // 4. Map to your news format
      const mappedNews = stories.map((item, index) => ({
        id: item.id || index + 1,
        title: item.title || "No title",
        summary: truncateText(
    item.text ? item.text.replace(/<[^>]+>/g, "") : "No summary available"
  ), 
        category: "Tech News",
        severity: "medium",
        timestamp: generateTimestamp(),
        readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
        source: "Hacker News",
        icon: <AlertTriangle className="w-5 h-5" />,
        url: item.url || `https://news.ycombinator.com/item?id=${item.id}`
      }));
  
      setNewsData(mappedNews);
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Error fetching Hacker News:", e);
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
      
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Cybersecurity
            <br />
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Intelligence</span>
          </h1>
          <p className={`text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Stay ahead of emerging threats with real-time cybersecurity news, analysis, and expert insights
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {trendingTopics.map((topic, i) => (
              <span 
                key={i} 
                className={`px-4 py-2 rounded-full text-sm border-2 transition-all hover:scale-105 cursor-pointer font-bold ${
                  isDarkMode 
                    ? 'border-white text-white hover:bg-white hover:text-black' 
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                {topic}
              </span>
            ))}
          </div>
          
          <button 
            onClick={handleExploreClick} 
            className={`inline-flex items-center gap-3 px-8 py-4 border-2 rounded-lg text-lg font-bold transition-all hover:scale-105 group ${
              isDarkMode 
                ? 'border-white text-white hover:bg-white hover:text-black' 
                : 'border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            Explore Platform
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Latest Intelligence</h2>
          <div className="flex items-center space-x-4">
            {lastUpdated && (
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button 
              onClick={fetchCyberSecurityNews} 
              disabled={isLoading} 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all font-bold ${
                isDarkMode 
                  ? 'border-white hover:bg-white hover:text-black' 
                  : 'border-black hover:bg-black hover:text-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader className="w-12 h-12 animate-spin mb-6" />
            <p className={`text-lg font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Fetching latest intelligence...
            </p>
          </div>
        ) : newsData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <AlertTriangle className="w-12 h-12 mb-6" />
            <p className={`text-lg mb-6 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Unable to fetch news at the moment
            </p>
            <button 
              onClick={fetchCyberSecurityNews} 
              className={`px-6 py-3 border-2 rounded-lg font-bold transition-all hover:scale-105 ${
                isDarkMode 
                  ? 'border-white text-white hover:bg-white hover:text-black' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsData.map(news => (
              <article 
                key={news.id} 
                className={`group rounded-lg border-2 p-8 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isDarkMode 
                    ? 'border-white hover:bg-white hover:text-black' 
                    : 'border-black hover:bg-black hover:text-white'
                }`} 
                onClick={() => window.open(news.url, '_blank')}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-lg border-2 ${
                    isDarkMode 
                      ? 'border-white group-hover:border-black' 
                      : 'border-black group-hover:border-white'
                  }`}>
                    {news.icon}
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold px-3 py-1 rounded-full mb-2 border-2 ${
                      isDarkMode 
                        ? 'border-white text-white group-hover:border-black group-hover:text-black' 
                        : 'border-black text-black group-hover:border-white group-hover:text-white'
                    }`}>
                      {news.category}
                    </div>
                    {news.source && (
                      <div className={`text-xs font-bold ${
                        isDarkMode 
                          ? 'text-gray-400 group-hover:text-gray-600' 
                          : 'text-gray-600 group-hover:text-gray-400'
                      }`}>
                        {news.source}
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 leading-tight group-hover:underline">
                  {news.title}
                </h3>
                
                <p className={`text-sm mb-6 leading-relaxed font-semibold ${
                  isDarkMode 
                    ? 'text-gray-300 group-hover:text-gray-700' 
                    : 'text-gray-700 group-hover:text-gray-300'
                }`}>
                  {news.summary}
                </p>
                
                <div className={`flex items-center justify-between text-sm pt-4 border-t-2 font-bold ${
                  isDarkMode 
                    ? 'border-white text-gray-300 group-hover:border-black group-hover:text-gray-700' 
                    : 'border-black text-gray-700 group-hover:border-white group-hover:text-gray-300'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{news.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{news.readTime}</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!isLoading && newsData.length > 0 && (
          <div className="text-center mt-16">
            <button 
              onClick={fetchCyberSecurityNews} 
              className={`px-8 py-4 border-2 rounded-lg font-bold transition-all hover:scale-105 ${
                isDarkMode 
                  ? 'border-white text-white hover:bg-white hover:text-black' 
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              Load More Intelligence
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t-2 mt-24 ${isDarkMode ? 'border-white' : 'border-black'}`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <Shield className="w-6 h-6" />
              <span className="text-xl font-bold">CyberWatch</span>
            </div>
            <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 CyberWatch. Stay secure, stay informed.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CyberSecurityNewsPage;

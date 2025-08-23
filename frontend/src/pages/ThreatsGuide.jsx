import React, { useState } from "react";
import { threatsData } from "./data";
import { motion, AnimatePresence } from "framer-motion";
import NewsNavbar from "../components/NewsNavbar";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 80 }
  })
};


const ThreatsGuide = () => {
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };
  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  // Black and white theme classes based on toggle state
  const themeClasses = {
    // Background classes
    mainBg: isDarkMode ? 'bg-black' : 'bg-white',
    cardBg: isDarkMode ? 'bg-gray-900' : 'bg-white',
    buttonBg: isDarkMode ? 'bg-white' : 'bg-black',
    
    // Text classes
    mainText: isDarkMode ? 'text-white' : 'text-black',
    cardText: isDarkMode ? 'text-white' : 'text-black',
    descriptionText: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    buttonText: isDarkMode ? 'text-black' : 'text-white',
    listText: isDarkMode ? 'text-gray-200' : 'text-gray-800',
    
    // Border classes
    cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    
    // Icon classes
    iconColor: isDarkMode ? 'text-white' : 'text-black',
    
    // Hover classes
    cardHover: isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
    buttonHover: isDarkMode ? 'hover:bg-gray-200' : 'hover:bg-gray-800'
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-slate-50 to-slate-200'}`}>
      <NewsNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        iconColor={isDarkMode ? "text-white" : "text-black"}
        textColor={isDarkMode ? "text-white" : "text-black"}
      />
      
      <div className="py-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">Major Cybersecurity Threats</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {threatsData.map((threat, i) => {
            const Icon = threat.icon;
            return (
              <motion.div
                key={threat.id}
                className={`rounded-xl shadow-lg p-6 flex flex-col items-center border hover:shadow-2xl transition-shadow duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-100'}`}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                onClick={() => setSelectedThreat(threat)}
              >
                <div className="mb-4 text-blue-600 dark:text-blue-400">
                  <Icon size={40} />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-center">{threat.title}</h2>
                <p className="text-slate-600 dark:text-slate-300 text-center mb-4">{threat.description}</p>
                <button
                  className="mt-auto px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                  onClick={() => handleToggle(threat.id)}
                  aria-expanded={openId === threat.id}
                  aria-controls={`instructions-${threat.id}`}
                >
                  {openId === threat.id ? "Hide How to Protect" : "Show How to Protect"}
                </button>
                <motion.div
                  id={`instructions-${threat.id}`}
                  initial={false}
                  animate={{ height: openId === threat.id ? "auto" : 0, opacity: openId === threat.id ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden w-full"
                >
                  {openId === threat.id && (
                    <ul className="mt-4 list-disc list-inside text-left text-slate-700 dark:text-slate-200">
                      {threat.instructions.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThreatsGuide;
import React, { useState } from "react";
import { threatsData } from "./data";
import { motion } from "framer-motion";
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
  const [openId, setOpenId] = useState(null);
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
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.mainBg} ${themeClasses.mainText}`}>
      <NewsNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        iconColor={isDarkMode ? "text-white" : "text-black"}
        textColor={isDarkMode ? "text-white" : "text-black"}
      />
      
      <div className="py-10 px-4">
        <h1 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${themeClasses.mainText}`}>
          Major Cybersecurity Threats
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {threatsData.map((threat, i) => {
            const Icon = threat.icon;
            return (
              <motion.div
                key={threat.id}
                className={`rounded-xl shadow-lg p-6 flex flex-col items-center border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${themeClasses.cardBg} ${themeClasses.cardBorder} ${themeClasses.cardHover}`}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                {/* Icon with black/white theme */}
                <div className={`mb-4 ${themeClasses.iconColor}`}>
                  <Icon size={40} />
                </div>
                
                {/* Title */}
                <h2 className={`text-xl font-semibold mb-2 text-center ${themeClasses.cardText}`}>
                  {threat.title}
                </h2>
                
                {/* Description */}
                <p className={`text-center mb-4 ${themeClasses.descriptionText}`}>
                  {threat.description}
                </p>
                
                {/* Toggle Button */}
                <button
                  className={`mt-auto px-6 py-3 rounded-lg font-medium transition-all duration-300 border-2 ${themeClasses.buttonBg} ${themeClasses.buttonText} ${themeClasses.buttonHover} ${isDarkMode ? 'border-white hover:border-gray-300' : 'border-black hover:border-gray-600'}`}
                  onClick={() => handleToggle(threat.id)}
                  aria-expanded={openId === threat.id}
                  aria-controls={`instructions-${threat.id}`}
                >
                  {openId === threat.id ? "Hide How to Protect" : "Show How to Protect"}
                </button>
                
                {/* Expandable Instructions */}
                <motion.div
                  id={`instructions-${threat.id}`}
                  initial={false}
                  animate={{ 
                    height: openId === threat.id ? "auto" : 0, 
                    opacity: openId === threat.id ? 1 : 0 
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden w-full"
                >
                  {openId === threat.id && (
                    <div className={`mt-6 p-4 rounded-lg border-2 ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-400'}`}>
                      <h3 className={`font-semibold mb-3 ${themeClasses.cardText}`}>
                        Protection Guidelines:
                      </h3>
                      <ul className={`list-disc list-inside text-left space-y-2 ${themeClasses.listText}`}>
                        {threat.instructions.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Footer with black/white theme */}
      <footer className={`border-t-2 mt-16 py-8 ${isDarkMode ? 'border-white bg-black' : 'border-black bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className={`text-sm font-medium ${themeClasses.mainText}`}>
            © 2025 CyberSecurity Threats Guide. Stay protected, stay informed.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThreatsGuide;
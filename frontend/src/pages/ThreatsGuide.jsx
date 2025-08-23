import React, { useState } from "react";
import { threatsData } from "./data";
import { motion } from "framer-motion";
import NewsNavbar from "../components/NewsNavbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 80 }
  })
};

const ThreatsGuide = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  const themeClasses = {
    mainBg: isDarkMode ? "bg-black" : "bg-white",
    cardBg: isDarkMode ? "bg-gray-900" : "bg-white",
    buttonBg: isDarkMode ? "bg-white" : "bg-black",
    mainText: isDarkMode ? "text-white" : "text-black",
    cardText: isDarkMode ? "text-white" : "text-black",
    descriptionText: isDarkMode ? "text-gray-300" : "text-gray-700",
    buttonText: isDarkMode ? "text-black" : "text-white",
    listText: isDarkMode ? "text-gray-200" : "text-gray-800",
    cardBorder: isDarkMode ? "border-gray-700" : "border-gray-300",
    iconColor: isDarkMode ? "text-white" : "text-black",
    cardHover: isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50",
    buttonHover: isDarkMode ? "hover:bg-gray-200" : "hover:bg-gray-800"
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.mainBg} ${themeClasses.mainText}`}>
      <NewsNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        iconColor={themeClasses.iconColor}
        textColor={themeClasses.mainText}
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
                <div className={`mb-4 ${themeClasses.iconColor}`}>
                  <Icon size={40} />
                </div>

                <h2 className={`text-xl font-semibold mb-2 text-center ${themeClasses.cardText}`}>
                  {threat.title}
                </h2>

                <p className={`text-center mb-4 ${themeClasses.descriptionText}`}>
                  {threat.description}
                </p>

                <button
                  className={`mt-auto px-6 py-3 rounded-lg font-medium transition-all duration-300 border-2 ${themeClasses.buttonBg} ${themeClasses.buttonText} ${themeClasses.buttonHover} ${
                    isDarkMode
                      ? "border-white hover:border-gray-300"
                      : "border-black hover:border-gray-600"
                  }`}
                   
                >
                  <a   target="_blank" href={threat.link}>
                  View Details
                  </a>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ThreatsGuide;

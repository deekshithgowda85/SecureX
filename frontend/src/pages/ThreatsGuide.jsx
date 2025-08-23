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

// Modal animation
const modalVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

const ThreatsGuide = () => {
  const [openId, setOpenId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState(null);

  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  // Theme classes
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
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses.mainBg} ${themeClasses.mainText}`}
    >
      <NewsNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        iconColor={isDarkMode ? "text-white" : "text-black"}
        textColor={isDarkMode ? "text-white" : "text-black"}
      />

      <div className="py-10 px-4">
        <h1
          className={`text-3xl md:text-4xl font-bold text-center mb-8 ${themeClasses.mainText}`}
        >
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
                {/* Icon */}
                <div className={`mb-4 ${themeClasses.iconColor}`}>
                  <Icon size={40} />
                </div>

                {/* Title */}
                <h2
                  className={`text-xl font-semibold mb-2 text-center ${themeClasses.cardText}`}
                >
                  {threat.title}
                </h2>

                {/* Description */}
                <p className={`text-center mb-4 ${themeClasses.descriptionText}`}>
                  {threat.description}
                </p>

                {/* Modal Button */}
                <button
                  className={`mt-auto px-6 py-3 rounded-lg font-medium transition-all duration-300 border-2 ${themeClasses.buttonBg} ${themeClasses.buttonText} ${themeClasses.buttonHover} ${
                    isDarkMode
                      ? "border-white hover:border-gray-300"
                      : "border-black hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedThreat(threat)}
                >
                  View Details
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedThreat && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={`max-w-lg w-full rounded-2xl shadow-2xl p-6 relative ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedThreat(null)}
                className="absolute top-3 right-3 text-xl font-bold"
              >
                ✖
              </button>

              {/* Title */}
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {selectedThreat.title}
              </h2>

              {/* Description */}
              <p className="mb-4">{selectedThreat.description}</p>

              {/* Guidelines */}
              <h3 className="font-semibold mb-3">Protection Guidelines:</h3>
              <ul className="list-disc list-inside space-y-2">
                {selectedThreat.instructions.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer
        className={`border-t-2 mt-16 py-8 ${
          isDarkMode ? "border-white bg-black" : "border-black bg-white"
        }`}
      >
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

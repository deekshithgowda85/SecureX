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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const ThreatsGuide = () => {
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <NewsNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="py-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Major Cybersecurity Threats
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {threatsData.map((threat, i) => {
            const Icon = threat.icon;
            return (
              <motion.div
                key={threat.id}
                className={`rounded-xl shadow-lg p-6 flex flex-col items-center border cursor-pointer hover:shadow-2xl transition-shadow duration-300 ${isDarkMode ? 'bg-black border-white' : 'bg-white border-black'}`}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                onClick={() => setSelectedThreat(threat)}
              >
                <div className="mb-4">
                  <Icon size={40} />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-center">{threat.title}</h2>
                <p className="text-center opacity-70 mb-4">{threat.description}</p>
                <span className="text-sm underline">Click to learn more</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedThreat && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`max-w-lg w-full mx-4 rounded-xl p-6 border ${isDarkMode ? 'bg-black border-white text-white' : 'bg-white border-black text-black'}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{selectedThreat.title}</h2>
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="text-lg font-bold hover:opacity-70"
                >
                  ✕
                </button>
              </div>
              <p className="mb-4 opacity-80">{selectedThreat.description}</p>
              <h3 className="font-semibold mb-2">How to Protect:</h3>
              <ul className="list-disc list-inside space-y-1">
                {selectedThreat.instructions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThreatsGuide;

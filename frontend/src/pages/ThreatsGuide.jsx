import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Wifi, 
  Mail, 
  Smartphone,
  Eye,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Home,
  X
} from "lucide-react";

// Mock threats data
const threatsData = [
  {
    id: 1,
    title: "Phishing Attacks",
    description: "Deceptive emails or messages designed to steal personal information and credentials.",
    icon: Mail,
    instructions: [
      "Always verify sender identity before clicking links",
      "Check URLs carefully for suspicious domains",
      "Enable two-factor authentication on all accounts",
      "Keep software and browsers updated",
      "Report suspicious emails to IT security"
    ]
  },
  {
    id: 2,
    title: "Malware",
    description: "Malicious software designed to damage, disrupt, or gain unauthorized access to systems.",
    icon: AlertTriangle,
    instructions: [
      "Install reputable antivirus software",
      "Avoid downloading from untrusted sources",
      "Keep operating system updated",
      "Use caution with email attachments",
      "Regular system backups"
    ]
  },
  {
    id: 3,
    title: "WiFi Security",
    description: "Vulnerabilities in wireless network connections that can expose sensitive data.",
    icon: Wifi,
    instructions: [
      "Use WPA3 encryption on home networks",
      "Avoid public WiFi for sensitive activities",
      "Use VPN on public networks",
      "Regularly update router firmware",
      "Change default router passwords"
    ]
  },
  {
    id: 4,
    title: "Social Engineering",
    description: "Psychological manipulation tactics used to trick people into revealing information.",
    icon: Eye,
    instructions: [
      "Be skeptical of unsolicited requests",
      "Verify identity through separate channels",
      "Don't share personal info over phone/email",
      "Train employees on social engineering tactics",
      "Implement verification procedures"
    ]
  },
  {
    id: 5,
    title: "Ransomware",
    description: "Malicious software that encrypts files and demands payment for decryption keys.",
    icon: Lock,
    instructions: [
      "Maintain offline backups regularly",
      "Keep systems updated and patched",
      "Use endpoint detection and response tools",
      "Limit user privileges and access",
      "Develop incident response plans"
    ]
  },
  {
    id: 6,
    title: "Mobile Security",
    description: "Threats targeting smartphones and tablets through apps and network vulnerabilities.",
    icon: Smartphone,
    instructions: [
      "Download apps only from official stores",
      "Keep mobile OS updated",
      "Use strong device lock screens",
      "Review app permissions carefully",
      "Enable remote wipe capabilities"
    ]
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      delay: i * 0.08, 
      type: "spring", 
      stiffness: 100,
      damping: 15
    }
  })
};

const ThreatsGuide = () => {
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggle = (threat) => {
    setSelectedThreat(threat);
  };

  const closeModal = () => {
    setSelectedThreat(null);
  };

  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDarkMode 
        ? 'bg-black' 
        : 'bg-white'
    }`}>
      {/* Geometric background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-5 ${
          isDarkMode ? 'bg-white' : 'bg-black'
        }`}></div>
        <div className={`absolute top-1/3 -left-20 w-40 h-40 rotate-45 opacity-10 ${
          isDarkMode ? 'border-2 border-white' : 'border-2 border-black'
        }`}></div>
        <div className={`absolute bottom-20 right-1/4 w-60 h-60 rounded-full opacity-5 ${
          isDarkMode ? 'border border-white' : 'border border-black'
        }`}></div>
        <div className={`absolute bottom-0 left-0 w-32 h-32 opacity-10 ${
          isDarkMode ? 'bg-white' : 'bg-black'
        }`} style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}></div>
      </div>
      
      {/* Header */}
      <div className="relative">
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="flex justify-between items-center">
            <motion.button
              onClick={() => {
                window.location.href = '/';
              }}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 border ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20' 
                  : 'bg-black/5 border-black/10 text-black hover:bg-black/10 hover:border-black/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} />
            </motion.button>
            
            <motion.button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 border ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20' 
                  : 'bg-black/5 border-black/10 text-black hover:bg-black/10 hover:border-black/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative py-24 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Shield Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <div className={`relative p-6 rounded-full border-2 ${
                isDarkMode 
                  ? 'border-white/20 bg-white/5' 
                  : 'border-black/20 bg-black/5'
              }`}>
                <div className={`absolute inset-0 rounded-full animate-pulse ${
                  isDarkMode ? 'bg-white/10' : 'bg-black/10'
                }`}></div>
                <Shield className={`w-16 h-16 relative z-10 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`} />
              </div>
            </motion.div>
            
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className={`text-5xl md:text-7xl font-black mb-6 tracking-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                CYBERSECURITY
              </h1>
              <div className="relative mb-8">
                <h2 className={`text-3xl md:text-5xl font-light tracking-widest ${
                  isDarkMode ? 'text-white/80' : 'text-black/80'
                }`}>
                  THREAT GUIDE
                </h2>
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 ${
                  isDarkMode ? 'bg-white' : 'bg-black'
                }`}></div>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className={`text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto ${
                isDarkMode ? 'text-white/70' : 'text-black/70'
              }`}
            >
              Master the art of digital defense with our comprehensive guide to cybersecurity threats and protection strategies.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Threats Grid */}
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className={`text-2xl md:text-3xl font-bold tracking-wide ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              THREAT CATEGORIES
            </h3>
            <div className={`mt-4 w-16 h-0.5 mx-auto ${
              isDarkMode ? 'bg-white' : 'bg-black'
            }`}></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {threatsData.map((threat, i) => {
              const Icon = threat.icon;
              
              return (
                <motion.div
                  key={threat.id}
                  className={`group relative overflow-hidden rounded-none border-2 transition-all duration-500 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-black border-white/20 hover:border-white hover:bg-white/5' 
                      : 'bg-white border-black/20 hover:border-black hover:bg-black/5'
                  }`}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  onClick={() => handleToggle(threat)}
                >
                  {/* Hover effect line */}
                  <div className={`absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${
                    isDarkMode ? 'bg-white' : 'bg-black'
                  }`}></div>

                  <div className="p-8">
                    {/* Icon */}
                    <div className="mb-6">
                      <Icon className={`w-12 h-12 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      } group-hover:scale-110 transition-transform duration-300`} />
                    </div>

                    {/* Content */}
                    <h3 className={`text-xl font-bold mb-4 tracking-wide ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                      {threat.title.toUpperCase()}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed mb-8 font-light ${
                      isDarkMode ? 'text-white/70' : 'text-black/70'
                    }`}>
                      {threat.description}
                    </p>

                    {/* Button */}
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium tracking-wider ${
                        isDarkMode ? 'text-white/90' : 'text-black/90'
                      }`}>
                        VIEW GUIDE
                      </span>
                      <motion.div
                        className={`w-8 h-8 flex items-center justify-center ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedThreat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative max-w-3xl w-full max-h-[90vh] overflow-y-auto ${
                isDarkMode 
                  ? 'bg-black border-2 border-white/30' 
                  : 'bg-white border-2 border-black/30'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`p-8 border-b-2 ${
                isDarkMode ? 'border-white/20' : 'border-black/20'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-6">
                    {React.createElement(selectedThreat.icon, {
                      className: `w-10 h-10 ${isDarkMode ? 'text-white' : 'text-black'}`
                    })}
                    <div>
                      <h2 className={`text-3xl font-black tracking-wide ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}>
                        {selectedThreat.title.toUpperCase()}
                      </h2>
                      <p className={`text-sm mt-2 tracking-widest font-light ${
                        isDarkMode ? 'text-white/60' : 'text-black/60'
                      }`}>
                        PROTECTION GUIDE
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className={`p-2 transition-colors ${
                      isDarkMode 
                        ? 'text-white/70 hover:text-white' 
                        : 'text-black/70 hover:text-black'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Description */}
                <div className={`mb-12 p-6 border-l-4 ${
                  isDarkMode 
                    ? 'border-white/30 bg-white/5' 
                    : 'border-black/30 bg-black/5'
                }`}>
                  <h3 className={`font-bold text-lg mb-3 tracking-wide ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}>
                    THREAT OVERVIEW
                  </h3>
                  <p className={`font-light leading-relaxed ${
                    isDarkMode ? 'text-white/80' : 'text-black/80'
                  }`}>
                    {selectedThreat.description}
                  </p>
                </div>

                {/* Instructions */}
                <h3 className={`font-black text-2xl mb-8 tracking-wide ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}>
                  PROTECTION STRATEGIES
                </h3>

                <div className="space-y-6">
                  {selectedThreat.instructions.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`flex items-start gap-6 p-6 border-l-2 transition-colors duration-300 ${
                        isDarkMode 
                          ? 'border-white/20 hover:border-white/40 hover:bg-white/5' 
                          : 'border-black/20 hover:border-black/40 hover:bg-black/5'
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center font-bold text-sm border-2 flex-shrink-0 ${
                        isDarkMode 
                          ? 'border-white/30 text-white bg-white/10' 
                          : 'border-black/30 text-black bg-black/10'
                      }`}>
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <p className={`font-light leading-relaxed ${
                        isDarkMode ? 'text-white/90' : 'text-black/90'
                      }`}>
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Modal Footer */}
                <div className={`mt-12 pt-8 border-t-2 ${
                  isDarkMode ? 'border-white/20' : 'border-black/20'
                }`}>
                  <motion.button
                    onClick={closeModal}
                    className={`w-full py-4 px-8 font-bold tracking-widest transition-all duration-300 border-2 ${
                      isDarkMode 
                        ? 'border-white/30 text-white hover:bg-white hover:text-black' 
                        : 'border-black/30 text-black hover:bg-black hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    UNDERSTOOD
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className={`relative py-16 px-6 text-center border-t-2 ${
        isDarkMode 
          ? 'border-white/20 bg-black' 
          : 'border-black/20 bg-white'
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className={`text-sm font-light tracking-widest ${
            isDarkMode ? 'text-white/60' : 'text-black/60'
          }`}>
            VIGILANCE IS THE PRICE OF SECURITY
          </p>
          <div className={`mt-4 w-12 h-0.5 mx-auto ${
            isDarkMode ? 'bg-white/40' : 'bg-black/40'
          }`}></div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThreatsGuide;
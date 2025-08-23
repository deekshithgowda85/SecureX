import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add this import
import NewsNavbar from '../../components/NewsNavbar';
import CybersecurityTradingHero from '../../components/Homelanding';
import CircularGallery from '../../components/Components/CircularGallery/CircularGallery';
import { Check, ArrowRight, Shield, Lock, Users, Globe } from 'lucide-react';
import firewallImg from '../../assets/img1.jpg';
import threatImg from '../../assets/img2.jpeg';
import networkImg from '../../assets/img3.jpeg';
import incidentImg from '../../assets/img4.jpg';
import penetrationImg from '../../assets/img5.jpeg';
import cloudImg from '../../assets/img6.jpeg';
import vulnerabilityImg from '../../assets/img7.jpeg';
import phishingImg from '../../assets/img8.jpeg';
import siemImg from '../../assets/img9.jpeg';
import encryptionImg from '../../assets/img10.jpeg';
import Footer from '../../components/Footer';

const galleryItems = [
  { image: firewallImg, text: 'Firewall Protection' },
  { image: networkImg, text: 'Network Monitoring' },
  { image: threatImg, text: 'Threat Intelligence' },
  { image: encryptionImg, text: 'Data Encryption' },
  { image: incidentImg, text: 'Incident Response' },
  { image: penetrationImg, text: 'Penetration Testing' },
  { image: cloudImg, text: 'Cloud Security' },
  { image: vulnerabilityImg, text: 'Vulnerability Scanning' },
  { image: phishingImg, text: 'Phishing Protection' },
  { image: siemImg, text: 'SIEM Integration' },
];

const Home = () => {
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const bottomLeftCardRef = useRef(null);
  const bottomRightCardsRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const navigate = useNavigate(); // <-- Add this line

  useEffect(() => {
    // Import GSAP
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;
      
      // Set initial states for cards with 3D transforms
      gsap.set([leftCardRef.current, rightCardRef.current, bottomLeftCardRef.current, bottomRightCardsRef.current], {
        opacity: 0,
        y: 100,
        rotationX: 15,
        rotationY: 0,
        z: -100,
        transformStyle: "preserve-3d"
      });

      // Animate cards in sequence with 3D effects
      const tl = gsap.timeline();
      
      tl.to(leftCardRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 15,
        rotationY: 25,
        rotationZ: 12,
        z: 50,
        duration: 1.5,
        ease: "power3.out"
      })
      .to(rightCardRef.current, {
        opacity: 1,
        y: 0,
        rotationX: -15,
        rotationY: -20,
        rotationZ: -8,
        z: 30,
        duration: 1.5,
        ease: "power3.out"
      }, "-=1")
      .to(bottomLeftCardRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 8,
        rotationY: 15,
        rotationZ: 6,
        z: 20,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8")
      .to(bottomRightCardsRef.current, {
        opacity: 1,
        y: 0,
        rotationX: -5,
        rotationY: -15,
        rotationZ: -3,
        z: 10,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.6");

      // Floating animation for cards
      gsap.to(leftCardRef.current, {
        y: "+=20",
        rotationZ: "+=3",
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.to(rightCardRef.current, {
        y: "+=15",
        rotationZ: "-=2",
        duration: 5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.to(bottomLeftCardRef.current, {
        y: "+=12",
        rotationZ: "+=2",
        duration: 3.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Animate floating elements
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: `+=${Math.random() * 40 + 20}`,
            x: `+=${Math.random() * 30 - 15}`,
            duration: Math.random() * 3 + 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.4
          });
        }
      });

      // Mouse parallax effect
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;

        gsap.to(leftCardRef.current, {
          rotationY: 25 + xPercent * 12,
          rotationX: 15 + yPercent * 8,
          duration: 0.6,
          ease: "power2.out"
        });

        gsap.to(rightCardRef.current, {
          rotationY: -20 + xPercent * 10,
          rotationX: -15 + yPercent * 6,
          duration: 0.6,
          ease: "power2.out"
        });

        gsap.to(bottomLeftCardRef.current, {
          rotationY: 15 + xPercent * 8,
          rotationX: 8 + yPercent * 4,
          duration: 0.6,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <NewsNavbar />
      {/* Animated/3D card hero section */}
      <div className="min-h-screen bg-white text-black relative overflow-hidden" style={{ perspective: '1200px' }}>
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/40 via-white to-white"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-100/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* 3D Security Cards/Interfaces */}
        <div
          ref={leftCardRef}
          className="absolute z-10 top-[18%] left-[6%] w-80 h-96"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(15deg) rotateY(25deg) rotateZ(12deg)'
          }}
        >
          <div className="w-full h-full bg-white/95 rounded-xl border border-cyan-400/30 backdrop-blur-md shadow-2xl" style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 30px rgba(6, 182, 212, 0.08)'
          }}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-cyan-600 text-sm font-medium">🛡️ Threat Detection</span>
                <span className="text-gray-400 text-xs">Real-time</span>
              </div>
              <div className="mb-8">
                <div className="text-3xl font-bold text-black">Level 9</div>
                <div className="text-cyan-600 text-sm">Security Status: SECURE</div>
              </div>
              <div className="h-40 bg-gray-100 rounded-lg mb-6 relative overflow-hidden border border-cyan-400/20">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-200/10 to-transparent"></div>
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-1 p-2">
                  {[...Array(48)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`bg-cyan-400/20 rounded-sm ${Math.random() > 0.8 ? 'animate-pulse bg-cyan-400/40' : ''}`}
                      style={{animationDelay: `${Math.random() * 2}s`}}
                    ></div>
                  ))}
                </div>
                <div className="absolute bottom-2 left-2 text-xs text-cyan-600">
                  Network Scan Active
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Threats Blocked</span>
                  <span className="text-cyan-600 font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Shields</span>
                  <span className="text-black font-medium">8/8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Firewall Status</span>
                  <span className="text-green-600 font-medium">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={rightCardRef}
          className="absolute z-10 top-[22%] right-[6%] w-72 h-80"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-15deg) rotateY(-20deg) rotateZ(-8deg)'
          }}
        >
          <div className="w-full h-full bg-white/95 rounded-xl border border-cyan-400/30 backdrop-blur-md shadow-2xl" style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 30px rgba(6, 182, 212, 0.08)'
          }}>
            <div className="p-5">
              <div className="flex justify-between items-center mb-6">
                <span className="text-cyan-600 text-sm font-medium">🔐 Security Hub</span>
                <span className="text-cyan-600 text-xs bg-cyan-200/20 px-2 py-1 rounded border border-cyan-400/30">LIVE</span>
              </div>
              <div className="mb-6">
                <div className="text-3xl font-bold text-black">98.7%</div>
                <div className="text-gray-400 text-sm">Defense Efficiency</div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-100 rounded-lg p-3 border border-cyan-400/20">
                  <div className="text-cyan-600 text-xl font-bold">0</div>
                  <div className="text-gray-400 text-xs">Active Threats</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 border border-cyan-400/20">
                  <div className="text-black text-xl font-bold">2.4K</div>
                  <div className="text-gray-400 text-xs">Scans Today</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 border border-cyan-400/20">
                  <div className="text-green-600 text-xl font-bold">847</div>
                  <div className="text-gray-400 text-xs">Blocked</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 border border-cyan-400/20">
                  <div className="text-cyan-600 text-xl font-bold">99.9%</div>
                  <div className="text-gray-400 text-xs">Uptime</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400">Security Level</span>
                  <span className="text-cyan-600">Elite</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 border border-cyan-400/30">
                  <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full relative" style={{width: '94%'}}>
                    <div className="absolute right-0 top-0 w-1 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={bottomLeftCardRef}
          className="absolute z-10 bottom-[12%] left-[10%] w-64 h-32"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(8deg) rotateY(15deg) rotateZ(6deg)'
          }}
        >
          <div className="w-full h-full bg-white/95 rounded-xl border border-cyan-400/30 backdrop-blur-md shadow-2xl" style={{
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.07), 0 0 20px rgba(6, 182, 212, 0.08)'
          }}>
            <div className="p-4">
              <div className="text-cyan-600 text-sm mb-3 font-medium">🎓 CEH Progress</div>
              <div className="text-black text-xl font-bold mb-1">Advanced</div>
              <div className="text-gray-400 text-xs mb-3">Ethical Hacking Mastery</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 border border-cyan-400/30">
                <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-1.5 rounded-full animate-pulse" style={{width: '87%'}}></div>
              </div>
              <div className="text-right text-xs text-cyan-600 mt-1">87% Complete</div>
            </div>
          </div>
        </div>

        <div
          ref={bottomRightCardsRef}
          className="absolute z-10 bottom-[14%] right-[12%] space-y-3"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-5deg) rotateY(-15deg) rotateZ(-3deg)'
          }}
        >
          <div className="w-48 h-16 bg-white/95 rounded-lg border border-cyan-400/30 backdrop-blur-md shadow-xl" style={{
            boxShadow: '0 15px 30px -8px rgba(0, 0, 0, 0.06), 0 0 15px rgba(6, 182, 212, 0.05)'
          }}>
            <div className="p-3 h-full flex items-center">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🔍</span>
                  <div>
                    <div className="text-black text-sm font-medium">Nmap Scanner</div>
                    <div className="text-cyan-600 text-xs">Port Discovery</div>
                  </div>
                </div>
                <div className="text-green-600 text-xs font-mono">ACTIVE</div>
              </div>
            </div>
          </div>
          
          <div className="w-48 h-16 bg-white/95 rounded-lg border border-cyan-400/30 backdrop-blur-md shadow-xl" style={{
            boxShadow: '0 15px 30px -8px rgba(0, 0, 0, 0.06), 0 0 15px rgba(6, 182, 212, 0.05)'
          }}>
            <div className="p-3 h-full flex items-center">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <div className="text-black text-sm font-medium">Metasploit</div>
                    <div className="text-orange-500 text-xs">Payload Ready</div>
                  </div>
                </div>
                <div className="text-orange-500 text-xs font-mono">READY</div>
              </div>
            </div>
          </div>

          <div className="w-48 h-16 bg-white/95 rounded-lg border border-cyan-400/30 backdrop-blur-md shadow-xl" style={{
            boxShadow: '0 15px 30px -8px rgba(0, 0, 0, 0.06), 0 0 15px rgba(6, 182, 212, 0.05)'
          }}>
            <div className="p-3 h-full flex items-center">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <div className="text-black text-sm font-medium">Wireshark</div>
                    <div className="text-cyan-600 text-xs">Traffic Analysis</div>
                  </div>
                </div>
                <div className="text-cyan-600 text-xs font-mono">MONITOR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cyber Elements */}
        <div 
          ref={el => floatingElementsRef.current[0] = el}
          className="absolute top-1/2 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-70 animate-pulse"
        ></div>
        <div 
          ref={el => floatingElementsRef.current[1] = el}
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full opacity-80"
        ></div>
        <div 
          ref={el => floatingElementsRef.current[2] = el}
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-200 rounded-full opacity-60 animate-pulse"
        ></div>
        <div 
          ref={el => floatingElementsRef.current[3] = el}
          className="absolute top-20 right-1/3 w-1 h-1 bg-cyan-400 rounded-full opacity-50"
        ></div>
        
        {/* Additional decorative cyber elements */}
        <div className="absolute top-16 right-1/3 text-cyan-400/20 text-xs transform rotate-45 font-mono select-none">
          SECURE
        </div>
        <div className="absolute bottom-32 left-1/4 text-cyan-400/20 text-xs transform -rotate-12 font-mono select-none">
          DEFEND
        </div>
        <div className="absolute top-1/4 right-16 text-cyan-400/15 text-xs transform rotate-90 font-mono select-none">
          ENCRYPT
        </div>
        <div className="absolute bottom-1/4 left-20 text-cyan-400/15 text-xs transform -rotate-45 font-mono select-none">
          PROTECT
        </div>

        {/* Main Content (Heading, Subtitle, CTA) */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-cyan-600 text-sm mb-4 tracking-wider opacity-80 pointer-events-auto">
            Advanced Cyber Defense • Elite Training
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8 leading-tight pointer-events-auto">
            <div className="text-black">CyberDefense Academy</div>
            <div className="text-cyan-600 bg-gradient-to-r from-cyan-600 to-blue-400 bg-clip-text text-transparent">
              Master Digital Security
            </div>
          </h1>
          <p className="text-black text-lg mb-8 text-center max-w-2xl leading-relaxed pointer-events-auto">
            Join elite cybersecurity professionals in advanced threat detection and digital defense strategies
          </p>
          <div className="flex items-center space-x-4 mb-12 pointer-events-auto">
            <button
              className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={() => navigate('/quiz')}
            >
              Start Training
            </button>
            <button
              className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              onClick={() => navigate('/dashboard')}
            >
              Explore
            </button>
          </div>
        </div>

        {/* Animated cyber grid background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
      {/* Homelanding section below */}
      <CybersecurityTradingHero />
      {/* Circular Gallery below Homelanding */}
      <div className="w-full bg-white py-24 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-black mb-8">Security and Safety</h2>
        <div className="w-screen max-w-none h-[480px] px-0 mx-0">
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#111111"
            borderRadius={0.05}
            font="bold 30px Figtree"
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
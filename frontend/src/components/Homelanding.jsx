import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Shield, Lock, Eye, Wifi, CheckCircle, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

const CybersecurityTradingHero = () => {
  const canvasRef = useRef(null);
  const mobileRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationId = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Initialize Three.js background
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    sceneRef.current = scene;
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 120;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x333333,
      transparent: true,
      opacity: 0.3
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create network lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < 40; i++) {
      linePositions.push(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      );
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.1
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 8;

    // Animation loop
    const animate = () => {
      animationId.current = requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.001;
      
      lines.rotation.x += 0.0003;
      lines.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // GSAP animation only when entering viewport (not every scroll)
  const animateOnScroll = useCallback(() => {
    if (
      typeof window !== 'undefined' &&
      window.gsap &&
      sectionRef.current &&
      !hasAnimated
    ) {
      const gsap = window.gsap;

      // Animate text content
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -100, y: 30 },
        { opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out' }
      );

      // Animate mobile mockup
      gsap.fromTo(
        mobileRef.current,
        { opacity: 0, x: 100, y: 30, scale: 0.9, rotateY: 15 },
        { opacity: 1, x: 0, y: 0, scale: 1, rotateY: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );

      // Animate feature items
      gsap.fromTo(
        '.feature-item',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
      );

      // Floating animation for mobile
      gsap.to(mobileRef.current, {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.5
      });

      setHasAnimated(true);
    }
  }, [hasAnimated]);

  // Intersection Observer for scroll detection (only triggers once)
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateOnScroll();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [animateOnScroll, hasAnimated]);

  return (
    <div className="w-full bg-white">
      {/* Top spacing */}
      <div className="h-20"></div>
      <div ref={sectionRef} className="relative min-h-screen bg-white overflow-hidden">
        {/* Three.js Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0 opacity-20"
        />

        {/* Main Content */}
        <div className="relative z-10 flex items-center min-h-screen py-16">
          <div className="w-full max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div ref={textRef} className="space-y-10 max-w-2xl">
                {/* Main Headline */}
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] text-black">
                    Secure your digital infrastructure and{' '}
                    <span className="text-blue-600">
                      network assets
                    </span>{' '}
                    with intelligence up to{' '}
                    <span className="text-green-600 font-extrabold">99.9% accuracy!</span>
                  </h1>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    Advanced cybersecurity platform that monitors your digital infrastructure in real-time. Our AI-powered threat detection provides comprehensive security analytics with automated incident response capabilities to protect your valuable assets.
                  </p>
                </div>
                {/* Feature Item */}
                <div className="space-y-4">
                  <div className="feature-item bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-black mb-2">
                          What is Real-time Threat Intelligence exactly and what does it do?
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          Our advanced AI monitors network traffic, analyzes behavioral patterns, and identifies potential security threats across all endpoints in real-time, providing instant alerts and automated response protocols.
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-all duration-200 hover:scale-110">
                        <ArrowRight className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Content - Mobile Mockup */}
              <div ref={mobileRef} className="flex justify-center lg:justify-end relative">
                <div className="relative transform-gpu">
                  {/* Mobile Frame */}
                  <div className="relative w-80 h-[680px] bg-gray-900 rounded-[3.5rem] p-2.5 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                    {/* Screen */}
                    <div className="w-full h-full bg-black rounded-[3rem] overflow-hidden relative">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-6 py-3 text-white">
                        <span className="font-semibold text-sm">9:41</span>
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-0.5">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          </div>
                          <Wifi className="w-4 h-4" />
                          <div className="w-6 h-3 border border-white rounded-sm relative">
                            <div className="w-4 h-1.5 bg-green-400 rounded-sm absolute top-0.5 left-0.5"></div>
                          </div>
                        </div>
                      </div>
                      {/* App Content */}
                      <div className="px-6 pt-8 pb-6 h-full">
                        {/* Header with logo */}
                        <div className="flex items-center space-x-3 mb-8">
                          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                            <Shield className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h2 className="text-white font-bold text-lg">CyberShield</h2>
                            <p className="text-green-400 text-sm font-medium">All systems secure</p>
                          </div>
                        </div>
                        {/* Security Dashboard */}
                        <div className="space-y-6">
                          {/* Main Security Card */}
                          <div className="bg-gray-800 rounded-3xl p-6 hover:bg-gray-750 transition-colors duration-300">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-gray-300 font-medium">Security Score</span>
                              <span className="text-green-400 font-bold text-xl">98/100</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                              <div className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out" style={{width: '98%'}}></div>
                            </div>
                            <p className="text-gray-400 text-sm">Network fully protected • Last scan: 2 min ago</p>
                          </div>
                          {/* Threat Alerts */}
                          <div className="space-y-3">
                            <div className="bg-green-900/30 border border-green-700/50 rounded-2xl p-4 hover:bg-green-900/40 transition-colors duration-300">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-green-400 font-semibold text-sm">System Secure</p>
                                  <p className="text-green-300/70 text-xs">All endpoints protected</p>
                                </div>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              </div>
                            </div>
                            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-2xl p-4 hover:bg-yellow-900/40 transition-colors duration-300">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                  <Eye className="w-4 h-4 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-yellow-400 font-semibold text-sm">Monitoring</p>
                                  <p className="text-yellow-300/70 text-xs">3 suspicious connections</p>
                                </div>
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                          {/* Quick Actions */}
                          <div className="grid grid-cols-2 gap-3 mt-8">
                            <button className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-4 text-white font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95">
                              Deep Scan
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 rounded-2xl p-4 text-white font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95">
                              Reports
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Home indicator */}
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                  {/* Floating decorative elements */}
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-500/10 border-2 border-blue-200 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-green-500/10 border-2 border-green-200 rounded-full animate-ping"></div>
                  <div className="absolute top-1/3 -right-10 w-12 h-12 bg-purple-500/10 border-2 border-purple-200 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-1/4 -left-8 w-10 h-10 bg-blue-400/10 border-2 border-blue-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default CybersecurityTradingHero;
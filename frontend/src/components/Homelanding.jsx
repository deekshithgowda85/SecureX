import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Shield, BookOpen, Brain, Target, Award, Users, TrendingUp, Zap } from 'lucide-react';
import * as THREE from 'three';

const ThreatAwarenessHero = () => {
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

    // Create floating particles for educational theme
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 25;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.4
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create knowledge network lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < 60; i++) {
      linePositions.push(
        Math.random() * 25 - 12.5,
        Math.random() * 25 - 12.5,
        Math.random() * 25 - 12.5,
        Math.random() * 25 - 12.5,
        Math.random() * 25 - 12.5,
        Math.random() * 25 - 12.5
      );
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.15
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      animationId.current = requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.0008;
      particlesMesh.rotation.y += 0.0012;
      
      lines.rotation.x += 0.0004;
      lines.rotation.y += 0.0006;

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

  // Animation callback
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
        y: -12,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.5
      });

      setHasAnimated(true);
    }
  }, [hasAnimated]);

  // Intersection Observer
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
          className="absolute inset-0 w-full h-full z-0 opacity-25"
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
                    Master cybersecurity through{' '}
                    <span className="text-indigo-600">
                      interactive learning
                    </span>{' '}
                    and build{' '}
                    <span className="text-purple-600 font-extrabold">threat awareness</span>{' '}
                    skills that matter!
                  </h1>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    Comprehensive cybersecurity education platform that transforms complex security concepts into engaging, hands-on learning experiences. Build real-world threat detection skills through interactive simulations and expert-led training modules.
                  </p>
                </div>
                
                {/* Feature Item */}
                <div className="space-y-4">
                  <div className="feature-item bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-black mb-2">
                          How does Interactive Threat Simulation training enhance security awareness?
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          Our immersive learning platform uses real-world attack scenarios to teach threat identification, incident response, and security best practices through gamified challenges and hands-on exercises that build muscle memory for security protocols.
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-all duration-200 hover:scale-110">
                        <Target className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Mobile Learning App Mockup */}
              <div ref={mobileRef} className="flex justify-center lg:justify-end relative">
                <div className="relative transform-gpu">
                  {/* Mobile Frame */}
                  <div className="relative w-80 h-[680px] bg-gray-900 rounded-[3.5rem] p-2.5 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                    {/* Screen */}
                    <div className="w-full h-full bg-black rounded-[3rem] overflow-hidden relative">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-6 py-3 text-white">
                        <span className="font-semibold text-sm">10:24</span>
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-0.5">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                          </div>
                          <div className="w-6 h-3 border border-white rounded-sm relative">
                            <div className="w-5 h-1.5 bg-green-400 rounded-sm absolute top-0.5 left-0.5"></div>
                          </div>
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="px-6 pt-8 pb-6 h-full">
                        {/* Header with logo */}
                        <div className="flex items-center space-x-3 mb-8">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                            <BookOpen className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h2 className="text-white font-bold text-lg">CyberLearn</h2>
                            <p className="text-indigo-400 text-sm font-medium">Level 12 • Security Analyst</p>
                          </div>
                        </div>

                        {/* Learning Progress Dashboard */}
                        <div className="space-y-6">
                          {/* Progress Overview */}
                          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-3xl p-6 border border-indigo-700/30 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-gray-200 font-medium">Weekly Progress</span>
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span className="text-green-400 font-bold text-sm">+24%</span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-700/50 rounded-full h-3 mb-4">
                              <div className="bg-gradient-to-r from-indigo-400 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out" style={{width: '76%'}}></div>
                            </div>
                            <p className="text-gray-300 text-sm">4 of 5 modules completed • 18 hrs this week</p>
                          </div>

                          {/* Current Learning Modules */}
                          <div className="space-y-3">
                            <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-600/40 rounded-2xl p-4 hover:bg-green-900/40 transition-colors duration-300">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                                  <Award className="w-4 h-4 text-green-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-green-300 font-semibold text-sm">Phishing Detection</p>
                                  <p className="text-green-200/70 text-xs">Completed • Score: 94%</p>
                                </div>
                                <div className="text-green-400 font-bold text-lg">✓</div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-600/40 rounded-2xl p-4 hover:bg-blue-900/40 transition-colors duration-300">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                  <Zap className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-blue-300 font-semibold text-sm">Incident Response</p>
                                  <p className="text-blue-200/70 text-xs">In Progress • 67% complete</p>
                                </div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-600/40 rounded-2xl p-4 hover:bg-purple-900/40 transition-colors duration-300">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                                  <Users className="w-4 h-4 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-purple-300 font-semibold text-sm">Social Engineering</p>
                                  <p className="text-purple-200/70 text-xs">Next module • Unlocks in 2 days</p>
                                </div>
                                <div className="w-6 h-6 border-2 border-purple-400/30 rounded-full"></div>
                              </div>
                            </div>
                          </div>

                          {/* Quick Learning Actions */}
                          <div className="grid grid-cols-2 gap-3 mt-8">
                            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-2xl p-4 text-white font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95">
                              Start Quiz
                            </button>
                            <button className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-2xl p-4 text-white font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95">
                              Practice Lab
                            </button>
                          </div>

                          {/* Achievement Badge */}
                          <div className="mt-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-600/40 rounded-2xl p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <Award className="w-5 h-5 text-yellow-400" />
                              </div>
                              <div className="flex-1">
                                <p className="text-yellow-300 font-semibold text-sm">New Achievement!</p>
                                <p className="text-yellow-200/70 text-xs">Threat Hunter Badge earned</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Home indicator */}
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>

                  {/* Floating decorative elements */}
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-indigo-500/10 border-2 border-indigo-300 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-500/10 border-2 border-purple-300 rounded-full animate-ping"></div>
                  <div className="absolute top-1/3 -right-10 w-12 h-12 bg-pink-500/10 border-2 border-pink-300 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-1/4 -left-8 w-10 h-10 bg-indigo-400/10 border-2 border-indigo-300 rounded-full animate-pulse"></div>
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

export default ThreatAwarenessHero;
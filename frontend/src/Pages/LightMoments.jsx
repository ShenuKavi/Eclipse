import React, { useState, useEffect, useRef } from 'react';
import './LightMoments.css';
import { motion } from 'framer-motion';

function LightMoments() {
  const [activeTab, setActiveTab] = useState('resources');
  const particlesRef = useRef([]);
  
  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      particlesRef.current = [];
      const particleCount = 25;
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 4 + 1;
        const particle = {
          id: i,
          size,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          speed: Math.random() * 0.5 + 0.2
        };
        particlesRef.current.push(particle);
      }
    };
    
    createParticles();
  }, []);

  const wellnessTips = [
    "Practice 5-4-3-2-1 grounding: Notice 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, 1 thing you taste",
    "Start a gratitude journal - write 3 things you're thankful for each night",
    "Take a mindful walk and notice nature around you",
    "Try box breathing: Inhale 4s, hold 4s, exhale 4s, hold 4s",
    "Create a 'worry time' - set aside 15 minutes daily to process concerns"
  ];

  const communityMessages = [
    "You're stronger than you know. Yesterday I felt hopeless, today the sun feels warmer.",
    "Remember to hydrate! Water helps regulate mood more than we realize.",
    "If you're feeling overwhelmed, try the 5-minute rule: Just commit to 5 minutes of a task.",
    "Your feelings are valid, even the uncomfortable ones. They don't define your worth.",
    "Progress isn't linear. Be patient with yourself like you would with a dear friend."
  ];

  return (
    <section className="lightmoments-container">
      {/* Floating particles */}
      {particlesRef.current.map(particle => (
        <div 
          key={particle.id}
          className="floating-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animationDuration: `${particle.speed * 10 + 5}s`,
            opacity: 0.7
          }}
        />
      ))}
      
      <div className="lightmoments-content">
        <motion.h1 
          className="lightmoments-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: '30px' }}
        >
          🌟 Light Moments
        </motion.h1>
        
        <motion.p 
          className="lightmoments-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Uplifting resources for your mental wellness journey
        </motion.p>
        
        <div className="lightmoments-tabs">
          <button 
            className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Wellness Resources
          </button>
          <button 
            className={`tab ${activeTab === 'community' ? 'active' : ''}`}
            onClick={() => setActiveTab('community')}
          >
            Community Wisdom
          </button>
          <button 
            className={`tab ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => setActiveTab('tools')}
          >
            Quick Tools
          </button>
        </div>
        
        {activeTab === 'resources' && (
          <motion.div 
            className="resources-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="resource-category">
              <h3>🌿 Daily Wellness Tips</h3>
              <ul className="wellness-tips">
                {wellnessTips.map((tip, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="resource-category">
              <h3>📚 Helpful Resources</h3>
              <div className="resource-links">
                <a href="https://my.clevelandclinic.org/health/diseases/9290-depression" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  Cleveland Clinic - Understanding Depression
                </a>
                <a href="http://www.sumithrayo.org/" target="_blank" rel="noopener noreferrer">
                  Sumithrayo (Suicide Prevention)


                </a>
                <a href="https://nimh.health.gov.lk/" target="_blank" rel="noopener noreferrer">
                  National Mental Health Helpline
                </a>
                <a href="https://www.equal-ground.org/" target="_blank" rel="noopener noreferrer">
                  EQUAL GROUND (LGBTQ+ Support)
                </a>
              </div>
            </div>
            
            <div className="resource-category">
              <h3>📱 Recommended Apps</h3>
              <div className="app-cards">
                <div className="app-card">
                  <h4>Calm</h4>
                  <p>Meditation and sleep stories</p>
                </div>
                <div className="app-card">
                  <h4>Woebot</h4>
                  <p>CBT-based chatbot</p>
                </div>
                <div className="app-card">
                  <h4>Daylio</h4>
                  <p>Mood tracking journal</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'community' && (
          <motion.div 
            className="community-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="share-message">
              <textarea placeholder="Share an uplifting message (anonymous)" />
              <button className="share-button">Share with Community</button>
            </div>
            
            <div className="community-messages">
              <h3>Messages from Our Community</h3>
              <div className="message-grid">
                {communityMessages.map((message, index) => (
                  <motion.div 
                    key={index}
                    className="message-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="message-content">"{message}"</div>
                    <div className="message-meta">Anonymous • Today</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'tools' && (
          <motion.div 
            className="tools-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="breathing-tool">
              <h3>🌬️ Breathing Exercise</h3>
              <div className="breathing-visual">
                <div className="circle">Breathe In</div>
              </div>
              <button className="start-button">Start Calming Exercise</button>
            </div>
            
            <div className="grounding-tool">
              <h3>🌍 5-4-3-2-1 Grounding Technique</h3>
              <div className="grounding-steps">
                <div className="step">
                  <span>5</span>
                  <p>Things you can see</p>
                </div>
                <div className="step">
                  <span>4</span>
                  <p>Things you can touch</p>
                </div>
                <div className="step">
                  <span>3</span>
                  <p>Things you can hear</p>
                </div>
                <div className="step">
                  <span>2</span>
                  <p>Things you can smell</p>
                </div>
                <div className="step">
                  <span>1</span>
                  <p>Thing you can taste</p>
                </div>
              </div>
            </div>
            
            <div className="emergency-resources">
              <h3>🆘 Immediate Help</h3>
              <div className="emergency-contacts">
                <p>National Mental Health Helpline: <strong>1926</strong></p>
                <p>Sumithrayo (Suicide Prevention): Call <strong>117 209 209</strong> to 741741</p>
                <p> EQUAL GROUND (LGBTQ+ Support): <strong>077 247 0041</strong></p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default LightMoments;
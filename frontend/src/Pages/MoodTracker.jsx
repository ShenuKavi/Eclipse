import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './MoodTracker.css';

const moods = [
  { emoji: '😊', label: 'Happy', color: '#FFD700', message: "Your joy lights up the universe!" },
  { emoji: '😌', label: 'Calm', color: '#87CEEB', message: "Peace flows through you like starlight" },
  { emoji: '😐', label: 'Neutral', color: '#A0A0A0', message: "Every moment is a new beginning" },
  { emoji: '😕', label: 'Struggling', color: '#FFA07A', message: "This too shall pass - you're stronger than you know" },
  { emoji: '😞', label: 'Down', color: '#9370DB', message: "Even the darkest night will end and the sun will rise" },
];

const positiveAffirmations = [
  "You are enough just as you are",
  "This feeling is temporary - brighter days are coming",
  "You've survived 100% of your bad days so far",
  "The stars shine brightest on cloudy nights",
  "Your feelings are valid and important",
  "Tomorrow is a fresh start",
  "You are worthy of love and joy",
  "This moment is just a small part of your journey",
  "You have the strength to overcome this",
  "Be gentle with yourself today"
];

const dailyQuotes = [
  "The stars are the land-marks of the universe. - Sir John Frederick William Herschel",
  "We are all in the gutter, but some of us are looking at the stars. - Oscar Wilde",
  "Even the darkest night will end and the sun will rise. - Victor Hugo",
  "The soul should always stand ajar, ready to welcome the ecstatic experience. - Emily Dickinson",
  "Hope is being able to see that there is light despite all of the darkness. - Desmond Tutu",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "The moon is a friend for the lonesome to talk to. - Carl Sandburg"
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [showLight, setShowLight] = useState(false);
  const [moodHistory, setMoodHistory] = useState(() => {
    const saved = localStorage.getItem('moodHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('tracker');
  const [quoteOfTheDay, setQuoteOfTheDay] = useState('');
  const particlesRef = useRef([]);
  
  // Initialize quote of the day
  useEffect(() => {
    const today = new Date().toDateString();
    const savedQuote = localStorage.getItem('dailyQuote');
    const savedDate = localStorage.getItem('quoteDate');
    
    if (savedQuote && savedDate === today) {
      setQuoteOfTheDay(savedQuote);
    } else {
      const randomQuote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
      setQuoteOfTheDay(randomQuote);
      localStorage.setItem('dailyQuote', randomQuote);
      localStorage.setItem('quoteDate', today);
    }
    
    // Create floating particles
    const createParticles = () => {
      particlesRef.current = [];
      const particleCount = 20;
      
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

  // Save mood history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMood) {
      // Add to mood history
      const newEntry = {
        mood: selectedMood,
        note,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().getTime()
      };
      
      setMoodHistory([newEntry, ...moodHistory]);
      
      // Show affirmation and light effect
      const randomAffirmation = positiveAffirmations[
        Math.floor(Math.random() * positiveAffirmations.length)
      ];
      setAffirmation(selectedMood.message + " • " + randomAffirmation);
      setShowLight(true);
      setTimeout(() => {
        setShowLight(false);
        setNote('');
        setSelectedMood(null);
      }, 5000);
    }
  };

  // Calculate mood insights
  const calculateMoodInsights = () => {
    if (moodHistory.length === 0) return null;
    
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const recentMoods = moodHistory.filter(entry => 
      new Date(entry.timestamp) > lastWeek
    );
    
    if (recentMoods.length === 0) return null;
    
    // Count mood frequencies
    const moodCounts = {};
    recentMoods.forEach(entry => {
      const moodLabel = entry.mood.label;
      moodCounts[moodLabel] = (moodCounts[moodLabel] || 0) + 1;
    });
    
    // Find most common mood
    let mostCommonMood = '';
    let maxCount = 0;
    for (const mood in moodCounts) {
      if (moodCounts[mood] > maxCount) {
        mostCommonMood = mood;
        maxCount = moodCounts[mood];
      }
    }
    
    // Calculate positivity trend
    const positiveMoods = ['Happy', 'Calm'];
    const positiveCount = recentMoods.filter(entry => 
      positiveMoods.includes(entry.mood.label)
    ).length;
    
    const positivityPercentage = Math.round((positiveCount / recentMoods.length) * 100);
    
    return {
      mostCommonMood,
      positivityPercentage,
      totalEntries: recentMoods.length
    };
  };
  
  const moodInsights = calculateMoodInsights();

  return (
    <section className="mood-tracker">
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
            animationDuration: `${particle.speed * 10 + 5}s`
          }}
        />
      ))}
      
      <div className="mood-container">
        <motion.h1 
          className="mood-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Mood Tracker <span className="moon-icon">🌙</span>
        </motion.h1>
        
        <div className="navigation-tabs">
          <button 
            className={`tab ${activeTab === 'tracker' ? 'active' : ''}`}
            onClick={() => setActiveTab('tracker')}
          >
            Mood Tracker
          </button>
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
          <button 
            className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
        </div>
        
        {activeTab === 'tracker' && (
          <>
            <motion.p 
              className="mood-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                delay: 0.8,
                duration: 1.5
              }}
            >
              How's your cosmic energy today?
            </motion.p>

            <div className="mood-options">
              {moods.map((mood) => (
                <motion.div
                  key={mood.label}
                  className="mood-option-wrapper"
                  whileHover={{ scale: 1.05 }}
                >
                  <button
                    className={`mood-option ${selectedMood?.label === mood.label ? 'selected' : ''}`}
                    onClick={() => setSelectedMood(mood)}
                    style={{ 
                      backgroundColor: selectedMood?.label === mood.label ? mood.color : 'rgba(255,255,255,0.1)',
                      borderColor: mood.color,
                      boxShadow: selectedMood?.label === mood.label ? `0 0 15px ${mood.color}` : 'none'
                    }}
                  >
                    <span className="mood-emoji">{mood.emoji}</span>
                    <span className="mood-label">{mood.label}</span>
                  </button>
                </motion.div>
              ))}
            </div>

            {selectedMood && (
              <motion.form 
                className="mood-note-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <label htmlFor="mood-note">Add a note (optional)</label>
                <textarea
                  id="mood-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's shining or shadowing your day?"
                  rows="3"
                />
                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Release to the Universe
                </motion.button>
              </motion.form>
            )}

            <div className="daily-quote">
              <div className="quote-icon">💫</div>
              <p className="quote-text">{quoteOfTheDay}</p>
            </div>
          </>
        )}
        
        {activeTab === 'history' && (
          <div className="history-section">
            <h3 className="section-title">Your Mood History</h3>
            
            {moodHistory.length === 0 ? (
              <p className="empty-state">No mood entries yet. Track your first mood!</p>
            ) : (
              <div className="history-items">
                {moodHistory.map((entry, index) => (
                  <motion.div 
                    key={index}
                    className="history-item"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div 
                      className="mood-indicator" 
                      style={{ backgroundColor: entry.mood.color }}
                    >
                      {entry.mood.emoji}
                    </div>
                    <div className="entry-details">
                      <div className="entry-date">{entry.date} at {entry.time}</div>
                      <div className="entry-mood">{entry.mood.label}</div>
                      {entry.note && <div className="entry-note">"{entry.note}"</div>}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'insights' && (
          <div className="insights-section">
            <h3 className="section-title">Your Mood Insights</h3>
            
            {!moodInsights ? (
              <p className="empty-state">Track more moods to see insights</p>
            ) : (
              <div className="insights-grid">
                <div className="insight-card">
                  <div className="insight-value">{moodInsights.totalEntries}</div>
                  <div className="insight-label">Moods Tracked This Week</div>
                </div>
                
                <div className="insight-card">
                  <div className="insight-value">{moodInsights.mostCommonMood}</div>
                  <div className="insight-label">Most Common Mood</div>
                </div>
                
                <div className="insight-card">
                  <div className="insight-value">{moodInsights.positivityPercentage}%</div>
                  <div className="insight-label">Positive Days</div>
                </div>
              </div>
            )}
            
            <div className="insights-graph">
              <h4>Weekly Mood Distribution</h4>
              <div className="graph-bars">
                {moods.map(mood => {
                  const moodCount = moodHistory.filter(entry => 
                    entry.mood.label === mood.label
                  ).length;
                  
                  const maxHeight = 150;
                  const height = moodCount > 0 ? Math.max(30, (moodCount / moodHistory.length) * maxHeight) : 0;
                  
                  return (
                    <div key={mood.label} className="bar-container">
                      <div 
                        className="mood-bar" 
                        style={{ 
                          height: `${height}px`,
                          backgroundColor: mood.color
                        }}
                      >
                        <span className="bar-count">{moodCount}</span>
                      </div>
                      <div className="bar-label">{mood.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {showLight && (
          <motion.div 
            className="light-effect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="light-stars"></div>
            <div className="light-affirmation">{affirmation}</div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
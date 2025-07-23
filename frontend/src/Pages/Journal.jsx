import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Journal.css';

const Journal = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '😊',
    date: new Date().toISOString().split('T')[0]
  });
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleMoodChange = (mood) => {
    setNewEntry({ ...newEntry, mood });
  };

  const handleSaveEntry = () => {
    if (newEntry.title.trim() === '' || newEntry.content.trim() === '') return;
    
    const newJournalEntry = {
      id: Date.now(),
      ...newEntry,
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setEntries([newJournalEntry, ...entries]);
    setNewEntry({
      title: '',
      content: '',
      mood: '😊',
      date: new Date().toISOString().split('T')[0]
    });
    setIsWriting(false);
    setShowForm(false);
    setTimeout(() => setShowForm(true), 10);
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
    if (selectedEntry?.id === id) setSelectedEntry(null);
  };

  const moodOptions = [
    { emoji: '😊', label: 'Hopeful' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Reflective' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😠', label: 'Frustrated' },
    { emoji: '🤯', label: 'Overwhelmed' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '🤩', label: 'Inspired' }
  ];

  return (
    <div className="journal-container">
      <motion.div 
        className="journal-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Shadow to Light <span className="transition-icon">🌑</span></h1>
        <p>Document your journey from darkness to illumination</p>
      </motion.div>

      <div className="journal-content">
        <div className="journal-sidebar">
          <motion.div
            className="new-entry-card"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsWriting(true)}
          >
            <div className="add-icon">+</div>
            <h3>New Reflection</h3>
            <p>Capture your thoughts on your journey</p>
          </motion.div>

          <div className="entries-list">
            <h3>Your Reflections</h3>
            {entries.length === 0 ? (
              <p className="empty-state">No entries yet. Start your journey!</p>
            ) : (
              <div className="scroll-container">
                {entries.map(entry => (
                  <motion.div
                    key={entry.id}
                    className={`entry-preview ${selectedEntry?.id === entry.id ? 'selected' : ''}`}
                    onClick={() => setSelectedEntry(entry)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ backgroundColor: 'rgba(130, 97, 194, 0.15)' }}
                  >
                    <div className="preview-content">
                      <span className="preview-mood">{entry.mood}</span>
                      {entry.title || entry.content.substring(0, 60)}
                      {entry.content.length > 60 ? '...' : ''}
                    </div>
                    <div className="preview-date">
                      {entry.date} <span>• {entry.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="journal-main">
          {(isWriting || selectedEntry) ? (
            <motion.div 
              className="entry-detail"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {isWriting ? (
                <motion.div 
                  className={`journal-form-container ${showForm ? 'visible' : 'hidden'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="form-header">
                    <h3>New Reflection</h3>
                    <div className="form-decor">
                      <div className="decor-circle"></div>
                      <div className="decor-circle"></div>
                      <div className="decor-circle"></div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="title">
                      <i className="icon fas fa-pen"></i> Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newEntry.title}
                      onChange={handleInputChange}
                      placeholder="What's on your mind?"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <i className="icon fas fa-smile"></i> Current Mood
                    </label>
                    <div className="mood-selector">
                      {moodOptions.map((mood) => (
                        <button
                          key={mood.emoji}
                          type="button"
                          className={`mood-btn ${newEntry.mood === mood.emoji ? 'selected' : ''}`}
                          onClick={() => handleMoodChange(mood.emoji)}
                          aria-label={mood.label}
                        >
                          {mood.emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="content">
                      <i className="icon fas fa-stars"></i> Your Thoughts
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={newEntry.content}
                      onChange={handleInputChange}
                      placeholder="Express your thoughts freely..."
                      className="form-textarea"
                      rows="3"
                    />
                  </div>
                  
                  <div className="entry-actions">
                    <motion.button
                      className="save-btn"
                      onClick={handleSaveEntry}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                    >
                      <i className="fas fa-save"></i> Save Reflection
                    </motion.button>
                    <button 
                      className="cancel-btn"
                      onClick={() => {
                        setIsWriting(false);
                        setNewEntry({
                          title: '',
                          content: '',
                          mood: '😊',
                          date: new Date().toISOString().split('T')[0]
                        });
                      }}
                    >
                      <i className="fas fa-times"></i> Cancel
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="entry-header">
                    <div>
                      <h3>{selectedEntry.title}</h3>
                      <span>{selectedEntry.date} • {selectedEntry.time}</span>
                    </div>
                    <div className="entry-mood">{selectedEntry.mood}</div>
                  </div>
                  <div className="entry-content">
                    {selectedEntry.content}
                  </div>
                  <div className="entry-actions">
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteEntry(selectedEntry.id)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div 
              className="welcome-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="book-svg">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="coverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1a1342" />
                      <stop offset="100%" stopColor="#8261c2" />
                    </linearGradient>
                    <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f8bfa4" />
                      <stop offset="100%" stopColor="#f8f8f8" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="glow" />
                      <feBlend in="SourceGraphic" in2="glow" mode="screen" />
                    </filter>
                  </defs>
                  
                  {/* Book Spine */}
                  <motion.path 
                    d="M65,30 L65,170 C65,170 70,175 100,175 L135,175 C160,175 170,165 170,150 L170,50 C170,35 160,25 135,25 L100,25 C70,25 65,30 65,30 Z" 
                    fill="url(#coverGradient)"
                    stroke="#f8bfa4"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  
                  {/* Pages with subtle curve */}
                  <motion.path 
                    d="M70,35 C60,45 60,155 70,165 L130,165 C140,155 140,45 130,35 Z" 
                    fill="url(#pageGradient)"
                    stroke="#d1c4e9"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                  
                  {/* Front Cover with depth */}
                  <motion.path 
                    d="M70,35 L130,35 C140,45 140,155 130,165 L70,165 C60,155 60,45 70,35 Z" 
                    fill="url(#coverGradient)"
                    stroke="#f8bfa4"
                    strokeWidth="1"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                  
                  {/* Page lines */}
                  <motion.path 
                    d="M85,40 L125,40" 
                    stroke="#d1c4e9"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  />
                  <motion.path 
                    d="M85,50 L125,50" 
                    stroke="#d1c4e9"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                  />
                  <motion.path 
                    d="M85,60 L125,60" 
                    stroke="#d1c4e9"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                  />
                  <motion.path 
                    d="M85,70 L125,70" 
                    stroke="#d1c4e9"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                  />
                  
                  {/* Glowing light effect */}
                  <motion.circle 
                    cx="100" 
                    cy="100" 
                    r="40" 
                    fill="none" 
                    stroke="#f8bfa4" 
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 2, delay: 2.2 }}
                  />
                  
                  {/* Sparkle elements */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                  >
                    <path 
                      d="M90,85 L95,90 L100,85 L95,80 Z" 
                      fill="#f8bfa4" 
                      transform="rotate(45,95,85)"
                    />
                    <path 
                      d="M110,120 L115,125 L120,120 L115,115 Z" 
                      fill="#8261c2" 
                      transform="rotate(45,115,120)"
                    />
                    <circle cx="130" cy="70" r="2" fill="#f8bfa4" />
                  </motion.g>
                </svg>
              </div>
              <h2>Welcome to Shadow to Light</h2>
              <p>This is your private sanctuary to document your journey from darkness to illumination.</p>
              <p>Every thought you capture brings you closer to understanding your path through the shadows.</p>
              <div className="quote">
                "Out of the darkness, into the light. Your journey matters, one reflection at a time."
              </div>
              <motion.button
                className="start-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWriting(true)}
              >
                <i className="fas fa-plus"></i> Begin Your Reflection
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="particle particle-1"></div>
      <div className="particle particle-2"></div>
      <div className="particle particle-3"></div>
      <div className="particle particle-4"></div>
      <div className="particle particle-5"></div>
    </div>
  );
};

export default Journal;
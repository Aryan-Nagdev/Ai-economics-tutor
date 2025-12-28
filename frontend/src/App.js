import React, { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Video, Brain, Sparkles, MessageCircle, Info, Lightbulb, X, Menu, ChevronDown } from 'lucide-react';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'teacher',
      text: 'Hello! 👋 I\'m your AI Economics tutor specializing in Oligopoly. I can help you understand concepts, prepare for exams, and answer any questions about this market structure. What would you like to learn about today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [examTips, setExamTips] = useState([]);
  const [showTips, setShowTips] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  // Load exam tips
  useEffect(() => {
    fetch(`${API_URL}/exam-tips`)
      .then(res => res.json())
      .then(data => setExamTips(data.tips || []))
      .catch(err => console.error('Error loading exam tips:', err));
  }, []);

  const askQuestion = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'student', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });

      const data = await response.json();
      const teacherMessage = { 
        role: 'teacher', 
        text: data.answer || 'Sorry, I couldn\'t generate a response. Please try again.' 
      };
      
      setMessages(prev => [...prev, teacherMessage]);
    } catch (error) {
      console.error('Error asking question:', error);
      setMessages(prev => [...prev, {
        role: 'teacher',
        text: '❌ Sorry, I\'m having trouble connecting to the server. Please make sure the backend is running on port 5000.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  const suggestedQuestions = [
    "What is oligopoly?",
    "Explain the kinked demand curve",
    "What are concentration ratios?",
    "Advantages and disadvantages of oligopoly",
    "How does collusion work?",
    "Give me exam tips for oligopoly"
  ];

  const handleSuggestion = (question) => {
    setInput(question);
    textareaRef.current?.focus();
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="menu-btn"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Menu size={24} />
            </button>
            <div className="logo">
              <Brain className="logo-icon" />
              <div>
                <h1>AI Economics Tutor</h1>
                <p>Oligopoly Study Assistant</p>
              </div>
            </div>
          </div>
          <div className="header-right">
            <button 
              className="tips-btn"
              onClick={() => setShowTips(!showTips)}
            >
              <Lightbulb size={20} />
              Exam Tips
            </button>
          </div>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${showSidebar ? 'show' : ''}`}>
          <div className="sidebar-header">
            <h3><BookOpen size={20} /> Study Resources</h3>
            <button onClick={() => setShowSidebar(false)} className="close-btn">
              <X size={20} />
            </button>
          </div>

          <div className="sidebar-section">
            <h4><Sparkles size={16} /> Quick Questions</h4>
            <div className="suggestion-list">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  className="suggestion-item"
                  onClick={() => {
                    handleSuggestion(q);
                    setShowSidebar(false);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h4><Video size={16} /> Video Lectures</h4>
            <div className="video-links">
              <a 
                href="https://youtu.be/Ec19ljjvlCI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="video-link"
              >
                📺 Oligopoly Overview
              </a>
              <a 
                href="https://www.youtube.com/watch?v=Z_S0VA4jKes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="video-link"
              >
                📺 Kinked Demand Curve
              </a>
            </div>
          </div>

          <div className="sidebar-section">
            <h4><Info size={16} /> Key Concepts</h4>
            <div className="concepts-list">
              <div className="concept-tag">Concentration Ratios</div>
              <div className="concept-tag">Interdependence</div>
              <div className="concept-tag">Price Rigidity</div>
              <div className="concept-tag">Collusion</div>
              <div className="concept-tag">Non-Price Competition</div>
              <div className="concept-tag">Cartels</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Exam Tips Panel */}
          {showTips && (
            <div className="tips-panel">
              <div className="tips-header">
                <h3><Lightbulb size={20} /> Exam Success Tips</h3>
                <button onClick={() => setShowTips(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="tips-content">
                {examTips.map((tip, idx) => (
                  <div key={idx} className="tip-item">
                    <span className="tip-number">{idx + 1}</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat Container */}
          <div className="chat-container">
            <div className="messages-wrapper">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role}`}>
                  <div className="message-avatar">
                    {msg.role === 'teacher' ? (
                      <Brain size={24} />
                    ) : (
                      <MessageCircle size={24} />
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      {msg.role === 'teacher' ? 'AI Tutor' : 'You'}
                    </div>
                    <div className="message-text">
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message teacher">
                  <div className="message-avatar">
                    <Brain size={24} />
                  </div>
                  <div className="message-content">
                    <div className="message-header">AI Tutor</div>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="input-container">
              {messages.length === 1 && (
                <div className="suggestions-row">
                  {suggestedQuestions.slice(0, 3).map((q, idx) => (
                    <button
                      key={idx}
                      className="suggestion-chip"
                      onClick={() => handleSuggestion(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div className="input-wrapper">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about oligopoly... (Press Enter to send)"
                  rows="1"
                  disabled={loading}
                />
                <button
                  onClick={askQuestion}
                  disabled={!input.trim() || loading}
                  className="send-btn"
                >
                  <Send size={20} />
                </button>
              </div>

              <p className="input-hint">
                💡 Try asking about definitions, examples, exam tips, or specific concepts
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
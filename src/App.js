import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Mic,
  MicOff,
  Send,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  BrainCircuit,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:5001/api';

// --- Sub-components moved OUTSIDE to prevent focus loss ---

const Landing = ({ setView }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="container"
    style={{ textAlign: 'center', paddingTop: '10vh' }}
  >
    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', marginBottom: '24px' }}>
      <BrainCircuit size={48} color="var(--primary)" />
    </div>
    <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '16px', fontWeight: '800' }}>
      Master Your Next <br /> Tech Interview
    </h1>
    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
      AI-powered interview simulation designed to give you real-time feedback,
      polish your answers, and suggest the best career paths for you.
    </p>
    <button className="btn-primary" style={{ margin: '0 auto', padding: '16px 40px', fontSize: '1.1rem' }} onClick={() => setView('profile')}>
      Start Interview Prep <ChevronRight size={20} />
    </button>
  </motion.div>
);

const ProfileForm = ({ profile, setProfile, handleProfileSubmit, loading, setView }) => (
  <div className="container" style={{ maxWidth: '800px' }}>
    <button className="btn-secondary" onClick={() => setView('landing')} style={{ marginBottom: '32px' }}>
      <ArrowLeft size={18} /> Back
    </button>
    <div className="glass-card" style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '32px', fontSize: '2rem' }}>Tell us about the target role</h2>
      <form onSubmit={handleProfileSubmit}>
        <div className="input-group">
          <label><Briefcase size={16} inline /> Target Job Position</label>
          <input
            className="input-field"
            placeholder="e.g. Senior Frontend Developer"
            required
            value={profile.position}
            onChange={(e) => setProfile({ ...profile, position: e.target.value })}
          />
        </div>

        <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="input-group">
            <label><User size={16} inline /> Personal Details</label>
            <textarea
              className="input-field"
              rows="4"
              placeholder="Tell us a bit about yourself..."
              value={profile.personalDetails}
              onChange={(e) => setProfile({ ...profile, personalDetails: e.target.value })}
            ></textarea>
          </div>
          <div className="input-group">
            <label><GraduationCap size={16} inline /> Education</label>
            <textarea
              className="input-field"
              rows="4"
              placeholder="Degree, University, Certifications..."
              value={profile.education}
              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
            ></textarea>
          </div>
        </div>

        <div className="input-group">
          <label><FolderGit2 size={16} inline /> Relevant Experience & Projects</label>
          <textarea
            className="input-field"
            rows="5"
            placeholder="List your key roles and projects..."
            value={profile.experience}
            onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
          ></textarea>
        </div>

        <div className="input-group">
          <label><Lightbulb size={16} inline /> Why do you want to apply?</label>
          <textarea
            className="input-field"
            rows="3"
            placeholder="Your motivation..."
            value={profile.applicationReason}
            onChange={(e) => setProfile({ ...profile, applicationReason: e.target.value })}
          ></textarea>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '20px' }} disabled={loading}>
          {loading ? 'AI Analyzing Profile...' : 'Generate Interview Questions'}
        </button>
      </form>
    </div>
  </div>
);

const InterviewRoom = ({ questions, currentQuestionIndex, isListening, toggleListening, transcript, submitAnswer, loading }) => (
  <div className="container" style={{ maxWidth: '800px' }}>
    <div className="glass-card" style={{ padding: '40px', position: 'relative', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-muted)' }}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '24px', borderRadius: '50%', marginBottom: '32px' }}>
          <motion.div animate={{ scale: isListening ? [1, 1.2, 1] : 1 }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <BrainCircuit size={64} color="var(--primary)" />
          </motion.div>
        </div>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '40px', color: 'white' }}>
          {questions[currentQuestionIndex]}
        </h2>

        <div style={{ width: '100%', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', marginBottom: '32px', minHeight: '120px', border: '1px dashed var(--glass-border)' }}>
          <p style={{ color: transcript ? 'white' : 'var(--text-muted)', fontStyle: transcript ? 'normal' : 'italic' }}>
            {transcript || 'Your answer will appear here as you speak...'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            className={`btn-secondary ${isListening ? 'listening' : ''}`}
            onClick={toggleListening}
            style={{ padding: '16px 32px', borderColor: isListening ? 'var(--secondary)' : 'var(--glass-border)' }}
          >
            {isListening ? <><MicOff size={20} /> Stop Recording</> : <><Mic size={20} /> Use Microphone</>}
          </button>
          <button
            className="btn-primary"
            onClick={submitAnswer}
            disabled={loading || !transcript.trim()}
            style={{ padding: '16px 32px' }}
          >
            {loading ? 'Analyzing...' : <><Send size={20} /> Submit Answer</>}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Results = ({ feedbacks, suggestions }) => (
  <div className="container" style={{ maxWidth: '1000px' }}>
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Interview Feedback</h1>
      <p style={{ color: 'var(--text-muted)' }}>Here's how you performed and where you can improve.</p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
      {feedbacks.map((f, i) => (
        <div key={i} className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--primary)' }}>Question {i + 1}: {f.question}</h3>
            <div style={{ background: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>
              Score: {f.score}/10
            </div>
          </div>

          <div style={{ padding: '20px', background: 'rgba(0,0,0,0.1)', borderRadius: '12px', marginBottom: '20px' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Your Answer:</p>
            <p>{f.answer}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '12px' }}>
                <CheckCircle2 size={18} /> Feedback
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{f.feedback}</p>
            </div>
            <div>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', marginBottom: '12px' }}>
                <AlertCircle size={18} /> Improvement
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{f.suggestions}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div style={{ marginTop: '48px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>AI Career Suggestions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {suggestions.map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '24px', borderTop: '4px solid var(--accent)' }}>
            <h3 style={{ marginBottom: '12px' }}>{s.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.reason}</p>
          </div>
        ))}
      </div>
    </div>

    <div style={{ marginTop: '48px', textAlign: 'center' }}>
      <button className="btn-primary" onClick={() => window.location.reload()}>
        Try Another Session
      </button>
    </div>
  </div>
);

function App() {
  const [view, setView] = useState('landing'); // landing, profile, interview, results
  const [profile, setProfile] = useState({
    position: '',
    personalDetails: '',
    experience: '',
    education: '',
    projects: '',
    applicationReason: ''
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Web Speech API
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting profile to:", `${API_BASE_URL}/analyze-profile`);
    try {
      const resp = await axios.post(`${API_BASE_URL}/analyze-profile`, profile);
      setQuestions(resp.data.questions);
      setView('interview');
    } catch (err) {
      console.error("Frontend Error Details:", err);
      const msg = err.response?.data?.error || err.message;
      alert(`Connection Error: ${msg}\n\nPlease check the browser console and server logs for more details.`);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    try {
      const resp = await axios.post(`${API_BASE_URL}/analyze-answer`, {
        question: questions[currentQuestionIndex],
        answer: transcript,
        profile
      });

      const newFeedback = {
        question: questions[currentQuestionIndex],
        answer: transcript,
        ...resp.data
      };

      setFeedbacks([...feedbacks, newFeedback]);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTranscript('');
      } else {
        fetchCareerSuggestions();
        setView('results');
      }
    } catch (err) {
      console.error("Answer Analysis Error:", err);
      const msg = err.response?.data?.error || err.message;
      alert(`Analysis Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCareerSuggestions = async () => {
    try {
      const resp = await axios.post(`${API_BASE_URL}/suggest-occupations`, profile);
      setSuggestions(resp.data.suggestions);
    } catch (err) {
      console.error("Error fetching suggestions");
    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <Landing key="landing" setView={setView} />
        )}
        {view === 'profile' && (
          <ProfileForm
            key="profile"
            profile={profile}
            setProfile={setProfile}
            handleProfileSubmit={handleProfileSubmit}
            loading={loading}
            setView={setView}
          />
        )}
        {view === 'interview' && (
          <InterviewRoom
            key="interview"
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            isListening={isListening}
            toggleListening={toggleListening}
            transcript={transcript}
            submitAnswer={submitAnswer}
            loading={loading}
          />
        )}
        {view === 'results' && (
          <Results
            key="results"
            feedbacks={feedbacks}
            suggestions={suggestions}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

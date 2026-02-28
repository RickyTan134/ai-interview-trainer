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
  Lightbulb,
  Building2,
  Trophy,
  Wrench,
  Terminal,
  Smile,
  Hash,
  Sparkles,
  BarChart3,
  Target,
  Mail,
  ShieldCheck,
  UploadCloud,
  FileText,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = 'http://localhost:5001/api';

const Landing = ({ setView }) => {
  const features = [
    {
      icon: <Sparkles size={32} color="var(--primary)" />,
      title: "AI Simulation",
      desc: "Practice with our advanced AI that mimics real-world interviewers, adapting to your specific role and company.",
      color: "rgba(99, 102, 241, 0.1)"
    },
    {
      icon: <BarChart3 size={32} color="var(--secondary)" />,
      title: "Smart Feedback",
      desc: "Receive instant, detailed feedback on your answers, including tone analysis, key talking points, and clarity scores.",
      color: "rgba(236, 72, 153, 0.1)"
    },
    {
      icon: <Target size={32} color="var(--accent)" />,
      title: "Career Pathing",
      desc: "Uncover new opportunities with career suggestions based on your performance and background skills.",
      color: "rgba(139, 92, 246, 0.1)"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container"
      style={{ textAlign: 'center', paddingTop: '8vh' }}
    >
      <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', marginBottom: '24px' }}>
        <BrainCircuit size={48} color="var(--primary)" />
      </div>
      <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '16px', fontWeight: '800', lineHeight: 1.1 }}>
        Master Your Next <br /> Tech Interview
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
        AI-powered interview simulation designed to give you real-time feedback,
        polish your answers, and suggest the best career paths for you.
      </p>
      <button className="btn-primary" style={{ margin: '0 auto 80px', padding: '16px 40px', fontSize: '1.1rem' }} onClick={() => setView('profile')}>
        Start Interview Prep <ChevronRight size={20} />
      </button>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="glass-card"
            whileHover={{
              scale: 1.05,
              y: -10,
              backgroundColor: 'rgba(30, 41, 59, 0.9)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              padding: '40px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              cursor: 'default',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              padding: '16px',
              background: feature.color,
              borderRadius: '12px',
              width: 'fit-content'
            }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ProfileForm = ({ profile, setProfile, handleProfileSubmit, loading, setView, handleResumeUpload, resumeLoading }) => (
  <div className="container" style={{ maxWidth: '800px' }}>
    <button className="btn-secondary" onClick={() => setView('landing')} style={{ marginBottom: '32px' }}>
      <ArrowLeft size={18} /> Back
    </button>

    <div className={`glass-card ${!profile.name ? 'upload-pulse' : ''}`} style={{ padding: '40px', marginBottom: '32px', border: '2px dashed var(--primary)', background: 'rgba(99, 102, 241, 0.05)' }}>
      <div style={{ textAlign: 'center' }}>
        <UploadCloud size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
        <h3 style={{ marginBottom: '8px' }}>🚀 Quick Start: Upload Resume</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
          Upload your PDF or DOCX to automatically fill your details.
        </p>
        <button
          className="btn-secondary"
          style={{ margin: '0 auto', position: 'relative', overflow: 'hidden' }}
          disabled={resumeLoading}
        >
          {resumeLoading ? (
            <><Loader2 size={18} className="animate-spin" /> Analyzing Resume...</>
          ) : (
            <><FileText size={18} /> {profile.name ? 'Change Resume' : 'Choose Resume File'}</>
          )}
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleResumeUpload}
            style={{ position: 'absolute', top: 0, left: 0, opacity: 0, cursor: 'pointer', height: '100%', width: '100%' }}
          />
        </button>
      </div>
    </div>
    <div className="glass-card" style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '32px', fontSize: '2rem' }}>Tell us about the target role</h2>
      <form onSubmit={handleProfileSubmit}>
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div className="input-group">
            <label><Briefcase size={16} /> Target Job Position</label>
            <input
              className="input-field"
              placeholder="e.g. Senior Frontend Developer"
              required
              value={profile.position}
              onChange={(e) => setProfile({ ...profile, position: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label><Building2 size={16} /> Desired Company</label>
            <input
              className="input-field"
              placeholder="e.g. Google, OpenAI, etc."
              required
              value={profile.desiredCompany}
              onChange={(e) => setProfile({ ...profile, desiredCompany: e.target.value })}
            />
          </div>
        </div>

        <h3 style={{ margin: '32px 0 16px', color: 'var(--primary)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>Personal Details</h3>
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 120px 180px', gap: '24px' }}>
          <div className="input-group">
            <label><User size={16} /> Full Name</label>
            <input
              className="input-field"
              placeholder="Your Name"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label><Hash size={16} /> Age</label>
            <input
              type="number"
              className="input-field"
              placeholder="25"
              required
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label><Smile size={16} /> Gender</label>
            <select
              className="input-field"
              style={{ padding: '0 12px', height: '54px', appearance: 'none', background: 'rgba(15, 23, 42, 0.5)' }}
              required
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            >
              <option value="" disabled>Select</option>
              <option value="Male" style={{ background: '#1e293b' }}>Male</option>
              <option value="Female" style={{ background: '#1e293b' }}>Female</option>
              <option value="Other" style={{ background: '#1e293b' }}>Other / N/A</option>
            </select>
          </div>
        </div>

        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '24px' }}>
          <div className="input-group">
            <label><GraduationCap size={16} /> Education</label>
            <textarea
              className="input-field"
              rows="4"
              placeholder="Degree, University, Graduation Year..."
              value={profile.education}
              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
            ></textarea>
          </div>
          <div className="input-group">
            <label><Wrench size={16} /> Skills / Stack</label>
            <textarea
              className="input-field"
              rows="4"
              placeholder="Languages, frameworks, tools..."
              value={profile.skills}
              onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
            ></textarea>
          </div>
        </div>

        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div className="input-group">
            <label><Briefcase size={16} /> Professional Experience</label>
            <textarea
              className="input-field"
              rows="4"
              placeholder="Previous roles, companies, key achievements..."
              value={profile.experience}
              onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
            ></textarea>
          </div>
          <div className="input-group">
            <label><FolderGit2 size={16} /> Key Projects</label>
            <textarea
              className="input-field"
              rows="4"
              placeholder="Describe your relevant projects..."
              value={profile.projects}
              onChange={(e) => setProfile({ ...profile, projects: e.target.value })}
            ></textarea>
          </div>
        </div>

        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div className="input-group">
            <label><Trophy size={16} /> Honors / Awards</label>
            <textarea
              className="input-field"
              rows="3"
              placeholder="Honors, awards, or certifications..."
              value={profile.honorsAwards}
              onChange={(e) => setProfile({ ...profile, honorsAwards: e.target.value })}
            ></textarea>
          </div>
          <div className="input-group">
            <label><Lightbulb size={16} /> Why do you want to apply?</label>
            <textarea
              className="input-field"
              rows="3"
              placeholder="Your motivation and interest in the role..."
              value={profile.applicationReason}
              onChange={(e) => setProfile({ ...profile, applicationReason: e.target.value })}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '32px', height: '56px', fontSize: '1.1rem' }} disabled={loading}>
          {loading ? 'AI Analyzing Profile...' : 'Generate Personalized Interview Questions'}
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

const Results = ({ feedbacks, suggestions, profile }) => (
  <div className="container" style={{ maxWidth: '1000px' }}>
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Interview Feedback</h1>
      <p style={{ color: 'var(--text-muted)' }}>Analysis for <strong>{profile.name}</strong> • {profile.position} at {profile.desiredCompany}</p>
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

const Footer = () => (
  <footer style={{
    borderTop: '1px solid var(--glass-border)',
    padding: '60px 0 40px',
    marginTop: '100px',
    background: 'rgba(15, 23, 42, 0.5)',
    backdropFilter: 'blur(10px)'
  }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BrainCircuit size={24} color="var(--primary)" />
          <span style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.5px' }}>AI Interview Trainer</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          Empowering future tech leaders with AI-driven interview preparation and career insights.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h4 style={{ color: 'white' }}>Quick Links</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.3s' }}>Start Session</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.3s' }}>Demo Video</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.3s' }}>Pricing</a>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h4 style={{ color: 'white' }}>Support & Legal</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            <Mail size={16} /> contact@ai-interview.io
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            <ShieldCheck size={16} /> Privacy Policy
          </div>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Terms of Service</a>
        </div>
      </div>
    </div>
    <div className="container" style={{ textAlign: 'center', marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} AI Interview Trainer. All rights reserved.
      </p>
    </div>
  </footer>
);

function App() {
  const [view, setView] = useState('landing'); // landing, profile, interview, results
  const [profile, setProfile] = useState({
    position: '',
    desiredCompany: '',
    name: '',
    age: '',
    gender: '',
    experience: '',
    education: '',
    projects: '',
    honorsAwards: '',
    skills: '',
    applicationReason: ''
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Web Speech API
  const recognitionRef = useRef(null);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeLoading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const resp = await axios.post(`${API_BASE_URL}/extract-resume`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Update profile with extracted data, keeping position/company/reason if already filled
      setProfile(prev => ({
        ...prev,
        ...resp.data
      }));

      // Success alert or subtle notification could go here
    } catch (err) {
      console.error("Resume Upload Error:", err);
      alert("Failed to parse resume. Please try a different file.");
    } finally {
      setResumeLoading(false);
    }
  };

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
            handleResumeUpload={handleResumeUpload}
            resumeLoading={resumeLoading}
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
            profile={profile}
          />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;

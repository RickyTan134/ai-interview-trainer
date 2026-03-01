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
  Loader2,
  Timer,
  Award,
  TrendingUp,
  LineChart
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

const InterviewInstructions = ({ onStart }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="container"
    style={{ maxWidth: '700px', textAlign: 'center' }}
  >
    <div className="glass-card" style={{ padding: '60px 40px' }}>
      <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '24px', borderRadius: '50%', width: 'fit-content', margin: '0 auto 32px' }}>
        <Lightbulb size={48} color="var(--primary)" />
      </div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Interview Guidelines</h2>
      <div style={{ textAlign: 'left', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ background: 'var(--primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>1</div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}><strong>15 Seconds Reading Time:</strong> For each question, you get 15 seconds to prepare before the recording automatically starts.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ background: 'var(--primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>2</div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}><strong>3 Minutes to Answer:</strong> Once recording starts, you have up to 3 minutes to provide your response. Recording will stop automatically at the limit.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ background: 'var(--primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>3</div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}><strong>Finalize & Review:</strong> Once recording stops or the timer reaches zero, your answer is locked and cannot be edited further.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ background: 'var(--primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>4</div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}><strong>One Chance:</strong> Once you stop the recording or it times out, you cannot record again for that question.</p>
        </div>
      </div>
      <button className="btn-primary" style={{ width: '100%', height: '56px', fontSize: '1.1rem' }} onClick={onStart}>
        I'm Ready, Start Interview <ChevronRight size={20} />
      </button>
    </div>
  </motion.div>
);

const InterviewRoom = ({ questions, currentQuestionIndex, isListening, toggleListening, transcript, setTranscript, submitAnswer, loading, timer, isReading, readingTimer, hasFinishedRecording }) => (
  <div className="container" style={{ maxWidth: '800px' }}>
    <div className="glass-card" style={{ padding: '40px', position: 'relative', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ color: 'var(--text-muted)' }}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        {isReading ? (
          <div style={{
            color: '#f59e0b',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '1rem'
          }}>
            Recording in {readingTimer}s...
          </div>
        ) : (
          <div style={{
            color: timer <= 10 ? '#ef4444' : 'var(--primary)',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99, 102, 241, 0.1)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '1.1rem'
          }}>
            <Timer size={18} /> {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        {!isReading && (
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '24px', borderRadius: '50%', marginBottom: '24px' }}>
            <motion.div animate={{ scale: isListening ? [1, 1.2, 1] : 1 }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <BrainCircuit size={48} color="var(--primary)" />
            </motion.div>
          </div>
        )}

        <h2 style={{ fontSize: '1.6rem', marginBottom: '32px', color: 'white', lineHeight: '1.4' }}>
          {questions[currentQuestionIndex]}
        </h2>

        {!isReading ? (
          <div style={{ width: '100%', marginBottom: '24px' }}>
            <textarea
              className="input-field"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              readOnly={hasFinishedRecording || isListening}
              placeholder={isListening ? "Listening to your answer..." : hasFinishedRecording ? "Recording finished. Review your answer below." : "Your answer will appear here..."}
              style={{
                width: '100%',
                height: '180px',
                resize: 'none',
                fontSize: '1rem',
                background: hasFinishedRecording ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.2)',
                border: isListening ? '2px solid var(--secondary)' : '1px solid var(--glass-border)',
                transition: 'all 0.3s ease',
                cursor: hasFinishedRecording ? 'not-allowed' : 'text',
                color: hasFinishedRecording ? 'var(--text-muted)' : 'white'
              }}
            />
          </div>
        ) : (
          <div style={{ marginBottom: '40px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <p style={{ color: 'var(--text-muted)' }}>Take a moment to prepare your answer.</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px' }}>
          {!isReading && (
            <button
              className={`btn-secondary ${isListening ? 'listening' : ''}`}
              onClick={toggleListening}
              disabled={hasFinishedRecording}
              style={{
                padding: '16px 32px',
                borderColor: isListening ? 'var(--secondary)' : 'var(--glass-border)',
                opacity: hasFinishedRecording ? 0.5 : 1,
                cursor: hasFinishedRecording ? 'not-allowed' : 'pointer'
              }}
            >
              {isListening ? <><MicOff size={20} /> Stop Recording</> : <><Mic size={20} /> {hasFinishedRecording ? 'Recording Finished' : 'Start Recording'}</>}
            </button>
          )}
          <button
            className="btn-primary"
            onClick={submitAnswer}
            disabled={loading || !transcript.trim() || isReading}
            style={{ padding: '16px 32px', opacity: isReading ? 0.5 : 1 }}
          >
            {loading ? 'Analyzing...' : <><Send size={20} /> Submit Answer</>}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Results = ({ feedbacks, suggestions, profile, overallResult }) => (
  <div className="container" style={{ maxWidth: '1000px' }}>
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Performance Analysis</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Analysis for <strong>{profile.name}</strong> • {profile.position}</p>
      </motion.div>
    </div>

    {overallResult && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{
          padding: '40px',
          marginBottom: '48px',
          textAlign: 'center',
          border: '2px solid var(--primary)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px' }}>
            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: overallResult.overallScore / 10 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: '800', fontSize: '1.5rem' }}>
              {overallResult.overallScore}/10
            </div>
          </div>
          <div style={{ textAlign: 'left', flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'white' }}>Overall Verdict</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.5', italic: true }}>
              "{overallResult.summaryComment}"
            </p>
          </div>
        </div>
      </motion.div>
    )}

    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '64px' }}>
      {feedbacks.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass-card"
          style={{ padding: '32px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.4rem' }}>Q{i + 1}: {f.question}</h3>
            <div style={{
              background: f.score >= 7 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
              color: f.score >= 7 ? '#10b981' : '#f59e0b',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: '1px solid currentColor'
            }}>
              Score: {f.score}/10
            </div>
          </div>

          <div style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', marginBottom: '24px', borderLeft: '4px solid var(--glass-border)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Response</p>
            <p style={{ lineHeight: '1.6' }}>{f.answer}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div className="feedback-item">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '12px' }}>
                <CheckCircle2 size={18} /> AI Feedback
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: '1.5' }}>{f.feedback}</p>
            </div>
            <div className="feedback-item">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', marginBottom: '12px' }}>
                <AlertCircle size={18} /> Key Improvements
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: '1.5' }}>{f.suggestions}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div style={{ marginTop: '80px', background: 'rgba(99, 102, 241, 0.05)', padding: '60px 40px', borderRadius: '32px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>AI Career Match <Award style={{ verticalAlign: 'middle', color: 'var(--accent)' }} /></h2>
        <p style={{ color: 'var(--text-muted)' }}>Top 3 recommended paths based on your skills and performance</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {suggestions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="glass-card"
            style={{
              padding: '24px 32px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              borderLeft: i === 0 ? '6px solid #fbbf24' : i === 1 ? '6px solid #94a3b8' : '6px solid #92400e',
              background: 'rgba(30, 41, 59, 0.8)'
            }}
          >
            <div style={{
              fontSize: '2rem',
              fontWeight: '900',
              color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#92400e',
              minWidth: '50px'
            }}>
              #{i + 1}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '1.4rem' }}>{s.title}</h3>
                {i === 0 && <span style={{ background: '#fbbf2422', color: '#fbbf24', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Perfect Match</span>}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{s.reason}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map(dot => (
                  <div key={dot} style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: dot <= (5 - i) ? 'var(--primary)' : 'rgba(255,255,255,0.1)'
                  }} />
                ))}
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>MATCH SCORE</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <div style={{ marginTop: '64px', textAlign: 'center' }}>
      <button className="btn-primary" onClick={() => window.location.reload()} style={{ padding: '16px 48px', fontSize: '1.2rem' }}>
        Start New Session
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
  const [view, setView] = useState('landing'); // landing, profile, instructions, interview, results
  const [profile, setProfile] = useState({
    position: '', desiredCompany: '', name: '', age: '', gender: '', experience: '', education: '', projects: '', honorsAwards: '', skills: '', applicationReason: ''
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [overallResult, setOverallResult] = useState(null);
  const [timer, setTimer] = useState(180);
  const [isReading, setIsReading] = useState(false);
  const [readingTimer, setReadingTimer] = useState(15);
  const [hasFinishedRecording, setHasFinishedRecording] = useState(false);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const readingTimerRef = useRef(null);
  const isActuallyListeningRef = useRef(false);

  // Initialize SpeechRecognition once on mount
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let finalText = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) finalText += event.results[i][0].transcript;
        }
        if (finalText) {
          setTranscript(prev => prev + (prev ? ' ' : '') + finalText.trim());
        }
      };

      recognition.onerror = (e) => {
        console.error("Speech Logic Error:", e.error);
        if (e.error === 'no-speech') return; // Ignore no-speech to keep it alive
        isActuallyListeningRef.current = false;
        setIsListening(false);
      };

      recognition.onend = () => {
        // Restart only if we are supposed to be listening
        if (isActuallyListeningRef.current) {
          try {
            recognition.start();
          } catch (err) {
            console.error("Failed to restart speech:", err);
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Main Interview Timer
  useEffect(() => {
    if (view === 'interview' && isListening && !isReading) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            stopRecording();
            setHasFinishedRecording(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [view, isListening, isReading]);

  // Reading Timer (15s)
  useEffect(() => {
    if (view === 'interview' && isReading) {
      readingTimerRef.current = setInterval(() => {
        setReadingTimer((prev) => {
          if (prev <= 1) {
            clearInterval(readingTimerRef.current);
            setIsReading(false);
            startRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(readingTimerRef.current);
    }
    return () => clearInterval(readingTimerRef.current);
  }, [view, isReading]);

  const startRecording = () => {
    if (recognitionRef.current && !isActuallyListeningRef.current) {
      setTranscript('');
      try {
        isActuallyListeningRef.current = true;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Start Recording Error:", err);
        isActuallyListeningRef.current = false;
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isActuallyListeningRef.current) {
      isActuallyListeningRef.current = false;
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Stop Recording Error:", err);
      }
      setIsListening(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResumeLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const resp = await axios.post(`${API_BASE_URL}/extract-resume`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setProfile(prev => ({ ...prev, ...resp.data }));
    } catch (err) {
      console.error("Resume Upload Error:", err);
      alert("Failed to parse resume.");
    } finally {
      setResumeLoading(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopRecording();
      setHasFinishedRecording(true);
    } else if (!hasFinishedRecording) {
      startRecording();
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post(`${API_BASE_URL}/analyze-profile`, profile);
      setQuestions(resp.data.questions);
      setView('instructions');
    } catch (err) {
      console.error(err);
      alert("Connection Error");
    } finally {
      setLoading(false);
    }
  };

  const startInterview = () => {
    setView('interview');
    setIsReading(true);
    setReadingTimer(15);
    setTimer(180);
    setHasFinishedRecording(false);
  };

  const submitAnswer = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    stopRecording();
    try {
      const resp = await axios.post(`${API_BASE_URL}/analyze-answer`, {
        question: questions[currentQuestionIndex],
        answer: transcript,
        profile
      });
      const newFeedback = { question: questions[currentQuestionIndex], answer: transcript, ...resp.data };
      setFeedbacks([...feedbacks, newFeedback]);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTranscript('');
        setIsReading(true);
        setReadingTimer(15);
        setTimer(180);
        setHasFinishedRecording(false);
      } else {
        const finalFeedbacks = [...feedbacks, newFeedback];
        fetchOverallSummary(finalFeedbacks);
        fetchCareerSuggestions();
        setView('results');
      }
    } catch (err) {
      console.error(err);
      alert("Analysis Error");
    } finally {
      setLoading(false);
    }
  };

  const fetchOverallSummary = async (currentFeedbacks) => {
    try {
      const resp = await axios.post(`${API_BASE_URL}/overall-summary`, {
        feedbacks: currentFeedbacks,
        profile
      });
      setOverallResult(resp.data);
    } catch (err) { console.error("Summary Error:", err); }
  };

  const fetchCareerSuggestions = async () => {
    try {
      const resp = await axios.post(`${API_BASE_URL}/suggest-occupations`, profile);
      setSuggestions(resp.data.suggestions);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {view === 'landing' && <Landing key="landing" setView={setView} />}
        {view === 'profile' && <ProfileForm key="profile" profile={profile} setProfile={setProfile} handleProfileSubmit={handleProfileSubmit} loading={loading} setView={setView} handleResumeUpload={handleResumeUpload} resumeLoading={resumeLoading} />}
        {view === 'instructions' && <InterviewInstructions key="instructions" onStart={startInterview} />}
        {view === 'interview' && (
          <InterviewRoom
            key="interview"
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            isListening={isListening}
            toggleListening={toggleListening}
            transcript={transcript}
            setTranscript={setTranscript}
            submitAnswer={submitAnswer}
            loading={loading}
            timer={timer}
            isReading={isReading}
            readingTimer={readingTimer}
            hasFinishedRecording={hasFinishedRecording}
          />
        )}
        {view === 'results' && <Results key="results" feedbacks={feedbacks} suggestions={suggestions} profile={profile} overallResult={overallResult} />}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;

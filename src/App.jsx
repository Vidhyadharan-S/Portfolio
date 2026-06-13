import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, Code2, Database, Layout } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Chatbot from './components/Chatbot';
import DataBackground from './components/DataBackground';
import ScrambleText from './components/ScrambleText';
import './index.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};



function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [isHoveringText, setIsHoveringText] = useState(false);

  const handleHoverContent = () => {
    setIsHoveringText(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    const accessKey = import.meta.env.VITE_CONTACT_FORM_KEY;

    if (!accessKey) {
      setFormStatus('Error: Contact form key is missing. Please add VITE_CONTACT_FORM_KEY to your .env file.');
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...formData
        })
      });
      const result = await response.json();
      if (result.success) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('Failed to send. Please try again later.');
      }
    } catch (error) {
      setFormStatus('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <DataBackground speedMultiplier={isHoveringText ? 0.35 : 1} />

      <nav className="navbar">
        <a href="#" className="nav-logo"><ScrambleText text="Vidhyadharan" /><span><ScrambleText text=".S" /></span></a>
        <div className="nav-links">
          <ScrambleText href="#about" className="nav-link" text="About" />
          <ScrambleText href="#skills" className="nav-link" text="Skills" />
          <ScrambleText href="#contact" className="nav-link" text="Contact" />
        </div>
      </nav>

      <main className="container">
        {/* Hero Section */}
        <section className="hero">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="hero-greeting">Hi, I'm</motion.span>
            <h1 className="hero-name" onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>Vidhyadharan.S</h1>
            <motion.h2 variants={fadeInUp} className="hero-role" onMouseEnter={() => setIsHoveringText(true)} onMouseLeave={() => setIsHoveringText(false)}>Data Engineer.</motion.h2>
            <motion.p variants={fadeInUp} className="hero-desc" onMouseEnter={handleHoverContent} onMouseLeave={() => setIsHoveringText(false)}>
              I'm a Data Engineer specializing in building scalable data pipelines, optimizing databases, and integrating AI-driven insights. I'm passionate about organizing raw data into meaningful and accessible architectures.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a href="#contact" className="btn-primary">
                <Mail size={20} />
                Get In Touch
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>About Me</h2>
            <div className="about-text-container">
              <p className="about-text">
                I am a passionate Data Engineer with a strong focus on building scalable data pipelines and optimizing databases. My expertise spans across SQL, Linux environments, and integrating AI-driven insights into everyday data workflows. I thrive on transforming complex, raw data into meaningful architectures that drive business value.
              </p>
              <p className="about-text">
                With a background in building robust backend systems, I am dedicated to continuous learning and implementing the latest AI prompting techniques to enhance data processing capabilities.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Expertise
          </motion.h2>

          <motion.div
            className="skills-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Technical Skills */}
            <motion.div className="skill-card" variants={fadeInUp}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <Database color="var(--accent-color)" size={28} />
                <h3 className="skill-category" style={{ marginBottom: 0, border: 'none' }}>Technical Skills</h3>
              </div>

              <SkillBar name="SQL" level="90%" label="Advanced" />
              <SkillBar name="Linux Basic" level="75%" label="Intermediate" />
              <SkillBar name="AI Prompting" level="85%" label="Advanced" />
              <SkillBar name="HTML & CSS" level="90%" label="Advanced" />
            </motion.div>

            {/* Languages */}
            <motion.div className="skill-card" variants={fadeInUp}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <Layout color="var(--accent-color)" size={28} />
                <h3 className="skill-category" style={{ marginBottom: 0, border: 'none' }}>Languages</h3>
              </div>

              <SkillBar name="English" level="90%" label="Fluent" />
              <SkillBar name="Tamil" level="95%" label="Native" />
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Get In Touch</h2>
            <p className="contact-text">
              Have a question or want to work together? Leave a message below!<br />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Or reach out directly: +91 9994791340 | senthilkumarvidhya@gmail.com</span>
            </p>

            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="form-textarea"
                  placeholder="Your Message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary submit-btn">
                <Mail size={20} />
                Send Message
              </button>
              {formStatus && (
                <div className={`form-status ${formStatus.includes('success') ? 'success' : formStatus.includes('Sending') ? '' : 'error'}`}>
                  {formStatus}
                </div>
              )}
            </form>            <div className="contact-links">
              <a href="https://github.com/Vidhyadharan-S" target="_blank" rel="noreferrer" className="social-icon"><FaGithub size={24} /></a>
              <a href="https://www.linkedin.com/in/vidhyadharan-s" target="_blank" rel="noreferrer" className="social-icon"><FaLinkedin size={24} /></a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Vidhyadharan.S. All rights reserved.</p>
      </footer>

      <Chatbot />
    </>
  );
}

function SkillBar({ name, level, label }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-level-text">{label}</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: level }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        ></motion.div>
      </div>
    </div>
  );
}


export default App;

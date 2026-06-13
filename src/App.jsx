import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, Code2, Database, Layout } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
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
  return (
    <>
      <div className="bg-animation">
        <div className="glow-orb"></div>
        <div className="glow-orb"></div>
      </div>

      <nav className="navbar">
        <a href="#" className="nav-logo">Vidhyadharan<span>.S</span></a>
        <div className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
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
            <motion.span variants={fadeInUp} className="hero-greeting">Hi, my name is</motion.span>
            <motion.h1 variants={fadeInUp} className="hero-name">Vidhyadharan.S</motion.h1>
            <motion.h2 variants={fadeInUp} className="hero-role">Data Engineer.</motion.h2>
            <motion.p variants={fadeInUp} className="hero-desc">
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
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem'}}>
                <Database color="var(--accent-color)" size={28} />
                <h3 className="skill-category" style={{marginBottom: 0, border: 'none'}}>Technical Skills</h3>
              </div>
              
              <SkillBar name="SQL" level="90%" label="Advanced" />
              <SkillBar name="Linux Basic" level="75%" label="Intermediate" />
              <SkillBar name="AI Prompting" level="85%" label="Advanced" />
              <SkillBar name="HTML & CSS" level="90%" label="Advanced" />
            </motion.div>

            {/* Languages */}
            <motion.div className="skill-card" variants={fadeInUp}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem'}}>
                <Layout color="var(--accent-color)" size={28} />
                <h3 className="skill-category" style={{marginBottom: 0, border: 'none'}}>Languages</h3>
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
            <h2 className="section-title" style={{marginBottom: '1rem'}}>Get In Touch</h2>
            <p className="contact-text">
              Phone: +91 9994791340 <br />
              Email: senthilkumarvidhya@gmail.com
            </p>
            <a href="mailto:senthilkumarvidhya@gmail.com" className="btn-primary" style={{marginTop: '1rem'}}>
              Say Hello
            </a>

            <div className="contact-links">
              <a href="https://github.com/Vidhyadharan-S" target="_blank" rel="noreferrer" className="social-icon"><FaGithub size={24} /></a>
              <a href="https://www.linkedin.com/in/vidhyadharan-s" target="_blank" rel="noreferrer" className="social-icon"><FaLinkedin size={24} /></a>
            </div>
          </motion.div>
        </section>
      </main>
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

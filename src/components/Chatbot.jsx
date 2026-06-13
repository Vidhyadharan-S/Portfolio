import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RESUME_CONTEXT = `
You are an AI assistant for Vidhyadharan.S's portfolio website. 
You must ONLY answer questions based on the following resume and context. Do NOT answer anything unrelated to Vidhyadharan.
If asked something outside this scope, politely say that you can only answer questions related to Vidhyadharan's professional background.

Resume Details:
Name: Vidhyadharan.S
Role: Data Engineer
Contact: +91 9994791340, senthilkumarvidhya@gmail.com
LinkedIn: https://www.linkedin.com/in/vidhyadharan-s
GitHub: https://github.com/Vidhyadharan-S

Summary: A Data Engineer specializing in building scalable data pipelines, optimizing databases, and integrating AI-driven insights. Passionate about organizing raw data into meaningful and accessible architectures.

Technical Skills:
- SQL (Advanced, 90%)
- Linux Basic (Intermediate, 75%)
- AI Prompting (Advanced, 85%)
- HTML & CSS (Advanced, 90%)

Languages: English (Fluent), Tamil (Native).
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! I am an AI assistant trained on Vidhyadharan's resume. Ask me anything about his skills or background!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.' }]);
      setIsLoading(false);
      return;
    }

    try {
      // Build the prompt with history
      const historyStr = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const fullPrompt = `${RESUME_CONTEXT}\n\nChat History:\n${historyStr}\nUser: ${userMessage}\nAssistant:`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 200,
          }
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'API Error');
      }

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse.trim() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(true)}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-title">
                <div className="chatbot-status-dot"></div>
                Vidhyadharan's AI Assistant
              </div>
              <button onClick={() => setIsOpen(false)} className="chatbot-close">
                <X size={20} />
              </button>
            </div>
            
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.role}`}>
                  <div className="message-content">{msg.content}</div>
                </div>
              ))}
              {isLoading && (
                <div className="chat-message assistant">
                  <div className="message-content typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chatbot-input-area" onSubmit={handleSend}>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about my resume..."
                className="chatbot-input"
              />
              <button type="submit" className="chatbot-send" disabled={isLoading || !input.trim()}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

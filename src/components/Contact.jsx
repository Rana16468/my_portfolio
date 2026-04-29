import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fix ReactQuill background in dark mode
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .ql-snow .ql-editor {
        background-color: rgba(30, 41, 59, 0.7) !important;
        color: white !important;
        min-height: 120px;
        border-radius: 0.375rem;
      }
      .ql-toolbar.ql-snow {
        border-color: rgba(99, 102, 241, 0.4) !important;
        border-top-left-radius: 0.375rem;
        border-top-right-radius: 0.375rem;
        background-color: rgba(30, 41, 59, 0.8) !important;
      }
      .ql-container.ql-snow {
        border-color: rgba(99, 102, 241, 0.4) !important;
        border-bottom-left-radius: 0.375rem;
        border-bottom-right-radius: 0.375rem;
      }
      .ql-snow .ql-stroke {
        stroke: #94a3b8 !important;
      }
      .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
        fill: #94a3b8 !important;
      }
      .ql-snow.ql-toolbar button:hover,
      .ql-snow .ql-toolbar button:hover,
      .ql-snow.ql-toolbar button:focus,
      .ql-snow .ql-toolbar button:focus,
      .ql-snow.ql-toolbar button.ql-active,
      .ql-snow .ql-toolbar button.ql-active,
      .ql-snow.ql-toolbar .ql-picker-label:hover,
      .ql-snow .ql-toolbar .ql-picker-label:hover,
      .ql-snow.ql-toolbar .ql-picker-label.ql-active,
      .ql-snow .ql-toolbar .ql-picker-label.ql-active,
      .ql-snow.ql-toolbar .ql-picker-item:hover,
      .ql-snow .ql-toolbar .ql-picker-item:hover,
      .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
      .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
        color: #818cf8 !important;
      }
      .ql-snow.ql-toolbar button:hover .ql-stroke,
      .ql-snow .ql-toolbar button:hover .ql-stroke,
      .ql-snow.ql-toolbar button:focus .ql-stroke,
      .ql-snow .ql-toolbar button:focus .ql-stroke,
      .ql-snow.ql-toolbar button.ql-active .ql-stroke,
      .ql-snow .ql-toolbar button.ql-active .ql-stroke,
      .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
      .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
      .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
      .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
      .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
      .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
      .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
      .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
        stroke: #818cf8 !important;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    
    if (message.length === 0) {
      toast.error("Please include a message");
      return;
    }
    
    setIsSubmitting(true);
    const emaildata = `My Name is ${name}. Here is My Email Address: ${email} And By Context is: ${message}`;
    
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/my_contact`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ emaildata })
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network error. Please try again.");
      }
      return res.json();
    })
    .then((data) => {
      form.reset();
      setMessage("");
      toast.success(data?.message || "Message sent successfully!");
    })
    .catch((error) => {
      toast.error(error?.message || "Something went wrong");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div
      name="contact"
      className="min-h-screen bg-gradient-to-br  from-gray-900 via-black to-blue-800 py-16 px-4 text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold inline-block border-b-4 border-pink-500 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-300">
            Get In Touch
          </h1>
          <p className="text-lg mt-6 text-cyan-100 max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you! Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-between mt-10">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1 w-full bg-indigo-900/30 backdrop-blur-md rounded-2xl p-6 border border-indigo-500/30 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-cyan-200">Send Me A Message</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cyan-100 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full p-3 bg-slate-800/70 border-2 border-indigo-500/40 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cyan-100 mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full p-3 bg-slate-800/70 border-2 border-indigo-500/40 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-cyan-100 mb-1">Your Message</label>
                <ReactQuill
                  id="message"
                  value={message}
                  onChange={setMessage}
                  placeholder="Enter your message"
                  theme="snow"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white mt-6 bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 px-6 py-3 rounded-lg font-medium shadow-lg transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <FaPaperPlane className="text-cyan-200" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <div className="flex flex-col gap-6 w-full lg:w-96">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-blue-900/80 to-cyan-900/80 rounded-xl shadow-lg backdrop-blur-sm border border-blue-700/50 p-4 mx-auto lg:mx-0 w-full"
            >
              <h3 className="text-xl text-white font-semibold mb-5 text-center">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-gray-600/50 pb-4">
                  <div className="bg-gradient-to-br from-blue-700 to-indigo-600 p-3 rounded-full shadow-lg">
                    <FaPhoneAlt className="text-yellow-300 text-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-300 text-sm">Phone & WhatsApp</span>
                    <span className="text-gray-200 font-medium">01722305054</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 border-b border-gray-600/50 pb-4">
                  <div className="bg-gradient-to-br from-blue-700 to-indigo-600 p-3 rounded-full shadow-lg">
                    <FaEnvelope className="text-yellow-300 text-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-300 text-sm">Email</span>
                    <span className="text-gray-200 font-medium break-all">rana16-468@diu.edu.bd</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-700 to-indigo-600 p-3 rounded-full shadow-lg">
                    <FaMapMarkerAlt className="text-yellow-300 text-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-300 text-sm">Alternative Email</span>
                    <span className="text-gray-200 font-medium break-all">shohelbd2021@outlook.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 rounded-xl shadow-lg backdrop-blur-sm border border-purple-700/50 p-4 mx-auto lg:mx-0 w-full"
            >
              <h3 className="text-xl text-white font-semibold mb-3 text-center">Connect With Me</h3>
              <p className="text-gray-300 text-center mb-4">Follow me on social media for updates and more</p>
              <div className="flex justify-center space-x-4">
                <a href="https://github.com/rana16468/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/ali-mohammad-sohel-rana-377050216/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-500 p-3 rounded-full transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://twitter.com/username" target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-cyan-400 p-3 rounded-full transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
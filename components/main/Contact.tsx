"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate a brief loading state for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const subject = encodeURIComponent(formData.subject || "Contact from Portfolio");
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:bhagatdeepak1242@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center py-20 min-h-screen overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-outfit bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            Let's Create Something Amazing
          </h1>
          <div className="w-[150px] h-[4px] bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full blur-[1px] mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="relative group h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl opacity-20 blur group-hover:opacity-40 transition duration-500" />
              <div 
                className="absolute -inset-[2px] rounded-3xl overflow-hidden"
                style={{
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                  padding: '2px',
                }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(168, 85, 247, 0.5) 80%, rgba(168, 85, 247, 1) 90%, transparent 100%)`,
                    animation: 'spin 4s linear infinite',
                  }}
                />
              </div>
              
              <div className="relative h-full rounded-3xl bg-[#0a0a1a]/80 backdrop-blur-xl p-8 border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-50 rounded-3xl" />
                
                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>
                    <p className="text-gray-400">Fill up the form and I will get back to you within 24 hours.</p>
                  </div>

                  <div className="space-y-6">
                    <a href="mailto:bhagatdeepak1242@gmail.com" className="flex items-center gap-4 group/item">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover/item:bg-purple-500/20 transition-colors border border-purple-500/20">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white font-medium group-hover/item:text-purple-400 transition-colors">bhagatdeepak1242@gmail.com</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="text-white font-medium">Remote / Worldwide</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links could go here */}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl opacity-20 blur group-hover:opacity-40 transition duration-500" />
              <div 
                className="absolute -inset-[2px] rounded-3xl overflow-hidden"
                style={{
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                  padding: '2px',
                }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(168, 85, 247, 0.5) 80%, rgba(168, 85, 247, 1) 90%, transparent 100%)`,
                    animation: 'spin 4s linear infinite',
                  }}
                />
              </div>

              <div className="relative rounded-3xl bg-[#0a0a1a]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 hover:border-white/20"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 hover:border-white/20"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 hover:border-white/20"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 hover:border-white/20 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-bold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-center text-sm"
                  >
                    ✨ Opening your email client to send the message!
                  </motion.div>
                )}
              </form>
            </div>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


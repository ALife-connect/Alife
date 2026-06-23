import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./contactus.css"; // Double-check this matches your folder layout

const ContactUs = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "donor", // Default route selection
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating API communication pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      // Reset form variables cleanly
      setFormData({ name: "", email: "", role: "donor", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Sub-Header Navigation Strip */}
      <nav className="contact-nav-header">
        <div className="contact-nav-container">
          <div className="contact-brand" onClick={() => nav("/")}>
            <span className="contact-brand-dot"></span>
            SLODAT Desk
          </div>
          <button className="contact-back-btn" onClick={() => nav(-1)}>
            ← Go Back
          </button>
        </div>
      </nav>

      {/* Hero Accent Introduction Banner */}
      <header className="contact-hero">
        <div className="contact-hero-container">
          <span className="contact-badge-pill">Operational Sync Desk</span>
          <h1>Get in touch with us</h1>
          <p>Have questions about emergency routing, blood donor safety verification, or onboarding your healthcare facility? We are here to help.</p>
        </div>
      </header>

      {/* Main Structural Split Layout Layout Grid */}
      <main className="contact-main-layout">
        <div className="contact-grid-container">
          
          {/* Left Column: Direct Communication Directories */}
          <aside className="contact-info-column">
            <div className="contact-info-card">
              <h3>Direct Channels</h3>
              <p className="card-subtitle">Reach out directly to our active support pipelines across Nigeria.</p>
              
              <div className="info-directory-stack">
                <div className="info-item-row">
                  <div className="info-icon-frame"><FaPhoneAlt /></div>
                  <div className="info-text-box">
                    <span>Call or WhatsApp</span>
                    <a href="tel:+2349013717091">+234 901 371 7091</a>
                  </div>
                </div>

                <div className="info-item-row">
                  <div className="info-icon-frame"><FaEnvelope /></div>
                  <div className="info-text-box">
                    <span>General Correspondence</span>
                    <a href="mailto:slodat.connect@gmail.com">slodat.connect@gmail.com</a>
                  </div>
                </div>

                <div className="info-item-row">
                  <div className="info-icon-frame"><FaMapMarkerAlt /></div>
                  <div className="info-text-box">
                    <span>Regional Operations Hub</span>
                    <p>Yaba Tech District, Lagos State, Nigeria</p>
                  </div>
                </div>

                <div className="info-item-row">
                  <div className="info-icon-frame"><FaClock /></div>
                  <div className="info-text-box">
                    <span>Response Windows</span>
                    <p>Emergency Broadcasts: 24/7<br />General Legal Auditing: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Dynamic Form Module */}
          <section className="contact-form-column">
            <div className="contact-form-card">
              <h3>Secure Message Submission</h3>
              <p className="card-subtitle">Drop us a line and our system will instantly prioritize your ticket destination.</p>

              {submitStatus === "success" && (
                <div className="contact-alert success-alert">
                  <strong>Message Dispatched Successfully!</strong>
                  <p>Thank you for reaching out. A SLODAT communications officer will follow up with your inquiry within 12–24 hours.</p>
                  <button onClick={() => setSubmitStatus(null)} className="alert-close-btn">Dismiss</button>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="contact-core-form">
                <div className="form-input-group">
                  <label htmlFor="name">Full Name or Facility Rep</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Dr. Chioma Adebayo"
                  />
                </div>

                <div className="form-double-row">
                  <div className="form-input-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@domain.com"
                    />
                  </div>

                  <div className="form-input-group">
                    <label htmlFor="role">Your Network Role</label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="donor">Voluntary Donor</option>
                      <option value="hospital">Certified Hospital / Lab</option>
                      <option value="general">Media / Partnership Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-input-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief summary of your inquiry..."
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please detail your request or account questions here..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="contact-submit-btn" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing Dispatch..." : "Send Message"}
                </button>
              </form>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default ContactUs;
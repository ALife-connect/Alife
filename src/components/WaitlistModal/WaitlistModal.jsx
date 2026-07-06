import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { toast } from 'sonner';
import axios from 'axios';
import './waitlistModal.css';

const WaitlistModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const sheetEndpoint = import.meta.env.VITE_WAITLIST_SHEET_URL;

      await axios.post(sheetEndpoint, {
        data: [
          {
            "Email": email.trim(),
            "Date": new Date().toLocaleString('en-US', { timeZoneName: 'short' })
          }
        ]
      });
      
      toast.success("Awesome! Your spot on the waitlist is secured.");
      setEmail('');
      onClose();
    } catch (err) {
      // 💡 EXPOSE THE SMOKING GUN: Prints SheetDB's exact backend rejection reason
      console.error("SheetDB Error Details:", err.response?.data || err.message);
      toast.error('Could not connect. Please try again in a few moments.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <IoCloseOutline />
        </button>
        
        <div className="modal-header-visual">
          <HiOutlineMailOpen className="modal-visual-icon" />
        </div>

        <h2>Join the Waitlist</h2>
        <p>Be the first to know when free preventative health screenings and localized clinic mapping match up in your area.</p>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="email"
            placeholder="Enter your email address"
            className="modal-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" className="modal-submit-btn" disabled={loading}>
            {loading ? <div className="modal-spinner"></div> : "SECURE MY SPOT"}
          </button>
        </form>
        
        <span className="modal-footer-note">🔒 Zero spam. Unsubscribe at any time.</span>
      </div>
    </div>
  );
};

export default WaitlistModal;
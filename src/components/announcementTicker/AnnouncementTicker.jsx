import React from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';
import './announcementTicker.css';

const AnnouncementTicker = ({ onToggleModal }) => {
  const tickerMessage = (
    <>
      <HiOutlineSparkles className="ticker-icon" />
      <span><strong>🚨 COMING SOON:</strong> Free Medical Checkup Enrollment! Find verified clinics near you and book zero-cost preventative screenings. Tap anywhere to join the early-access waitlist.</span>
    </>
  );

  return (
    <div className="ticker-wrapper" onClick={onToggleModal} title="Click to join waitlist">
      <div className="ticker-track">
        <div className="ticker-content">{tickerMessage}</div>
        <div className="ticker-content">{tickerMessage}</div>
        <div className="ticker-content">{tickerMessage}</div>
        <div className="ticker-content">{tickerMessage}</div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
import React from 'react';
import './sponsors.css';

const Sponsors = () => {
  return (
    <section className="sponsors-section">
      <div className="sponsors-container">
        <h2 className="sponsors-title">Supported & Trusted By</h2>
        <div className="sponsors-logos-grid">
          <div className="logo-wrapper">
            <img src="/images/The_Curve.jpg" alt="The Curve Academy" />
          </div>
          <div className="logo-wrapper">
            <img src="/images/Kora.png" alt="Kora Payments" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
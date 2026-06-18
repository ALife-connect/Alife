import React from 'react';
import '../../components/impacts/impacts.css';

const Impacts = () => {
  return (
    <section className="why-different">
      <div className="section-intro">
        <span className="section-eyebrow">Why SLODAT</span>
        <h2>What Makes Us Different</h2>
        <p className="subtitle">
          The most trusted, rapid-response blood infrastructure network.
        </p>
      </div>

      <div className="why-different-content">
        <div className="why-image-wrapper">
          <img src="/images/image 22.png" alt="Clinical blood tracking setup" className="why-image" />
          <div className="image-accent-glow"></div>
        </div>

        <div className="why-features">
          <div className="feature-item">
            <div className="icon-container flash-accent">
              <img src="/images/flash.png" alt="Flash alert icon" />
            </div>
            <div className="feature-text">
              <h4>Instant Notifications</h4>
              <p>
                Get critical, real-time alerts the millisecond your specific blood group is urgently requested near your exact radius.
              </p>
            </div>
          </div>

          <div className="feature-item">
            <div className="icon-container safety-accent">
              <img src="/images/quest.png" alt="Verified hospital icon" />
            </div>
            <div className="feature-text">
              <h4>Verified Medical Facilities Only</h4>
              <p>
                Every hospital, clinic, and regional blood repository on our platform undergoes rigorous multi-step credential verification.
              </p>
            </div>
          </div>

          <div className="feature-item">
            <div className="icon-container seamless-accent">
              <img src="/images/phone2.png" alt="User experience icon" />
            </div>
            <div className="feature-text">
              <h4>Seamless Lifecycle Tracking</h4>
              <p>
                From rapid digital screening to transparent donor journey metrics, the entire ecosystem is engineered for absolute simplicity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impacts;
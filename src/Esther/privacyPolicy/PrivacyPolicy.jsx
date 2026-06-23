import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./privacypolicy.css"; // Ensure this matches your folder hierarchy

const PrivacyPolicy = () => {
  const nav = useNavigate();

  // Automatically scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="policy-page-wrapper">
      {/* Upper Navigation Row Header */}
      <nav className="policy-nav-header">
        <div className="policy-nav-container">
          <div className="policy-brand" onClick={() => nav("/")}>
            <span className="brand-dot"></span>
            SLODAT Legal
          </div>
          <button className="policy-back-btn" onClick={() => nav(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Return
          </button>
        </div>
      </nav>

      {/* Hero Intro Banner Section */}
      <header className="policy-hero">
        <div className="policy-hero-container">
          <span className="policy-version-tag">Last Updated: June 2026</span>
          <h1>Privacy Policy & Data Protection</h1>
          <p>
            At SLODAT, we connect critical generosity with urgent humanitarian crises. 
            Because our network routes real-time medical responses, preserving your data security 
            and transparency is fundamental to our life-saving mission.
          </p>
        </div>
      </header>

      {/* Main Structural Layout Content */}
      <main className="policy-content-layout">
        <div className="policy-layout-container">
          
          {/* Left Sticky Sidebar Directory */}
          <aside className="policy-sidebar-index">
            <div className="sticky-index-box">
              <h3>Document Sections</h3>
              <ul>
                <li onClick={() => handleScrollToSection("data-collection")}>1. Information We Collect</li>
                <li onClick={() => handleScrollToSection("data-usage")}>2. How We Use Your Data</li>
                <li onClick={() => handleScrollToSection("data-sharing")}>3. Emergency Data Sharing</li>
                <li onClick={() => handleScrollToSection("data-security")}>4. Regulatory Security Protocols</li>
                <li onClick={() => handleScrollToSection("user-rights")}>5. Your Rights & Erasure</li>
                <li onClick={() => handleScrollToSection("contact-legal")}>6. Contact Our Compliance Team</li>
              </ul>
            </div>
          </aside>

          {/* Right Core Legal Context Document */}
          <article className="policy-document-body">
            
            <section id="data-collection">
              <h2>1. Information We Collect</h2>
              <p>
                To route emergency supplies and verify donation safety, we collect profiles split across our two primary network entities:
              </p>
              <h3>For Donors:</h3>
              <ul>
                <li><strong>Identity & Verification:</strong> Full name, verified email address, contact numbers, and age verification metrics.</li>
                <li><strong>Medical Health Indicators:</strong> Self-reported blood type, basic medical eligibility questionnaires, and historical logging logs.</li>
                <li><strong>Geolocation Coordinates:</strong> Real-time or localized background location values to enable accurate emergency alerts when nearby medical networks issue critical supply requests.</li>
              </ul>
              <h3>For Certified Hospitals & Healthcare Facilities:</h3>
              <ul>
                <li><strong>Institutional Credentials:</strong> Authorized corporate registration numbers, institutional operating licenses, and supervisor identity portfolios.</li>
                <li><strong>Dispatched Demand Data:</strong> Current inventories, supply shortages, and target geographic coordinates for safe emergency dispatch tracking.</li>
              </ul>
            </section>

            <hr className="policy-divider" />

            <section id="data-usage">
              <h2>2. How We Use Your Data</h2>
              <p>
                SLODAT never commercializes, rents, or trades user telemetry profiles. Your collected information is strictly leveraged to sustain network performance parameters:
              </p>
              <ul>
                <li><strong>Real-time Emulsion Routing:</strong> Processing individual blood profiles to automatically match urgent local emergency hospital cases.</li>
                <li><strong>Security Verification Pipelines:</strong> Operating secure multi-factor authentication systems and transactional tracking frameworks using customized OTP pathways.</li>
                <li><strong>Dynamic Network Telemetry:</strong> Generating generalized, non-identifiable demographic trend statistics to optimize regional response reserves.</li>
              </ul>
            </section>

            <hr className="policy-divider" />

            <section id="data-sharing">
              <h2>3. Emergency Data Sharing</h2>
              <p>
                Data access is tightly constrained. Your identifying markers become visible across endpoints only under the following emergency parameters:
              </p>
              <blockquote>
                <strong>Critical Match Transparency:</strong> When a donor explicitly accepts an active emergency request from a healthcare facility, the platform reveals vital contact details to the matched hospital team to guarantee safe, immediate clinical handoffs.
              </blockquote>
              <p>
                Beyond these direct medical operation loops, files are only released if required to comply with binding legal court documentation or valid regulatory mandates.
              </p>
            </section>

            <hr className="policy-divider" />

            <section id="data-security">
              <h2>4. Regulatory Security Protocols</h2>
              <p>
                Because our infrastructure bridges critical personal health metrics, we enforce multi-layered protection guidelines to guard asset data integrity:
              </p>
              <ul>
                <li>All network data packets transit through advanced **AES-256 bit end-to-end cryptographic encryption layers**.</li>
                <li>Personal medical markers are logically separated from identity metadata records within decoupled, protected cloud architecture partitions.</li>
                <li>Continuous surveillance mechanisms shield token authorization paths from malicious injection operations.</li>
              </ul>
            </section>

            <hr className="policy-divider" />

            <section id="user-rights">
              <h2>5. Your Rights & Erasure</h2>
              <p>
                You retain complete operational sovereignty over your user profile parameters. Regardless of geographical regulatory frameworks, SLODAT extends comprehensive data management liberties to all global participants:
              </p>
              <ul>
                <li><strong>The Right to Correction:</strong> Modifying internal profile fields instantly through your account setting control dashboard pane.</li>
                <li><strong>The Right to Revocation:</strong> Turning off device tracking tracking permissions directly within standard mobile app browser security controls.</li>
                <li><strong>The Right to Account Erasure:</strong> Issuing permanent account deletion logs. Once executed, all personal identities, history tracking rows, and health flags are permanently scrubbed from production tables within 72 hours.</li>
              </ul>
            </section>

            <hr className="policy-divider" />

            <section id="contact-legal" className="policy-contact-box">
              <h2>6. Contact Our Compliance Team</h2>
              <p>
                If you have parsing compliance queries, operational data audits, or need to escalate urgent security requests, reach out directly to our global infrastructure legal desk:
              </p>
              <div className="compliance-meta">
                <p><strong>Email Address:</strong> compliance@slodat-global.org</p>
                <p><strong>Secure Escalation Line:</strong> +1 (800) 555-SLDT</p>
                <p><strong>Postal Headquarters:</strong> SLODAT Global Operations, Data Privacy Desk, Suite 450, Innovation Drive, Tech District.</p>
              </div>
            </section>

          </article>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
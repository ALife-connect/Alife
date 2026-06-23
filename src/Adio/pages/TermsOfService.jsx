import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaBalanceScale, FaUserCheck, FaHospital } from "react-icons/fa";
import "./termsofservice.css"; // Ensure this matches your directory layout

const TermsOfService = () => {
  const nav = useNavigate();

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
    <div className="terms-page-wrapper">
      {/* Sub-Header Navigation Navbar */}
      <nav className="terms-nav-header">
        <div className="terms-nav-container">
          <div className="terms-brand" onClick={() => nav("/")}>
            <span className="terms-brand-dot"></span>
            SLODAT Legal
          </div>
          <button className="terms-back-btn" onClick={() => nav(-1)}>
            ← Go Back
          </button>
        </div>
      </nav>

      {/* Hero Header Introduction */}
      <header className="terms-hero">
        <div className="terms-hero-container">
          <span className="terms-badge-pill">Effective Date: June 2026</span>
          <h1>Terms of Service</h1>
          <p>Please carefully review the operating regulations, data privacy commitments, and liability frameworks governing the SLODAT emergency dispatch network.</p>
        </div>
      </header>

      {/* Main Structural Layout Block */}
      <main className="terms-main-layout">
        <div className="terms-grid-container">
          
          {/* Left Column: Quick Navigation Index */}
          <aside className="terms-index-column">
            <div className="terms-index-card">
              <h4>Document Sections</h4>
              <ul>
                <li onClick={() => handleScrollToSection("acceptance")}>1. Acceptance of Terms</li>
                <li onClick={() => handleScrollToSection("nature-of-service")}>2. Nature of Service</li>
                <li onClick={() => handleScrollToSection("donor-rules")}>3. Donor Eligibility & Conduct</li>
                <li onClick={() => handleScrollToSection("hospital-rules")}>4. Healthcare Facility Obligations</li>
                <li onClick={() => handleScrollToSection("data-privacy")}>5. Data Privacy & NDPA Compliance</li>
                <li onClick={() => handleScrollToSection("liability")}>6. Liability Disclaimers</li>
                <li onClick={() => handleScrollToSection("termination")}>7. Account Termination</li>
              </ul>
            </div>
          </aside>

          {/* Right Column: Legal Content Articles */}
          <section className="terms-content-column">
            <div className="terms-text-card">
              
              <div id="acceptance" className="terms-section">
                <h3><FaBalanceScale className="section-inline-icon" /> 1. Acceptance of Terms</h3>
                <p>By registering an account, downloading, or accessing the SLODAT (Saving Lives. One Donation At A Time) web application, you explicitly agree to be legally bound by these Terms of Service, as well as our global operational privacy parameters.</p>
                <p>If you are registering an account on behalf of a corporate medical institution, hospital, or diagnostic laboratory, you declare that you possess the requisite legal supervision authority to bind that entity to this digital contract.</p>
              </div>

              <div id="nature-of-service" className="terms-section">
                <h3><FaShieldAlt className="section-inline-icon" /> 2. Nature of Service & Emergency Mandate</h3>
                <p>SLODAT operates as an instantaneous, geographical routing platform connecting independent voluntary blood/medical donors with certified medical facilities facing acute supply deficits. </p>
                <blockquote>
                  <strong>CRITICAL EMERGENCY NOTICE:</strong> SLODAT is a logistics matching application layer. We are not a medical care provider, a blood bank facility, or an emergency responder. We do not synthesize, screen, draw, or harvest medical supplies ourselves.
                </blockquote>
              </div>

              <div id="donor-rules" className="terms-section">
                <h3><FaUserCheck className="section-inline-icon" /> 3. Voluntary Donor Eligibility & Conduct</h3>
                <p>Individuals registering as voluntary donors must honestly self-certify basic regulatory biological requirements:</p>
                <ul>
                  <li>You must be between 18 and 65 years of age.</li>
                  <li>You must weigh a minimum of 50 kilograms.</li>
                  <li>You must answer pre-screening questionnaires regarding transmissible health metrics honestly and completely.</li>
                </ul>
                <p>Falsification of identity, medical histories, or failure to appear at accepted emergency hospital matching windows without due notice will trigger immediate platform banishment logs.</p>
              </div>

              <div id="hospital-rules" className="terms-section">
                <h3><FaHospital className="section-inline-icon" /> 4. Healthcare Facility Verification & Obligations</h3>
                <p>Registered medical centers, hospitals, and blood handling labs must strictly maintain updated operating parameters:</p>
                <p>Facilities agree to submit verified licenses issued by relevant state health regulatory authorities (e.g., HEFAMAA in Lagos) and the Medical and Dental Council of Nigeria (MDCN) where applicable. You swear to run standardized post-donation clinical screening protocols locally on site to maintain recipient safety before using any matched supply.</p>
              </div>

              <div id="data-privacy" className="terms-section">
                <h3><FaShieldAlt className="section-inline-icon" /> 5. Data Privacy & NDPA Compliance</h3>
                <p>SLODAT operates in full structural compliance with the **Nigeria Data Protection Act (NDPA)**. Personal medical blood grouping data, mobile contact pipelines, and spatial GPS telemetry points are securely locked behind strict encryption layers.</p>
                <p>Donor identity metrics are uniquely exposed to a hospital team only *after* the voluntary donor has explicitly clicked "Accept Request" on a live broadcasting emergency ticket.</p>
              </div>

              <div id="liability" className="terms-section">
                <h3><FaBalanceScale className="section-inline-icon" /> 6. Ultimate Limitation of Liability</h3>
                <p>To the maximum extent permitted under Nigerian jurisprudence, SLODAT, its software engineers, and administrative managers shall not be liable for any direct, indirect, incidental, or consequential health complications, injuries, or logistical errors resulting from interactions between donors and hospital facilities.</p>
                <p>All clinical extractions, biological handling rules, and transfusion procedures take place completely outside the software application layer and remain the sole legal liability of the receiving medical institution.</p>
              </div>

              <div id="termination" className="terms-section">
                <h3><FaUserCheck className="section-inline-icon" /> 7. Account Suspension & Termination</h3>
                <p>We reserve the unilateral right to suspend, terminate, or delete accounts immediately without prior warning if we deduce or trace system exploits, hostile API scraping, fraudulent dispatch requests, or toxic behavior targeting platform users.</p>
                <p>You may request permanent deletion of your profile history logs at any time via the user configurations console dashboard panel.</p>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import '../../Esther/styles/authentry.css';

const Authentry = ({ type }) => {
  const navigate = useNavigate();
  const isLogin = type === "login";
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) return;

    if (selectedRole === "hospital") {
      navigate(isLogin ? "/hospitallogin" : "/hospitalsignup");
    } else if (selectedRole === "donor") {
      navigate(isLogin ? "/donorslogin" : "/donorssignup");
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Desktop Left Decorative Panel */}
      <div className="auth-visual-panel">
        <img src="images/Subtract.png" alt="SOLDAT Visual Element" className="auth-hero-image" />
      </div>

      {/* Mobile Top Header Banner Section */}
      <div className="auth-mobile-banner">
        <button className="mobile-back-btn" onClick={() => navigate(-1)} aria-label="Go Back">
          <IoArrowBackCircleOutline size={36} />
        </button>
      </div>

      {/* Interaction & Routing Area */}
      <div className="auth-content-panel">
        <div className="auth-header-row">
          <Link to="/" className="auth-logo-link">
            <img src="/images/Slodat.jpeg" alt="SOLDAT Logo" className="auth-branding-logo" />
          </Link>
          <button className="desktop-back-btn" onClick={() => navigate(-1)} aria-label="Go Back">
            <HiOutlineArrowCircleLeft size={44} />
          </button>
        </div>

        <div className="auth-intro-section">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>{isLogin ? "Sign in to manage your pipeline" : "Join as a donor or healthcare facility"}</p>
        </div>

        {/* Semantic Role Selection Cards */}
        <div className="role-selection-grid">
          <div 
            onClick={() => handleSelect("hospital")}
            className={`role-option-card ${selectedRole === "hospital" ? "is-selected" : ""}`}
          >
            <div className="role-image-wrapper">
              <img src="images/authhospital.png" alt="" aria-hidden="true" />
            </div>
            <span className="role-label">Hospital / Bank</span>
          </div>

          <div 
            onClick={() => handleSelect("donor")}
            className={`role-option-card ${selectedRole === "donor" ? "is-selected" : ""}`}
          >
            <div className="role-image-wrapper">
              <img src="images/authdonors.png" alt="" aria-hidden="true" />
            </div>
            <span className="role-label">Blood Donor</span>
          </div>
        </div>

        {/* Action Button Trigger */}
        <button 
          className="auth-submit-action-btn"
          onClick={handleContinue}
          disabled={!selectedRole}
        >
          {isLogin ? "LOG IN" : "CONTINUE"}
        </button>
      </div>
    </div>
  );
};

export default Authentry;
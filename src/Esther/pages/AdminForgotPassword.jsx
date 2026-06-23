import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircleLoader from 'react-spinners/CircleLoader';
import { toast } from 'sonner';
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import '../../Esther/styles/adminforgotpassword.css';

const VITE_BASEURL = import.meta.env.VITE_BASEURL;

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loadState, setLoadState] = useState(false);
  const nav = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your registered administrative email address");
      return;
    }

    setLoadState(true);
    try {
      const res = await axios.post(`${VITE_BASEURL}/admin/forgotPassword`, { email });
      toast.success(res?.data?.message || "Recovery link dispatched successfully");
      setLoadState(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "No administrator profile found with that email");
      setLoadState(false);
    }
  };

  return (
    <div className="forgot-password-wrapper">
      {/* Side Decorative Branding Column */}
      <div className='admin-side-hero'>
        <img src="images/Subtract.png" alt="Decorative background grid" className='forgot-hero-image' />
        <div className='hero-overlay-text'>
          <h2>Credential Recovery</h2>
          <p>Initialize a secure identity verification pipeline to restore system access keys safely.</p>
        </div>
      </div>

      {/* Mobile responsive context header banner */}
      <div className="forgot-mobile-banner">
        <h1>RECOVER ACCESS</h1>
        <p>Administrative Account Recovery</p>
      </div>

      {/* Right Core Form Interaction Section */}
      <div className="forgot-info-panel">
        <div className="forgot-header-row">
          <button className='back-navigation-btn' onClick={() => nav(-1)} title="Go Back">
            <FaArrowLeft />
          </button>
          <Link to="/">
            <img src="images/Slodat.jpeg" alt="Platform Brand Logo" className="forgot-brand-logo" />
          </Link>
        </div>

        <div className="forgot-form-container-box">
          <div className='form-header-block'>
            <h1>Forgot Password?</h1>
            <p className="form-subtitle">Enter your email address below to generate a secure recovery authorization token</p>
          </div>

          {/* Form Fields Stack */}
          <div className="admin-form-container">
            <div className="forgot-input-group">
              <label>ADMIN EMAIL ADDRESS</label>
              <div className='input-icon-field-group'>
                <FaEnvelope className='input-field-icon' />
                <input
                  type="email"
                  placeholder="name@slodat.org"
                  className="forgot-input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button 
              className="forgot-action-btn" 
              onClick={handleForgotPassword}
              disabled={loadState}
            >
              {loadState ? (
                <CircleLoader color='white' size={20} />
              ) : (
                <>Send Recovery Link <FaPaperPlane style={{ marginLeft: '10px', fontSize: '13px' }} /></>
              )}
            </button>

            {/* Utility Navigation Footer Links */}
            <div className="forgot-hyperlink-footer">
              <span className="auth-redirect-link" onClick={() => nav('/adminlogin')}>
                RETURN TO <strong className="action-accent">LOG IN</strong>
              </span>
              <span className="auth-redirect-link" onClick={() => nav('/adminsignup')}>
                DON'T HAVE AN ACCOUNT? <strong className="action-accent">SIGNUP</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
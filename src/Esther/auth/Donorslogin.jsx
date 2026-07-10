import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import CircleLoader from 'react-spinners/CircleLoader';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { LuEye, LuEyeClosed, LuHeart, LuShieldCheck, LuSparkles, LuActivity } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { toast } from "sonner";
import { logIn, saveToken } from "../../global/Slice";
import '../../Esther/styles/donorslog.css';

const VITE_BASEURL = import.meta.env.VITE_BASEURL;


const Donorslogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: ""
  });
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${VITE_BASEURL}/login`, userLoginData);
      const user = res?.data?.data;

      if (!user?.isVerified) {
        toast.error('Account not verified. Please check your email.');
        navigate("/checkmail", { state: { email: userLoginData.email } });

        try {
          await axios.post(`${VITE_BASEURL}/resend-otp`, {
            email: userLoginData.email,
          });
        } catch (err) {
        }
        return;
      }

      toast.success(res?.data?.message || "Login successful!");
      dispatch(logIn(res?.data?.data));
      dispatch(saveToken(res?.data?.token));
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Something went wrong during authentication."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userLoginData.email || !userLoginData.password) {
      setFormError("Please fill in all fields.");
      return;
    }

    setFormError("");
    await handleLogin();
  };

  return (
    <div className='donor-login-container'>
      {/* Mobile Header Block */}
      <div className='donor-login-mobile-banner'>
        <button className='mobile-back-btn' onClick={() => navigate(-1)} aria-label="Go back">
          <IoArrowBackCircleOutline size={36} />
        </button>
        <h2>LOG IN</h2>
      </div>

      {/* Desktop Left Donor Benefits Display Column */}
      <div className='donor-login-visual-panel'>
        <div className='benefits-display-box'>
          <span className='benefits-badge'>DONOR COMMUNITY</span>
          <h1 className='benefits-title'>Making an impact with every drop</h1>
          <p className='benefits-subtitle'>Log in to your dashboard to track your pipeline, view rewards, and schedule your next life-saving donation.</p>
          
          <div className='benefits-grid'>
            <div className='benefit-item-card'>
              <div className='benefit-icon-frame'><LuHeart size={22} /></div>
              <div className='benefit-txt-content'>
                <h3>Save Up to 3 Lives</h3>
                <p>Every single whole blood donation is separated into vital components to assist up to three unique patients.</p>
              </div>
            </div>

            <div className='benefit-item-card'>
              <div className='benefit-icon-frame'><LuShieldCheck size={22} /></div>
              <div className='benefit-txt-content'>
                <h3>Free Health Screenings</h3>
                <p>Monitor your cardiovascular vitals, pulse rate, blood pressure, and hemoglobin levels on every visit.</p>
              </div>
            </div>

            <div className='benefit-item-card'>
              <div className='benefit-icon-frame'><LuSparkles size={22} /></div>
              <div className='benefit-txt-content'>
                <h3>Earn Exclusive Rewards</h3>
                <p>Accumulate pipeline loyalty points redeemable across our premium local and global wellness partner networks.</p>
              </div>
            </div>

            <div className='benefit-item-card'>
              <div className='benefit-icon-frame'><LuActivity size={22} /></div>
              <div className='benefit-txt-content'>
                <h3>Cellular Regeneration</h3>
                <p>Donation stimulates your bone marrow to safely produce healthy, fresh red blood cells within weeks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Interaction Panel */}
      <div className='donor-login-form-panel'>
        <div className='donor-login-header-row'>
          <Link to="/">
            <img src="/images/Slodat.jpeg" alt="Logo" className='donor-login-logo' />
          </Link>
          <button className='desktop-back-btn' onClick={() => navigate(-1)} aria-label="Go back">
            <HiOutlineArrowCircleLeft size={44} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='donor-login-form-box'>
          <h2>LOG IN</h2>
          
          {/* Email Form Input Field */}
          <div className='donor-login-input-group'>
            <label htmlFor="email-input">EMAIL ADDRESS</label>
            <input 
              id="email-input"
              type="email" 
              placeholder='ENTER EMAIL' 
              className='donor-login-field'
              value={userLoginData.email}
              onChange={(e) => setUserLoginData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          {/* Password Form Input Field */}
          <div className='donor-login-input-group'>
            <label htmlFor="password-input">ENTER PASSWORD</label>
            <div className="donor-login-password-combo-box">
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                className='donor-login-password-inner-field'
                placeholder='Password'
                value={userLoginData.password}
                onChange={(e) => setUserLoginData(prev => ({ ...prev, password: e.target.value }))}
              />
              <button 
                type="button" 
                className="password-toggle-visibility-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <LuEye size={18} /> : <LuEyeClosed size={18} />}
              </button>
            </div>
          </div>

          {formError && <p className="form-runtime-error-msg">{formError}</p>}

          {/* Action Trigger Button */}
          <button type="submit" className='donor-login-action-btn' disabled={isLoading}>
            {isLoading ? <CircleLoader color="white" size={22} /> : "LOG-IN"}
          </button>

          {/* Redirection Navigation Footer Links */}
          <div className='donor-login-hyperlink-footer'>
            <p onClick={() => navigate("/donorssignup")} className='auth-redirect-link'>
              DON'T HAVE AN ACCOUNT? SIGNUP
            </p>
            <p onClick={() => navigate("/forgotpassword")} className='auth-redirect-link'>
              FORGOT PASSWORD
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donorslogin;
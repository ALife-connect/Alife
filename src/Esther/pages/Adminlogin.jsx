import React, { useState } from 'react';
import '../../Esther/styles/adminlogin.css';
import { Link, useNavigate } from 'react-router-dom';
import CircleLoader from 'react-spinners/CircleLoader';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { logIn, saveToken } from '../../global/Slice';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const VITE_BASEURL = import.meta.env.VITE_BASEURL;

const Adminlogin = () => {
  const [adminData, setAdminData] = useState({
    email: '',
    password: ''
  });
  const [loadState, setLoadState] = useState(false);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogin = async () => {
    if (!adminData.email || !adminData.password) {
      toast.error("Please enter your administrative credentials");
      return;
    }
    
    setLoadState(true);
    try {
      const res = await axios.post(`${VITE_BASEURL}/admin/login`, adminData);
      dispatch(logIn(res?.data?.data));
      dispatch(saveToken(res?.data?.token));
      toast.success(res?.data?.message || "Authentication Cleared");
      nav("/dashboard");
      setLoadState(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid administrative credentials");
      setLoadState(false);
    }
  };

  return (
    <div className='admindonorloginwrapper'>
      {/* Side Decorative Branding Column */}
      <div className='admin-side-hero'>
        <img src="images/Subtract.png" alt="Decorative background grid" className='admindonorslogimage' />
        <div className='hero-overlay-text'>
          <h2>SLODAT Network SecOps</h2>
          <p>Accessing encrypted medical routing systems and regional blood dispatch repositories.</p>
        </div>
      </div>

      {/* Mobile responsive context header banner */}
      <div className='admindonorloginmobilewrap'>
        <h1>SLODAT SECURE ADMIN</h1>
        <p>Log In to System Terminal</p>
      </div>

      {/* Right Core Form Interaction Section */}
      <div className='admindonorlogininfowrap'>
        <div className='admindonorloginlogohold'>
          <Link to="/">
            <img src="images/Slodat.jpeg" alt="Platform Brand Logo" className='admindonorloginlogo' />
          </Link>
        </div>

        <div className='admindonorlogininfo1'>
          <div className='form-header-block'>
            <h1>Welcome Back</h1>
            <p className="form-subtitle">Enter your secure credentials to initialize operations</p>
          </div>

          {/* Form Fields Stack */}
          <div className='admin-form-container'>
            
            <div className='admindonorlogininputwrapper'>
              <label>EMAIL ADDRESS</label>
              <div className='input-icon-field-group'>
                <FaEnvelope className='input-field-icon' />
                <input 
                  type="email" 
                  placeholder='name@slodat.org' 
                  className='admindonorlogininput'
                  value={adminData.email}
                  onChange={(e) => setAdminData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className='admindonorlogininputwrapper'>
              <label>ENTER PASSWORD</label>
              <div className='input-icon-field-group'>
                <FaLock className='input-field-icon' />
                <input 
                  type="password" 
                  placeholder='••••••••' 
                  className='admindonorlogininput' 
                  value={adminData.password}
                  onChange={(e) => setAdminData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
            </div>

            <button 
              className='admindonorloginbtn' 
              onClick={handleLogin}
              disabled={loadState}
            >
              {loadState ? (
                <CircleLoader color="white" size={20} />
              ) : (
                <>Log In to Dashboard <FaSignInAlt style={{ marginLeft: '8px' }} /></>
              )}
            </button>

            {/* Utility Navigation Footer Links */}
            <div className='admindonorloginforgotwrap'>
              <span className='auth-redirect-text' onClick={() => nav("/adminsignup")}>
                DON'T HAVE AN ACCOUNT? <strong className="action-accent">SIGNUP</strong>
              </span>
              <span className='auth-redirect-text accent-muted' onClick={() => nav("/adminforgotpassword")}>
                FORGOT PASSWORD?
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
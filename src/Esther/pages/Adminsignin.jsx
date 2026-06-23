import React, { useState } from 'react';
import '../../Esther/styles/adminsignin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { logIn } from '../../global/Slice';
import CircleLoader from 'react-spinners/CircleLoader';
import { FaUser, FaEnvelope, FaLock, FaShieldAlt, FaSignInAlt } from 'react-icons/fa';

const VITE_BASEURL = import.meta.env.VITE_BASEURL;

const Adminsignin = () => {
  const [adminData, setAdminData] = useState({
    fullName: '',
    email: '',
    role: 'admin',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadState, setLoadState] = useState(false);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSignUp = async () => {
    if (!adminData.fullName || !adminData.email || !adminData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (adminData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoadState(true);
    try {
      const res = await axios.post(`${VITE_BASEURL}/admin/newRegister`, adminData);
      dispatch(logIn(res));
      toast.success(res?.data?.message || "Registration Successful");
      nav("/dashboard");
      setLoadState(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "An administrative network error occurred");
      setLoadState(false);
    }
  };

  return (
    <div className='adminsignwrapper'>
      {/* Side Decorative Branding Column */}
      <div className='admin-side-hero'>
        <img src="images/Subtract.png" alt="Decorative background grid" className='adminsignimg' />
        <div className='hero-overlay-text'>
          <h2>SLODAT Network SecOps</h2>
          <p>Accessing encrypted medical routing systems and regional blood dispatch repositories.</p>
        </div>
      </div>

      {/* Mobile-only responsive context header banner */}
      <div className='adminmobilewrap'>
        <h1>SLODAT SECURE ADMIN</h1>
        <p>Create Administrative Credentials</p>
      </div>

      {/* Right Core Form Interaction Section */}
      <div className='adminsigninfowrap'>
        <div className='adminsignlogohold'>
          <Link to="/">
            <img src="images/Slodat.jpeg" alt="Platform Brand Logo" className='adminsignlogo' />
          </Link>
        </div>

        <div className='adminsigninfo1'>
          <div className='form-header-block'>
            <h1>Register Admin Account</h1>
            <p className="form-subtitle">Establish secure system access clearances below</p>
          </div>

          {/* Form Fields Stack */}
          <div className='admin-form-container'>
            
            <div className='adminsigninputwrapper'>
              <label>FULL NAME</label>
              <div className='input-icon-field-group'>
                <FaUser className='input-field-icon' />
                <input 
                  type="text" 
                  placeholder='Dr. / Engr. Full Name' 
                  className='adminsigninput' 
                  value={adminData.fullName}
                  onChange={(e) => setAdminData(prev => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
            </div>

            <div className='adminsigninputwrapper'>
              <label>EMAIL ADDRESS</label>
              <div className='input-icon-field-group'>
                <FaEnvelope className='input-field-icon' />
                <input 
                  type="email" 
                  placeholder='name@slodat.org' 
                  className='adminsigninput' 
                  value={adminData.email}
                  onChange={(e) => setAdminData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className='adminsigninputwrapper'>
              <label>PASSWORD</label>
              <div className='input-icon-field-group'>
                <FaLock className='input-field-icon' />
                <input 
                  type="password" 
                  placeholder='••••••••' 
                  className='adminsigninput' 
                  value={adminData.password}
                  onChange={(e) => setAdminData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
            </div>

            <div className='adminsigninputwrapper'>
              <label>CONFIRM PASSWORD</label>
              <div className='input-icon-field-group'>
                <FaShieldAlt className='input-field-icon' />
                <input 
                  type="password" 
                  placeholder='••••••••' 
                  className='adminsigninput' 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              className='adminbtn' 
              onClick={handleSignUp} 
              disabled={loadState}
            >
              {loadState ? (
                <CircleLoader color="white" size={20} />
              ) : (
                <>Create Admin Account <FaSignInAlt style={{ marginLeft: '8px' }} /></>
              )}
            </button>

            <p className='auth-toggle-footer'>
              ALREADY HAVE AN ACCOUNT? <Link to="/adminlogin" className="login-accent-link">LOG IN</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminsignin;
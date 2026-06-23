import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircleLoader from 'react-spinners/CircleLoader';
import '../../Esther/styles/reset.css';
import { toast } from 'sonner';
import { FaLock, FaKey, FaArrowLeft } from 'react-icons/fa';

const VITE_BASEURL = import.meta.env.VITE_BASEURL;

const Adminreset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const nav = useNavigate();

  const handleResetPassword = async () => {
    if (!newPassword || !ConfirmNewPassword) {
      toast.error("Please fill out all password fields");
      return;
    }
    if (newPassword !== ConfirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const ress = await axios.post(`${VITE_BASEURL}/admin/resetPassword/${token}`, {
        newPassword
      });      
      setLoading(false);
      toast.success(ress?.data?.message || "Password successfully updated");
      nav("/adminlogin");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset token has expired or is invalid");
      setLoading(false);
    }
  };

  return (
    <div className='resetwrapper'>
      {/* Side Decorative Branding Column */}
      <div className='admin-side-hero'>
        <img src="/images/Subtract.png" alt="Decorative background grid" className='resetimage' />
        <div className='hero-overlay-text'>
          <h2>Security Protocol</h2>
          <p>Update your administrator master key credentials to restore access to the infrastructure panel.</p>
        </div>
      </div>

      {/* Mobile responsive context header banner */}
      <div className='resetmobilewrap'>
        <h1>RESET PASSWORD</h1>
        <p>Authorize Security Override</p>
      </div>

      {/* Right Core Form Interaction Section */}
      <div className='resetinfowrap'>
        <div className='resetlogohold'>
          <button className='back-navigation-btn' onClick={() => nav(-1)} title="Go Back">
            <FaArrowLeft />
          </button>
          <Link to="/">
            <img src="/images/Slodat.jpeg" alt="Platform Brand Logo" className='resetlogo'/>
          </Link>
        </div>

        <div className='resetinfo1'>
          <div className='form-header-block'>
            <h1>Create New Password</h1>
            <p className="form-subtitle">Ensure your new password contains a secure mixture of character sets</p>
          </div>

          {/* Form Fields Stack */}
          <div className='admin-form-container'>
            
            <div className='resetinputwrapper'>
              <label>NEW PASSWORD</label>
              <div className='input-icon-field-group'>
                <FaLock className='input-field-icon' />
                <input 
                  type="password" 
                  className='resetinput'
                  placeholder='••••••••'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div className='resetinputwrapper'>
              <label>CONFIRM NEW PASSWORD</label>
              <div className='input-icon-field-group'>
                <FaKey className='input-field-icon' />
                <input 
                  type="password" 
                  className='resetinput'
                  placeholder='••••••••'
                  value={ConfirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              className='resetbtn' 
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? <CircleLoader color='white' size={20}/> : "UPDATE PASSWORD"}
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminreset;
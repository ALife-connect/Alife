import React, { useEffect, useState } from 'react';
import '../styles/verifyMail.css';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const Base_Url = import.meta.env.VITE_BASEURL

export default function VerifyMail() {
  const [loadStatus, setLoadStatus] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);


  const { token } = useParams()

  const verifyEmail = async () => {
    setLoadStatus(true);
    try {
      const res = await axios.get(`${Base_Url}/verify-donor/${token}`);
      setVerificationStatus('success');
    } catch (err) {
      console.error(err);
      setVerificationStatus('error');
    } finally {
      setLoadStatus(false);
    }
  };

  useEffect(() => {
    verifyEmail()
  }, []);

  const nav = useNavigate()

  useEffect(() => {
    if (verificationStatus === 'success') {
      setTimeout(() => nav('/login'), 3000);
    }
  }, [verificationStatus]);


  return (
    <div className="verify-container">
      <div className="verify-card">
        <img src="/images/logo.png" alt="Logo" className="Verifinglogo" />

        {loadStatus ? (
          <>
            <div className="spinner"></div>
            <h2>Verifying your email...</h2>
            <p>Please wait while we confirm your email address.</p>
          </>
        ) : verificationStatus === 'success' ? (
          <>
            <div className="checkmark">&#10004;</div>
            <h2>Email Verified!</h2>
            <p>Your email has been successfully verified.</p>
            <button onClick={() => nav('/login')}>Go to Login</button>
          </>
        ) : (
          <>
            <div className="crossmark">❌</div>
            <h2>Verification Failed</h2>
            <p>The link may be invalid or expired. Please try again.</p>
            <button onClick={() => nav('/resendVerificationMail')}>Resend Link</button>
          </>
        )}

      </div>
    </div>
  );
}

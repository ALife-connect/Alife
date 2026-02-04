import React, { useState } from 'react';
import '../styles/checkmail.css';
import axios from 'axios';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import FadeLoader from 'react-spinners/CircleLoader'


const VITE_BASEURL = import.meta.env.VITE_BASEURL;

const ResendMailVerification = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const resendVerificationLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reverifyRes = await axios.post(`${VITE_BASEURL}/resend-otp`, { email });
      setStatus('success');
    } catch (err) {
      console.error("Error sending re-verification email:", err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resend-wrapper">
      <div className="resend-card">
        <img src="/mail-verify.svg" alt="Mail illustration" className="resend-img" />
        <HiOutlineArrowCircleLeft
          className="back-icon"
          onClick={() => nav(-1)}
          style={{ cursor: 'pointer', fontSize: '1.8rem', marginBottom: '10px' }}
        />

        <h1>Resend Verification Email</h1>
        <p>Enter the email address you used to sign up, and we’ll send you another verification link.</p>

        <form onSubmit={resendVerificationLink}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? <FadeLoader color="white" size={25} /> : "Resend Link"}
          </button>
        </form>

        {status === 'success' && <p className="success-text">{toast.success("Verification link sent! Check your email 📩")}</p>}
        {status === 'error' && <p className="error-text">{toast.error("Failed to send verification. Try again.")}</p>}
      </div>
    </div>
  );
};

export default ResendMailVerification;

import { useState, useRef, useEffect } from "react";
import "../styles/checkmail.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const Base_Url = import.meta.env.VITE_BASEURL;

export default function CheckMail() {
  const nav = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const [counter, setCounter] = useState(45); // countdown in seconds

  // Countdown effect
  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  // Handle OTP input
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only numbers
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0]; // only 1 digit per box
    setOtp(newOtp);

    if (index < 5 && value) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }

    try {
      const res = await axios.post(`${Base_Url}/verify-otp`, {email, otp: finalOtp });
      toast.success("OTP Verified Successfully!");
      nav("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid OTP, please try again.");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(`${Base_Url}/resend-otp`,{email});
      toast.info("A new OTP has been sent to your email.");
      setCounter(60); // reset countdown
    } catch (err) {
      toast.error("Failed to resend OTP. Try again later.");
    }
  };

  return (
    <div className="checkmail-wrapper">
      <div className="checkmail-card">
        <img src="/images/checkmail.png" alt="Check mail" className="mail-img" />

        <h1>Enter OTP</h1>
        <p>
          We’ve sent a 6-digit OTP code to your email.  
          Please enter it below to verify your account.
        </p>

        {/* OTP Input Boxes */}
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>

        <button onClick={handleSubmit}>Verify</button>

        <p className="resend-text">
          Didn’t get it?{" "}
          {counter > 0 ? (
            <span className="resend-disabled">Resend OTP in {counter}s</span>
          ) : (
            <span className="resend-link" onClick={handleResend}>
              Resend OTP
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import "../styles/checkmail.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;

export default function CheckMail() {
  const nav = useNavigate();
  const location = useLocation();

  // ✅ Get email and userType from state OR localStorage
  const email = location.state?.email || localStorage.getItem("email");
  const userType = location.state?.userType || localStorage.getItem("pendingUserType");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [counter, setCounter] = useState(45);

  // ✅ Protect page if email missing
  useEffect(() => {
    if (!email) {
      toast.error("Email missing. Please login again.");
      nav("/login");
    }
  }, [email, nav]);

  // ✅ Auto focus first input
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // ✅ Countdown
  useEffect(() => {
    if (counter === 0) return;

    const timer = setTimeout(() => {
      setCounter(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  // ✅ Handle OTP input
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // ✅ Backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // ✅ Verify OTP - Routes based on userType
  const handleSubmit = async () => {
    const finalOtp = otp.join("");

    if (!email || finalOtp.length !== 6) {
      toast.error("Email and 6-digit OTP are required");
      return;
    }

    try {
      await axios.post(
        `${VITE_BASEURL_REN}/verify-otp`,
        {
          email,
          otp: finalOtp
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success("OTP Verified Successfully!");

      // ✅ Clear stored data
      localStorage.removeItem("email");
      localStorage.removeItem("pendingUserType");

      // ✅ Route based on user type
      if (userType === "hospital") {
        nav("/hospitallogin");
      } else if (userType === "donor") {
        nav("/donorslogin");
      } else {
        nav("/dashboard");
      }

    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Invalid OTP, please try again.");
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    if (!email) {
      toast.error("Email missing.");
      return;
    }

    try {
      await axios.post(
        `${VITE_BASEURL_REN}/resend-otp`,
        {
          email
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      toast.info("A new OTP has been sent to your email.");
      setCounter(60);

    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Failed to resend OTP. Try again later.");
    }
  };

  return (
    <div className="checkmail-wrapper">
      <div className="checkmail-card">
        <img
          src="/images/checkmail.png"
          alt="Check mail"
          className="mail-img"
        />

        <h1>Enter OTP</h1>
        <p>
          We've sent a 6-digit OTP code to your email.
          Please enter it below to verify your account.
        </p>

        {/* OTP Inputs */}
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>

        <button onClick={handleSubmit}>
          Verify
        </button>

        <p className="resend-text">
          Didn't get it?{" "}
          {counter > 0 ? (
            <span className="resend-disabled">
              Resend OTP in {counter}s
            </span>
          ) : (
            <span
              className="resend-link"
              onClick={handleResend}
            >
              Resend OTP
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
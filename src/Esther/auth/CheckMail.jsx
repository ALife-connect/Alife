import { useState, useRef, useEffect } from "react";
import "../styles/checkmail.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CircleLoader from "react-spinners/CircleLoader";

const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL;

export default function CheckMail() {
  const nav = useNavigate();
  const location = useLocation();

  const email = location.state?.email || localStorage.getItem("email");
  const userType = location.state?.userType || localStorage.getItem("pendingUserType");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [counter, setCounter] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const hasTriggeredInitialSend = useRef(false);

  const sendOTPRequest = async (isManualResend = false) => {
    if (!email) return;
    
    setIsSending(true);
    try {
      await axios.post(
        `${VITE_BASEURL_REN}/resend-otp`,
        { email },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (isManualResend) {
        toast.info("A new verification code has been sent to your email.");
        setCounter(60);
      } else {
        toast.success("Verification code sent to your email inbox.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to deliver OTP code. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (!email) {
      toast.error("Session expired or email missing. Please log in again.");
      nav("/login");
      return;
    }

    if (!hasTriggeredInitialSend.current) {
      hasTriggeredInitialSend.current = true;
      sendOTPRequest(false);
    }
  }, [email, nav]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (counter === 0) return;

    const timer = setInterval(() => {
      setCounter(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join("");

    if (!email || finalOtp.length !== 6) {
      toast.error("Please fill out the complete 6-digit verification code.");
      return;
    }

    setIsVerifying(true);
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

      toast.success("Account Verified Successfully!");

      localStorage.removeItem("email");
      localStorage.removeItem("pendingUserType");


      if (userType === "hospital") {
        nav("/hospitallogin");
      } else if (userType === "donor") {
        nav("/donorslogin");
      } else {
        nav("/dashboard");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid validation code, please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendClick = () => {
    if (counter === 0 && !isSending) {
      sendOTPRequest(true);
    }
  };

  return (
    <div className="checkmail-wrapper">
      <div className="checkmail-card">
        <img
          src="/images/checkmail.png"
          alt="Check mail notification indicator"
          className="mail-img"
        />

        <h1>Enter OTP</h1>
        <p>
          We've dispatched a 6-digit secure code to your email account. 
          Please input it below to complete your authentication.
        </p>


        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              disabled={isVerifying || isSending}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>


        <button onClick={handleSubmit} disabled={isVerifying || isSending}>
          {isVerifying ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircleLoader color="white" size={20} />
            </div>
          ) : (
            "Verify Account"
          )}
        </button>

        <p className="resend-text">
          Didn't get the secure email?{" "}
          {isSending ? (
            <span className="resend-disabled">Dispatching code...</span>
          ) : counter > 0 ? (
            <span className="resend-disabled">
              Resend code in {counter}s
            </span>
          ) : (
            <span
              className="resend-link"
              onClick={handleResendClick}
              style={{ cursor: "pointer", fontWeight: "700" }}
            >
              Resend OTP
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
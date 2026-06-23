import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Esther/styles/forgotPassword.css";
import CircleLoader from "react-spinners/CircleLoader";
import { toast } from "sonner";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const VITE_BASEURL = import.meta.env.VITE_BASEURL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loadState, setLoadState] = useState(false);
  const nav = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter your email address");
    }

    setLoadState(true);
    try {
      const res = await axios.post(`${VITE_BASEURL}/forgotPassword`, { email });
      toast.success(res?.data?.message || "Reset link sent successfully!");
      
      setTimeout(() => {
        nav(`/reset-password-otp/${encodeURIComponent(email)}`);
      }, 2000);
      
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoadState(false);
    }
  };

  return (
    <div className="donorloginwrapper">
      <div className="donorloginmobilewrap"></div>

      <div className="donorlogininfowrap">
        <div className="smallarrow">
          <IoArrowBackCircleOutline onClick={() => nav(-1)} />
        </div>
        
        <h2>FORGOT PASSWORD</h2>
        
        <div className="donorloginlogohold">
          <Link to="/">
            <img src="/images/Slodat.jpeg" alt="Logo" className="donorloginlogo" />
          </Link>
          <HiOutlineArrowCircleLeft size={38} onClick={() => nav(-1)} style={{ cursor: "pointer" }} />
        </div>

        <form className="donorlogininfo1" onSubmit={handleForgotPassword}>
          <h2>INPUT YOUR MAIL</h2>

          <div className="donorlogininputwrapper">
            <p>EMAIL ADDRESS</p>
            <input
              type="email"
              placeholder="ENTER EMAIL"
              className="donorlogininput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="donorloginbtn" disabled={loadState}>
            {loadState ? <CircleLoader color="white" size={20} /> : "Send Link"}
          </button>

          <div className="donorloginforgotwrap">
            <Link to="/donorssignup" className="AuthRedirectionLinkWrap">
              DON'T HAVE AN ACCOUNT? SIGNUP
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
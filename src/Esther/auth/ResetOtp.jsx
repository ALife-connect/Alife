import React, { useState } from "react";
import "../../Esther/styles/resetotp.css";
import '../../Esther/styles/authentry.css'
import { HiOutlineArrowCircleLeft } from 'react-icons/hi'

import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { useParams } from "react-router";

const Base_Url = import.meta.env.VITE_BASEURL;

const ResetOtp = () => {
  const { email } = useParams();
  const [formData, setFormData] = useState({
    email: email,
    otp: "",
    newPassword: "",
  });
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Base_Url}/resetPassword`, formData);
      console.log(response?.data?.status);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        setTimeout(() => {
          nav("/login");
        }, 4000);
      }
    } catch (error) {
      console.log(error?.response?.data?.status);
      if (!error?.response?.data?.status) {
        return toast.error(error?.response?.data?.message);
      }
    }
  };
  return (


    <div className="authwrapper">
      <img src="/images/Subtract.png" alt="" className="authimage" />

      <div className="authinfowrap">
        <div className="authlogohold">
          <Link to="/">
            <img src="/images/alifenobg.png" alt="" className="authlogo" />
          </Link>
          <HiOutlineArrowCircleLeft size={50} onClick={() => nav(-1)} />
        </div>

        <div className="authinfo1">
          <h3>RESET YOUR PASSWORD</h3>
          <p>Enter OTP sent to your email and set a new password</p>
          <p style={{ fontSize: "14px", color: "gray", marginTop: "5px" }}>
            If you don't see the email in your inbox,<br /> please check your Spam or Junk folder.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="authform">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={true}
            />
          </div>

          <div className="form-group">
            <label>OTP:</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              required
            />
          </div>

          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
          </div>

          <button type="submit" className="authinfo3">
            Submit
          </button>
        </form>
      </div>
    </div>

  );
};

export default ResetOtp;

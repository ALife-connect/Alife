import React, { useState } from 'react';
import '../../Esther/styles/donorssign.css';
import { Link, useNavigate } from 'react-router-dom';
import FadeLoader from 'react-spinners/CircleLoader'
import { toast } from 'sonner';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';
import { LuEyeClosed, LuEye, LuActivity, LuHeartHandshake, LuBellRing } from "react-icons/lu";
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const VITE_BASEURL = import.meta.env.VITE_BASEURL;

const Donorssignup = () => {
  const [click, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    bloodType: "",
    location: "",
    age: "",
  });

  const [showPassword1, setShowPassword1] = useState(true)
  const [showPassword2, setShowPassword2] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    } 
    if (!userData.fullName || !userData.email || !userData.location || !userData.password || !userData.age || !userData.bloodType) {
      toast.error("Please input all fields")
      return
    }
    
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${VITE_BASEURL}/register`, 
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      toast.success(res.data.message);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("pendingUserType", "donor");
      
      setTimeout(() => {
        nav("/checkmail", {
          state: { 
            email: userData.email,
            userType: "donor"
          }
        });
      }, 1000);
      
    } catch (err) {
      if(err.status === 400){
        toast.error(err.response.data.message || err.response.data.errors[0]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='donorsignwrapper'>
      {/* Mobile Top Header */}
      <div className='donsignmobilewrap'>
        <div className='smallarrow'><IoArrowBackCircleOutline onClick={() => nav(-1)}/></div>
        <h1>CREATE AN ACCOUNT</h1>
        <p>REGISTER AS A DONOR</p>
      </div>

      {/* INPUT FORM PANEL - NOW AT THE TOP */}
      <div className='donorsigninfowrap'>
        <div className='donorsignlogohold'>
          <Link to="/">
            <img src="/images/Slodat.jpeg" alt="Logo" className='donorsignlogo' />
          </Link>
          <HiOutlineArrowCircleLeft size={38} className="desktop-back-btn" onClick={() => nav(-1)} />
        </div>
        
        <form className='donorsigninfo1' onSubmit={handleSubmit}>
          <h1 className="form-main-title">REGISTER AS A DONOR</h1>

          <div className='donorsigninputwrapper'>
            <p>NAME</p>
            <input
              type="text"
              placeholder='FULL NAME'
              className='donorssigninput'
              value={userData.fullName}
              onChange={(e) => setUserData((prev) => ({ ...prev, fullName: e.target.value }))}
            />
          </div>

          <div className='donorsigninputwrapper'>
            <p>AGE</p>
            <input
              type="number"
              min={18}
              placeholder='AGE'
              className='donorssigninput'
              value={userData.age}
              onChange={(e) => setUserData((prev) => ({ ...prev, age: e.target.value}))}
            />
          </div>

          <div className='donorsigninputwrapper'>
            <p>HOME ADDRESS</p>
            <input
              type="text"
              placeholder='ADDRESS'
              className='donorssigninput'
              value={userData.location}
              onChange={(e) => setUserData((prev) => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div className='donorsigninputwrapper'>
            <p>ENTER EMAIL</p>
            <input
              type="email"
              placeholder='ENTER EMAIL'
              className='donorssigninput'
              value={userData.email}
              onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className='donorclick'>
            <p>HAVE YOU DONATED BEFORE?</p>
            <div className='donorclickinner'>
              <div className='clickinner'>
                <input type="radio" name='donatedBefore' id="donatedYes" />
                <label htmlFor="donatedYes">YES</label>
              </div>
              <div className='clickinner'>
                <input type="radio" name='donatedBefore' id="donatedNo" />
                <label htmlFor="donatedNo">NO</label>
              </div>
            </div>
          </div>

          <div className='donorbloodclick'>
            <h2>BLOOD GROUP</h2>
            <div className='bloodgrouphold'>
              {["A+", "B+", "AB+", "O-", "Unknown", "A-", "B-", "O+"].map((type) => (
                <label key={type} className="blood-type-option">
                  <input
                    type="radio"
                    name="bloodType"
                    value={type}
                    checked={userData.bloodType === type}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, bloodType: e.target.value }))
                    }
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='donorsigninputwrapper'>
            <p>CREATE PASSWORD</p>
            <div className="inputAndIcon">
              <input
                type={showPassword1 ? "password" : "text"}
                className='donorssignpasswordinput'
                placeholder='Password'
                value={userData.password}
                onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
              />
              {showPassword1 ? <LuEyeClosed onClick={() => setShowPassword1(false)}/> : <LuEye onClick={() => setShowPassword1(true)}/>}
            </div>
          </div>

          <div className='donorsigninputwrapper'>
            <p>CONFIRM PASSWORD</p>
            <div className="inputAndIcon">
              <input
                type={showPassword2 ? "password" : "text"}
                className='donorssignpasswordinput'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showPassword2 ? <LuEyeClosed onClick={() => setShowPassword2(false)}/> : <LuEye onClick={() => setShowPassword2(true)}/>}
            </div>
          </div>
          
          <p className="passwordTips">
            † Password must be at least 6 characters long <br />
            † Password must include at least one uppercase letter and a number.
          </p>

          <div className='checkboxwrapper'>
            <input 
              type="checkbox" 
              id="termsCheckbox"
              checked={click}
              onChange={() => setClick(!click)}
              required
            />
            <label htmlFor="termsCheckbox">
              I agree to the{" "}
              <span onClick={() => nav("/donorterms")} className='tandc'>
                TERMS AND CONDITIONS
              </span>
            </label>
          </div>

          <div className='hosloginforgotwrap'>
            <p onClick={() => nav("/donorslogin")}>
              ALREADY HAVE AN ACCOUNT? <span style={{color: "var(--color-crimson)", fontWeight: "700"}}>LOGIN</span>
            </p>
          </div>

          <button 
            type="submit" 
            className='donsignbtn'
            disabled={!click || isLoading}
          >
            {isLoading ? <FadeLoader color="white" size={20}/> : "REGISTER"}
          </button>
        </form>
      </div>

      {/* VISUAL BENEFITS PANEL - NOW AT THE BOTTOM */}
      <div className='donorsign-visual-panel'>
        <div className='donor-benefits-box'>
          <span className='donor-benefits-badge'>DONOR NETWORK</span>
          <h2 className='donor-benefits-title'>Join our lifesaving community of heroes.</h2>
          <p className='donor-benefits-subtitle'>
            A single blood donation can save up to three lives. Register today to track your impact, manage emergency requests, and bridge the gap.
          </p>

          <div className='donor-benefits-grid'>
            <div className='donor-benefit-card'>
              <div className='donor-icon-frame'>
                <LuBellRing size={20} />
              </div>
              <div className='donor-benefit-text'>
                <h3>Smart Match Alerts</h3>
                <p>Receive real-time notifications when hospitals nearby urgently request your blood type.</p>
              </div>
            </div>

            <div className='donor-benefit-card'>
              <div className='donor-icon-frame'>
                <LuActivity size={20} />
              </div>
              <div className='donor-benefit-text'>
                <h3>Impact Tracking</h3>
                <p>Monitor past donations, access health metrics, and view real lives influenced.</p>
              </div>
            </div>

            <div className='donor-benefit-card'>
              <div className='donor-icon-frame'>
                <LuHeartHandshake size={20} />
              </div>
              <div className='donor-benefit-text'>
                <h3>Seamless Ecosystem</h3>
                <p>Connect securely with verified healthcare institutions under strict privacy parameters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donorssignup;
import React, { useState } from 'react';
import '../../Esther/styles/hospitalsign.css';
import { Link, useNavigate } from 'react-router-dom';
import FadeLoader from 'react-spinners/CircleLoader';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import { LuEye, LuEyeClosed, LuShieldCheck, LuActivity, LuBuilding2 } from 'react-icons/lu';
import { toast } from 'sonner';
import axios from 'axios';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;

const Hospitalsignup = () => {
  const [click, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hospitalInput, setHospitalInput] = useState({
    fullName: "",
    email: "",
    password: "",
    location: "",
    city: "",
    phone: "",
    role: "hospital",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hospitalInput.fullName || !hospitalInput.email || !hospitalInput.password || !hospitalInput.location || !hospitalInput.city || !hospitalInput.phone) {
      toast.error('Please fill in all fields');
      return;
    }
    if (hospitalInput.password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${VITE_BASEURL_REN}/hospital/register`,
        hospitalInput,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (res?.status === 201) {
        toast.success(res?.data?.message || "Registration successful!");
      }

      localStorage.setItem("email", hospitalInput.email);
      localStorage.setItem("pendingUserType", "hospital");

      setTimeout(() => {
        nav('/checkmail', {
          state: {
            email: hospitalInput.email,
            userType: "hospital"
          }
        });
      }, 1000);

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const lagosLGAs = [
    { label: "Agege", value: "Agege" },
    { label: "Ajeromi-Ifelodun", value: "Ajeromi-Ifelodun" },
    { label: "Alimosho", value: "Alimosho" },
    { label: "Amuwo-Odofin", value: "Amuwo-Odofin" },
    { label: "Apapa", value: "Apapa" },
    { label: "Badagry", value: "Badagry" },
    { label: "Epe", value: "Epe" },
    { label: "Eti-Osa", value: "Eti-Osa" },
    { label: "Ibeju-Lekki", value: "Ibeju-Lekki" },
    { label: "Ifako-Ijaiye", value: "Ifako-Ijaiye" },
    { label: "Ikeja", value: "Ikeja" },
    { label: "Ikorodu", value: "Ikorodu" },
    { label: "Kosofe", value: "Kosofe" },
    { label: "Lagos Island", value: "Lagos Island" },
    { label: "Lagos Mainland", value: "Lagos Mainland" },
    { label: "Mushin", value: "Mushin" },
    { label: "Ojo", value: "Ojo" },
    { label: "Oshodi-Isolo", value: "Oshodi-Isolo" },
    { label: "Shomolu", value: "Shomolu" },
    { label: "Surulere", value: "Surulere" },
  ];

  return (
    <div className='hospitalsignwrapper'>
      {/* Mobile Top Header */}
      <div className='hossignmobilewrap'>
        <div className='smallarrow'><IoArrowBackCircleOutline onClick={() => nav(-1)} /></div>
        <h1>CREATE AN ACCOUNT</h1>
        <p>REGISTER AS HOSPITAL / BLOODBANK</p>
      </div>

      {/* INPUT FORM PANEL - AT THE TOP */}
      <div className='hospisigninfowrap'>
        <div className='hospisignlogohold'>
          <Link to="/">
            <img src="/images/Slodat.jpeg" alt="Logo" className='hospisignlogo' />
          </Link>
          <HiOutlineArrowCircleLeft size={38} className="desktop-back-btn" onClick={() => nav(-1)} />
        </div>

        <form className='hospisigninfo1' onSubmit={handleSubmit}>
          <h1 className="form-main-title">REGISTER AS HOSPITAL / BLOODBANK</h1>

          <div className='hossigninputwrapper'>
            <p>FACILITY NAME</p>
            <input type="text" placeholder='FACILITY NAME' className='hossigninput'
              value={hospitalInput.fullName}
              onChange={(e) => setHospitalInput((prev) => ({ ...prev, fullName: e.target.value }))}
            />
          </div>

          <div className='hossigninputwrapper'>
            <p>OFFICE ADDRESS</p>
            <input type="text" placeholder='ADDRESS' className='hossigninput'
              value={hospitalInput.location}
              onChange={(e) => setHospitalInput((prev) => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div className='hossigninputwrapper'>
            <p>LGA</p>
            <select
              className="hossigninput select-input"
              value={hospitalInput.city}
              onChange={(e) => setHospitalInput((prev) => ({ ...prev, city: e.target.value }))}
              id="localGovernment"
              name="LGA"
            >
              <option value="">Select your LGA</option>
              {lagosLGAs.map((item, index) => (
                <option key={index} value={item.value}>{item.value}</option>
              ))}
            </select>
          </div>

          <div className='hossigninputwrapper'>
            <p>EMAIL</p>
            <input type="email" placeholder='you@example.com' className='hossigninput'
              value={hospitalInput.email}
              onChange={(e) => setHospitalInput((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className='hossigninputwrapper'>
            <p>PHONE NUMBER</p>
            <input type="text" placeholder='+234**********' className='hossigninput'
              value={hospitalInput.phone}
              onChange={(e) => setHospitalInput((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div className='hossigninputwrapper'>
            <p>CREATE PASSWORD</p>
            <div className="inputAndIcon">
              <input
                type={showPassword1 ? "password" : "text"}
                className='donorssignpasswordinput'
                placeholder='Create Password'
                value={hospitalInput.password}
                onChange={(e) => setHospitalInput(prev => ({ ...prev, password: e.target.value }))}
              />
              {showPassword1 ? <LuEyeClosed onClick={() => setShowPassword1(false)} /> : <LuEye onClick={() => setShowPassword1(true)} />}
            </div>
          </div>

          <div className='hossigninputwrapper password-confirm-field'>
            <p>CONFIRM PASSWORD</p>
            <div className="inputAndIcon">
              <input
                type={showPassword2 ? "password" : "text"}
                className='donorssignpasswordinput'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showPassword2 ? <LuEyeClosed onClick={() => setShowPassword2(false)} /> : <LuEye onClick={() => setShowPassword2(true)} />}
            </div>
          </div>

          <div className='checkboxwrapper'>
            <input 
              type="checkbox"
              id="termsCheckbox"
              checked={click}
              onChange={(e) => setClick(e.target.checked)}
              required
            />
            <label htmlFor="termsCheckbox">
              I agree to the{" "}
              <span onClick={() => nav("/hospiterms")} className='tandc'>
                TERMS AND CONDITIONS
              </span>
            </label>
          </div>

          <div className='hosloginforgotwrap'>
            <p onClick={() => nav("/hospitallogin")}>
              ALREADY HAVE AN ACCOUNT? <span style={{color: "var(--color-crimson)", fontWeight: "700"}}>LOGIN</span>
            </p>
          </div>

          <button type="submit" className='hospibtn' disabled={!click || isLoading}>
            {isLoading ? <FadeLoader color="white" size={20} /> : "REGISTER"}
          </button>
        </form>
      </div>

      {/* VISUAL BENEFITS PANEL - AT THE BOTTOM */}
      <div className='hospisign-visual-panel'>
        <div className='hos-benefits-box'>
          <span className='hos-benefits-badge'>HEALTHCARE HUB</span>
          <h2 className='hos-benefits-title'>Streamline requests & blood logistics.</h2>
          <p className='hos-benefits-subtitle'>
            Empower your clinical facility with direct ecosystem routing. Source verified donors rapidly, minimize administrative dispatch overhead, and track processing states.
          </p>

          <div className='hos-benefits-grid'>
            <div className='hos-benefit-card'>
              <div className='hos-icon-frame'>
                <LuBuilding2 size={20} />
              </div>
              <div className='hos-benefit-text'>
                <h3>Centralized Registry</h3>
                <p>Broadcast critical matching parameters straight to optimal surrounding blood group chains instantly.</p>
              </div>
            </div>

            <div className='hos-benefit-card'>
              <div className='hos-icon-frame'>
                <LuActivity size={20} />
              </div>
              <div className='hos-benefit-text'>
                <h3>Inventory Controls</h3>
                <p>Track request fulfillments with institutional transparency metrics from point-of-care to collection pipelines.</p>
              </div>
            </div>

            <div className='hos-benefit-card'>
              <div className='hos-icon-frame'>
                <LuShieldCheck size={20} />
              </div>
              <div className='hos-benefit-text'>
                <h3>Secure Standards</h3>
                <p>Operate under strict clinical validation privacy frameworks ensuring robust institutional communication safety.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitalsignup;
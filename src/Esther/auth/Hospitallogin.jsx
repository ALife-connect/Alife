import React, { useState, useEffect } from "react";
import "../../Esther/styles/hospitalslog.css";
import { Link, useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/CircleLoader";
import { useDispatch } from "react-redux";
import { logIn, saveToken } from "../../global/Slice";
import axios from "axios";
import { LuEye, LuEyeClosed, LuShieldCheck, LuActivity, LuDatabase, LuBell } from "react-icons/lu";
import { toast } from "sonner";
// import { IoArrowBackCircleOutline } from "react-index-bootstrap"; // Adjusted or falling back to raw io5 imported below
import { IoArrowBackCircleOutline as ArrowIcon } from "react-icons/io5";

const VITE_BASEURL = import.meta.env.VITE_BASEURL;

const Hospitallogin = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hospitalLoginData, setHospitalLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword1, setShowPassword1] = useState(true);

  // ✅ Detect token expiry automatically
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = Date.now() >= payload.exp * 1000;
        if (isExpired) {
          localStorage.removeItem("token");
          toast.error("Session expired. Please log in again.");
          nav("/login");
        }
      } catch (err) {
        console.error("Token check failed:", err);
      }
    };

    const interval = setInterval(checkTokenExpiry, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [nav]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hospitalLoginData.email || !hospitalLoginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!VITE_BASEURL) {
      toast.error("Base URL is missing. Check your environment variables.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${VITE_BASEURL}/hospital/login`, hospitalLoginData);

      const status = res?.data?.status;
      const message = res?.data?.data?.message || res?.data?.message || "Login successful";

      if (status || res?.data?.data) {
        toast.success(message);

        // ✅ Save user data + token in Redux and localStorage
        dispatch(logIn(res?.data?.data));
        dispatch(saveToken(res?.data?.token));
        localStorage.setItem("token", res?.data?.token);

        // Redirect after 1 second
        setTimeout(() => {
          setIsLoading(false);
          nav("/dashboard");
        }, 1000);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || "Something went wrong during login.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hosloginwrapper">
      {/* Mobile Top Header Banner */}
      <div className="hoslogmobilewrap">
        <div className="smallarrow">
          <ArrowIcon onClick={() => nav(-1)} />
        </div>
        <h2>LOG IN</h2>
      </div>

      {/* New Desktop Left Panel: Hospital Benefits Display */}
      <div className="hoslogin-visual-panel">
        <div className="hospital-benefits-box">
          <span className="hospital-benefits-badge">INSTITUTIONAL PORTAL</span>
          <h1 className="hospital-benefits-title">Streamline Your Blood Logistics</h1>
          <p className="hospital-benefits-subtitle">
            Access secure tools designed to coordinate patient requests, cross-match donor components, and track real-time inventory levels.
          </p>

          <div className="hospital-benefits-grid">
            <div className="hospital-benefit-card">
              <div className="hospital-icon-frame"><LuDatabase size={22} /></div>
              <div className="hospital-benefit-text">
                <h3>Live Inventory Monitoring</h3>
                <p>Track ready-to-use blood units, rare groups, and component allocations inside your bank pool instantly.</p>
              </div>
            </div>

            <div className="hospital-benefit-card">
              <div className="hospital-icon-frame"><LuBell size={22} /></div>
              <div className="hospital-benefit-text">
                <h3>Priority Emergency Requests</h3>
                <p>Broadcast urgent emergency requests directly to targeted compatible donor channels matching your requirements.</p>
              </div>
            </div>

            <div className="hospital-benefit-card">
              <div className="hospital-icon-frame"><LuShieldCheck size={22} /></div>
              <div className="hospital-benefit-text">
                <h3>Verified Medical Logs</h3>
                <p>Review comprehensive electronic donor screening metrics, donor histories, and dynamic health status markers.</p>
              </div>
            </div>

            <div className="hospital-benefit-card">
              <div className="hospital-icon-frame"><LuActivity size={22} /></div>
              <div className="hospital-benefit-text">
                <h3>Automated Compliance Tracking</h3>
                <p>Generate clean analytics, export clinical tracking histories, and simplify reporting protocols seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Interaction Panel */}
      <div className="hoslogininfowrap">
        <div className="hosloginlogohold">
          <Link to="/">
            <img src="/images/Slodat.jpeg" alt="Logo" className="hosloginlogo" />
          </Link>
        </div>

        <div className="hoslogininfo1">
          <h2>LOG IN</h2>

          <div className="hoslogininputwrapper">
            <p>EMAIL ADDRESS</p>
            <input
              type="email"
              placeholder="ENTER EMAIL"
              className="hoslogininput"
              value={hospitalLoginData.email}
              onChange={(e) =>
                setHospitalLoginData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))}
            />
          </div>

          <div className="hoslogininputwrapper">
            <p>ENTER PASSWORD</p>
            <div className="donorlogininputAndIcon">
              <input
                type={showPassword1 ? "password" : "text"}
                className="donorssignpasswordinput"
                placeholder="Password"
                value={hospitalLoginData.password}
                onChange={(e) =>
                  setHospitalLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              {showPassword1 ? (
                <LuEyeClosed onClick={() => setShowPassword1(false)} />
              ) : (
                <LuEye onClick={() => setShowPassword1(true)} />
              )}
            </div>
          </div>

          <button className="hosloginbtn" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <FadeLoader color="white" size={25} /> : "LOG-IN"}
          </button>

          <div className="hosloginforgotwrap">
            <p onClick={() => nav("/hospitalsignup")}>
              DON'T HAVE AN ACCOUNT?{" "}
              <span style={{ color: "blue", cursor: "pointer" }}>SIGNUP</span>
            </p>
            <p onClick={() => nav("/forgotpassword")}>FORGOT PASSWORD</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitallogin;
import React, { useState, useEffect } from "react";
import "../../Esther/styles/hospitalslog.css";
import { Link, useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/CircleLoader";
import { useDispatch } from "react-redux";
import { logIn, saveToken } from "../../global/Slice";
import axios from "axios";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { toast } from "sonner";
import { IoArrowBackCircleOutline } from "react-icons/io5";

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
      <div className="hoslogmobilewrap">
        <div className="smallarrow">
          <IoArrowBackCircleOutline onClick={() => nav(-1)} />
        </div>
        <h2>LOG IN</h2>
      </div>

      <div className="hoslogininfowrap">
        <div className="hosloginlogohold">
          <Link to="/">
            <img src="/images/alifenobg.png" alt="Logo" className="hosloginlogo" />
          </Link>
        </div>

        <div className="hoslogininfo1">
          <h2>LOG IN</h2>

          {/* Inputs remain unchanged */}
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
                }))
              }
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

      <img src="/images/Subtract.png" alt="" className="hospiloginimage" />
    </div>
  );
};

export default Hospitallogin;

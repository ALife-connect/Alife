import React, { useEffect, useState } from "react";
import "../../components/header/header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { MdHistory, MdVerified, MdCircleNotifications } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";
import { VscHome, VscTools } from "react-icons/vsc";
import { GoPeople } from "react-icons/go";
import { IoList } from "react-icons/io5";
import { PiGitPullRequest } from "react-icons/pi";
import { BiGitPullRequest } from "react-icons/bi";
import { CiLogout, CiSettings, CiLogin, CiUser } from "react-icons/ci";
import { HiUsers } from "react-icons/hi2";
import { handleLogout } from "../../global/Api";
import { useDispatch, useSelector } from "react-redux";
import LoadComponents from "../componentsLoadScreen/LoadComponents";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;

const Header = () => {
  const [logoutPopUp, setLogoutPopUp] = useState(false);
  const [loadLogOut, setLoadLogOut] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isFixed, setIsFixed] = useState(false);

  const isSignedIn = useSelector((state) => state?.isLoggedIn);
  const userInfo = useSelector((state) => state?.loggedInUser);
  const token = useSelector((state) => state?.token);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();

  // Dynamic routing based strictly on authentication state and user role
  const getNavLinks = () => {
    if (!isSignedIn) {
      return [
        { name: "Home", path: "/", icon: <VscHome size={22} /> },
        { name: "About Us", path: "/about", icon: <GoPeople size={22} /> },
        { name: "How it Works", path: "/howitworks", icon: <VscTools size={22} /> },
        { name: "Login", path: "/login", icon: <CiLogin size={22} /> },
        { name: "Sign Up", path: "/signup", icon: <CiUser size={22} /> },
      ];
    }

    const role = userInfo?.role;
    let links = [{ name: "Home", path: "/", icon: <VscHome size={22} /> }];

    if (role === "donor") {
      links.push(
        { name: "Find Hospital", path: "/dashboard/findhospital", icon: <TbHomeSearch size={22} /> },
        { name: "Requests", path: "/dashboard/hospitalsrequest", icon: <BiGitPullRequest size={22} /> },
        { name: "History", path: "/dashboard/history", icon: <MdHistory size={22} /> },
        { name: "Settings", path: "/dashboard/settings", icon: <CiSettings size={22} /> }
      );
    } else if (role === "hospital") {
      links.push(
        { name: "Make Request", path: "/dashboard/request", icon: <PiGitPullRequest size={22} /> },
        { name: "History", path: "/dashboard/requesthistory", icon: <MdHistory size={22} /> },
        { name: "Appointment", path: "/dashboard/appointment", icon: <IoList size={22} /> },
        { name: "Settings", path: "/dashboard/hospitalsettings", icon: <CiSettings size={22} /> }
      );
    } else if (role === "admin") {
      links = [
        { name: "Verification", path: "/dashboard/adminverification", icon: <MdVerified size={22} /> },
        { name: "Users", path: "/dashboard/allusers", icon: <HiUsers size={22} /> },
        { name: "Settings", path: "/dashboard/settings", icon: <CiSettings size={22} /> }
      ];
    }
    return links;
  };

  const currentLinks = getNavLinks();

  const handleSubmit = () => {
    handleLogout(VITE_BASEURL_REN, nav, token, dispatch, setLoadLogOut, setLogoutPopUp);
  };

  const getDonorNotification = async (token, setNotifications) => {
    try {
      const res = await axios.get(`${VITE_BASEURL_REN}/donor/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res?.data?.notifications || []);
    } catch (err) {
      console.error("Notification Error:", err);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    if (!token) return;
    getDonorNotification(token, setNotifications);
    const interval = setInterval(() => {
      getDonorNotification(token, setNotifications);
    }, 10000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loadLogOut) {
    return <LoadComponents />;
  }

  const hasUnreadNotifications = notifications?.some(n => !n.isRead);

  return (
    <>
      {/* Desktop Navigation Header */}
      <div className={`headerwrapper ${isFixed ? "headerwrapperfixed" : ""}`} data-aos="fade-down">
        <div className="HeaderInnerWrapper">
          <div className="headerwrapperinner1" onClick={() => nav("/")} style={{ cursor: "pointer" }}>
            <img src="/images/Slodat.jpeg" alt="LifeLink Logo" className="logo-breath" />
            <h1> SLODAT</h1>
          </div>
          
          <div className="headerwrapperinner2" data-aos="fade-up">
            <ul className="headerul">
              {currentLinks.map((link, idx) => (
                <li
                  key={idx}
                  className={`${link.path === location.pathname ? "text-red-500 font-bold" : "text-gray-700"} capitalize text-[14px] font-medium hover:text-red-400 transition-all`}
                >
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="headerwrapperinner3">
            {isSignedIn ? (
              <div className="desktopAuthContainer">
                <div className="desktopNotificationBtn" onClick={() => nav(userInfo?.role === "donor" ? "/dashboard/hospitalsrequest" : "/dashboard/appointment")}>
                  <MdCircleNotifications size={28} />
                  {hasUnreadNotifications && <span className="desktopNotificationBadge"></span>}
                </div>
                <div className="headerProfilePic" onClick={() => nav("/dashboard")}>
                  <img 
                    src={userInfo?.profilePics || userInfo?.profilePicture || "/images/default profile pic.jpg"} 
                    alt="Profile" 
                  />
                </div>
                <button className="desktopLogoutBtn" onClick={() => setLogoutPopUp(true)}>
                  <CiLogout size={20} />
                </button>
              </div>
            ) : (
              <div className="headerwrapperinner3_guest">
                <Link to="/login"><button className="headerbtn">Log In</button></Link>
                <Link to="/signup"><button className="headerbtn1">Sign Up</button></Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Top Header (Minimal Branding) */}
      <div className="MobileTopBrandingBar">
        <div className="mobileHeaderLogo" onClick={() => nav("/")}>
          <img src="/images/Slodat.jpeg" alt="LifeLink Logo" className="logo-breath" />
          <h1>SLODAT</h1>
        </div>
        {isSignedIn && (
          <div className="mobileTopNotification" onClick={() => nav(userInfo?.role === "donor" ? "/dashboard/hospitalsrequest" : "/dashboard/appointment")}>
            <MdCircleNotifications size={28} />
            {hasUnreadNotifications && <span className="mobileNotificationBadge"></span>}
          </div>
        )}
      </div>

      {/* Modern Floating Bottom Dock (No Drawer / Direct Links) */}
      <div className="MobileFloatingBottomNav">
        <div className="bottomNavScrollContainer">
          {currentLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <div key={idx} className={`bottomNavIcon ${isActive ? "activeNavIcon" : ""}`} onClick={() => nav(link.path)}>
                {link.icon}
                <span>{link.name}</span>
              </div>
            );
          })}
          
          {isSignedIn && (
            <div className="bottomNavIcon logoutStyle" onClick={() => setLogoutPopUp(true)}>
              <CiLogout size={22} />
              <span>Logout</span>
            </div>
          )}
        </div>
      </div>

      {/* Universal Logout Modal */}
      <Modal open={logoutPopUp} footer={false} onCancel={() => setLogoutPopUp(false)}>
        <div className="mobileLogoutPopUp">
          <h1>Are you sure you want to <br /> <b>Logout?</b></h1>
          <div className="mobileLogoutWrapper">
            <button className="MobileLogoutBtn" onClick={() => setLogoutPopUp(false)}>Cancel</button>
            <button onClick={handleSubmit}>Logout</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
import React, { useEffect, useState } from "react";
import "../../components/header/header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Drawer, Modal } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdEdit, MdHistory, MdVerified, MdCircleNotifications } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";
import { VscHome, VscTools } from "react-icons/vsc";
import { GoPeople, GoUnread } from "react-icons/go";
import { IoList } from "react-icons/io5";
import { PiGitPullRequest } from "react-icons/pi";
import { BiGitPullRequest } from "react-icons/bi";
import { CiLogout, CiSettings } from "react-icons/ci";
import { HiUsers } from "react-icons/hi2";
import { handleLogout } from "../../global/Api";
import { useDispatch, useSelector } from "react-redux";
import LoadComponents from "../componentsLoadScreen/LoadComponents";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const VITE_BASEURL = import.meta.env.VITE_BASEURL;
const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;

const Header = () => {
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  const [logoutPopUp, setLogoutPopUp] = useState(false);
  const [loadLogOut, setLoadLogOut] = useState(false);
  const [notificationSideBar, setNotificationSideBar] = useState(false);
  const [openedMessageIndex, setOpenedMessageIndex] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isFixed, setIsFixed] = useState(false);

  const isSignedIn = useSelector((state) => state?.isLoggedIn);
  const userInfo = useSelector((state) => state?.loggedInUser);
  const token = useSelector((state) => state?.token);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "home", path: "/" },
    { name: "about us", path: "/about" },
    { name: "How it Works", path: "/howitworks" },
  ];

  const handleSubmit = () => {
    handleLogout(VITE_BASEURL, nav, token, dispatch, setLoadLogOut, setLogoutPopUp);
  };

  // ✅ FIX 1: Use dynamic environment base URL instead of hardcoded one
  const getDonorNotification = async (token, setNotifications) => {
    try {
      const res = await axios.get(`${VITE_BASEURL_REN}/donor/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(res?.data?.notifications || []);
    } catch (err) {
      console.error("Notification Error:", err);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getDonorNotification(token, setNotifications);
    }, 10000);

    getDonorNotification(token, setNotifications);

    return () => clearInterval(interval);
  }, [token]);

  // ✅ FIX 2: Call getDonorNotification() correctly with parameters after marking as read
  const markNotificationAsRead = async (id) => {
    try {
      await axios.put(
        `${VITE_BASEURL_REN}/donor/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getDonorNotification(token, setNotifications);
    } catch (err) {
      console.error("Mark Read Error:", err);
    }
  };

  const handleOpenedMessageToggle = (index) => {
    setOpenedMessageIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerNamePrompt = userInfo?.fullName?.split(" ")?.[0];

  if (loadLogOut) {
    return <LoadComponents />;
  }

  const donationTips = [
    "Stay hydrated! Drink plenty of water before and after your donation.",
    "Eat a healthy meal before donating — avoid fatty foods.",
    "Get enough sleep the night before your donation.",
    "Wear a short-sleeved shirt or sleeves that roll up easily.",
    "Let the staff know if you’re nervous — they’re here to help!",
    "After donating, rest for a few minutes and enjoy your snack!",
    "Don’t lift heavy items for at least 24 hours after donating.",
    "Tell your friends! You might inspire them to donate too.",
    "You can donate again after 8 weeks — set a reminder!",
    "Donating blood saves lives. One pint can help up to 3 people.",
    "Not feeling well? Reschedule your appointment. Your health comes first.",
    "Iron-rich foods like spinach, meat, or beans help you recover faster.",
    "Be honest during screening. It ensures the safety of both you and the patient.",
    "You’re a hero. Thank you for making a difference!",
  ];

  const hospitalTips = [
    "✅ Keep your hospital profile and KYC documents updated for better visibility.",
    "⏱️ Respond to donor matches quickly to avoid losing opportunities.",
    "🩸 Clearly list your required blood types and update needs in real time.",
    "🛋️ Provide a clean, comfortable, and welcoming environment for donors.",
    "📲 Log in regularly to stay active and manage donation requests promptly.",
    "👨‍⚕️ Train staff to treat donors with respect and professionalism.",
    "💌 Send a thank-you message after donations to build long-term trust.",
    "📊 Use dashboard analytics to track donation trends and optimize planning.",
    "📣 Promote your hospital's presence on social media and local platforms.",
    "🛡️ Stay compliant with all health and safety regulations to ensure donor confidence.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentIndex((prev) => {
          if (userInfo?.role === "donor") {
            return (prev + 1) % donationTips.length;
          } else {
            return (prev + 1) % hospitalTips.length;
          }
        });
        setFadeClass("fade-in");
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [userInfo?.role]);



  return (
    <>
      <div className={`headerwrapper ${isFixed ? "headerwrapperfixed" : ""}`} data-aos="fade-down">
        <div className="HeaderInnerWrapper">
          <div className="headerwrapperinner1">
            <img src="/images/alifenobg.png" alt="LifeLink Logo" className="logo-breath" />
          </div>
          <div className="headerwrapperinner2" data-aos="fade-up">
            <ul className="headerul">
              {navLinks.map((link, idx) => (
                <li
                  key={idx}
                  className={`${link.path === location.pathname &&
                    "text-black border-b-2 border-red-300"
                    } capitalize text-[14px] font-medium hover:text-red-300 transition-all`}
                >
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          {isSignedIn ? (
            <div className="headerProfilePic" onClick={() => nav("/dashboard")} data-aos="flip-left">
              {
                userInfo?.profilePics || userInfo?.profilePicture ? <img src={userInfo?.profilePics || userInfo?.profilePicture} alt="profile Picture" className='profileAvatar' /> : <img src="/images/default profile pic.jpg" alt="profile Picture" className='profileAvatar' />
              }
            </div>
          ) : (
            <div className="headerwrapperinner3" data-aos="fade-left">
              <Link to={"/signup"}>
                <button className="headerbtn" data-aos="zoom-in" data-aos-delay="200">Sign Up</button>
              </Link>
              <Link to={"/login"}>
                <button className="headerbtn1" data-aos="zoom-in" data-aos-delay="400">Log In</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="MobileHeader" data-aos="fade-down">
        <img
          src="/images/public/images/alifenobg.png"
          alt="LifeLink Logo"
          onClick={() => nav("/")}
          className="logo-breath"
          data-aos="zoom-in"
        />
        <div className="dashboardHeaderSearchWrapper" data-aos="fade-up"
          data-aos-delay="300">
          {userInfo.role === "donor" ? <div className="carousel-card">
            <p className={`carousel-text ${fadeClass}`}>
              {donationTips[currentIndex]}
            </p>
          </div> : <div className="carousel-card">
            <p className={`carousel-text ${fadeClass}`}>
              {hospitalTips[currentIndex]}
            </p>
          </div>}
        </div>

        <RxHamburgerMenu size={30} onClick={() => setOpenSideDrawer(true)} data-aos="fade-left" />
      </div>
      <div className="mobileHeaderWrapperPusher"></div>

      <Drawer open={openSideDrawer} onClose={() => setOpenSideDrawer(false)}>
        <div className="sideDrawerNavigateHolder">
          <ul>
            {isSignedIn ? (
              <div
                className="mobileSideBarProfileNav"
                onClick={() => {
                  setOpenSideDrawer(false);
                  nav("/dashboard");
                }}
              >
                <div className="MobileSideProfilePic">
                  {
                    userInfo.profilePics || userInfo?.profilePicture ? <img src={userInfo.profilePics || userInfo?.profilePicture} alt="" /> : <img src="/images/default profile pic.jpg" alt="" />
                  }
                </div>
                <div className="MobileSideProfileName">
                  <h1>{userInfo?.fullName}</h1>
                  <span>{userInfo?.bloodType}</span>
                </div>

                <div className="notificationIconWrapper" onClick={() => setNotificationSideBar(true)} data-aos="fade-left">
                  <MdCircleNotifications size={30} cursor='pointer' />
                  {notifications?.some(n => !n.isRead) && (
                    <span className="notificationDot">.</span>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="mobileSideBarProfileNav"
                onClick={() => {
                  setOpenSideDrawer(false);
                  nav("/authentry");
                }}
              >
                <div className="MobileSideProfilePic">
                  <img src="/images/default profile pic.jpg" alt="" />
                </div>
                <div className="MobileSideProfileName">
                  <h1 style={{ fontSize: 35 }}>Visitor</h1>
                </div>

                <div className="mobileSideBarIcon">
                  <MdEdit />
                </div>
              </div>
            )}

            {isSignedIn ? (
              userInfo?.role === "donor" ? (
                <>
                  <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      nav("/");
                    }}
                  >
                    <VscHome className="sideBarIocns" color="black" data-aos="fade-in" />
                    Home
                  </li>
                  <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      setNotificationSideBar(false)
                      nav("/dashboard/findhospital");
                    }}
                  >
                    <TbHomeSearch className="sideBarIocns" color="black" />
                    Find Hospital
                  </li>
                  <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      nav("/dashboard/hospitalsrequest");
                    }}
                  >
                    <BiGitPullRequest className="sideBarIocns" color="black" />
                    Requests
                  </li>
                  <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      nav("/about");
                    }}
                  >
                    <GoPeople className="sideBarIocns" color="black" />
                    About Us
                  </li>
                  <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      nav("/howitworks");
                    }}
                  >
                    <CiSettings className="sideBarIocns" color="black" />
                    How it works
                  </li>
                  <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      nav("/dashboard/history");
                    }}
                  >
                    <MdHistory className="sideBarIocns" color="black" />
                    History
                  </li>
                  <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      nav("/dashboard/settings");
                    }}
                  >
                    <CiSettings className="sideBarIocns" color="black" />
                    Settings
                  </li>
                  <li
                    style={{ color: "red" }}
                    onClick={() => setLogoutPopUp(true)}
                  >
                    <CiLogout />
                    Logout
                  </li>
                </>
              ) : userInfo?.role === "admin" ? (
                <>
                  {/* <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      nav("/dashboard/adminblacklist");
                    }}
                  >
                    <IoIosListBox className="sideBarIocns" color="black" />
                    Black List
                  </li> */}
                  <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      nav("/dashboard/adminverification");
                    }}
                  >
                    <MdVerified className="sideBarIocns" color="black" />
                    Verification
                  </li>
                  <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      nav("/dashboard/allusers");
                    }}
                  >
                    <HiUsers className="sideBarIocns" color="black" />
                    Users
                  </li>
                  <li
                    onClick={() => {
                      setOpenSideDrawer(false);
                      nav("/dashboard/settings");
                    }}
                  >
                    <CiSettings className="sideBarIocns" color="black" />
                    Settings
                  </li>
                  <li
                    style={{ color: "red" }}
                    onClick={() => setLogoutPopUp(true)}
                  >
                    <CiLogout />
                    Logout
                  </li>
                </>) : userInfo?.role === "hospital" ? (
                  <>
                    <li
                      onClick={() => {
                        setOpenSideDrawer(false);
                        nav("/");
                      }}
                    >
                      <VscHome className="sideBarIocns" color="black" />
                      Home
                    </li>

                    <li
                      onClick={() => {
                        setOpenSideDrawer(false);
                        nav("/dashboard/request");
                      }}
                    >
                      <PiGitPullRequest className="sideBarIocns" color="black" />
                      Make Request
                    </li>
                    <li
                      onClick={() => {
                        setOpenSideDrawer(false);
                        nav("/about");
                      }}
                    >
                      <GoPeople className="sideBarIocns" color="black" />
                      About Us
                    </li>
                    <li
                      onClick={() => {
                        setOpenSideDrawer(false);
                        nav("/howitworks");
                      }}
                    >
                      <VscTools className="sideBarIocns" color="black" />
                      How it works
                    </li>
                    <li
                      onClick={() => {
                        setOpenSideDrawer(false);
                        nav("/dashboard/requesthistory");
                      }}
                    >
                      <MdHistory className="sideBarIocns" color="black" />
                      Request History
                    </li>
                    <li
                      onClick={() => {
                        setOpenSideDrawer(false);
                        nav("/dashboard/appointment");
                      }}
                    >
                      <IoList className="sideBarIocns" color="black" />
                      Appointment
                    </li>
                    {/* <li
                      onClick={() => {
                        setOpenSideDrawer(false);
                        nav("/dashboard/records");
                      }}
                    >
                      <MdOutlineHistoryToggleOff className="sideBarIocns" color="black" />
                      Records
                    </li> */}
                    <li
                      onClick={() => {
                        setOpenSideDrawer(false);
                        nav("/dashboard/hospitalsettings");
                      }}
                    >
                      <CiSettings className="sideBarIocns" color="black" />
                      Settings
                    </li>
                    <li
                      style={{ color: "red" }}
                      onClick={() => setLogoutPopUp(true)}
                    >
                      <CiLogout />
                      Logout
                    </li>
                  </>
                ) : null
            ) : (
              <>
                <button onClick={() => nav("/login")}>Login</button>
                <button onClick={() => nav("/signup")}>Signup</button>
                <li
                  onClick={() => {
                    setOpenSideDrawer(false);
                    nav("/");
                  }}
                >
                  <VscHome />
                  Home
                </li>
                <li
                  onClick={() => {
                    setOpenSideDrawer(false);
                    nav("/about");
                  }}
                >
                  <GoPeople />
                  About Us
                </li>
                <li
                  onClick={() => {
                    setOpenSideDrawer(false);
                    nav("/howitworks");
                  }}
                >
                  <CiSettings />
                  How it works
                </li>
              </>
            )}
          </ul>
        </div>
      </Drawer>

      <Modal
        open={logoutPopUp}
        footer={false}
        onCancel={() => setLogoutPopUp(false)}
      >
        <div className="mobileLogoutPopUp">
          <h1>
            Are you sure you want to <br /> <b>Logout?</b>
          </h1>

          <div className="mobileLogoutWrapper">
            <button
              className="MobileLogoutBtn"
              onClick={() => setLogoutPopUp(false)}
            >
              Cancel
            </button>
            <button onClick={handleSubmit}>Logout</button>
          </div>
        </div>
      </Modal>







      <Drawer
        open={notificationSideBar}
        onClose={() => setNotificationSideBar(false)}
        title="Notifications"
      >
        {userInfo?.role === "donor" ? <div className="notificationsWrapper">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="notificationsCardsWrap"
                onClick={() => handleOpenedMessageToggle(index)}
              >
                <h1>{notification.from} {!notification.isRead && <GoUnread />}</h1>
                {openedMessageIndex === index && (
                  <>
                    <span>{notification.message}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationAsRead(notification._id);
                        nav(`/hospitalsrequestdetails/${notification?.appointmentId || notification?.requestId}`);;
                        setNotificationSideBar(false);
                        setOpenSideDrawer(false);
                      }}
                    >
                      View Hospital
                    </button>
                    <p>{new Date(notification.date).toLocaleString()}</p>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No notifications yet 📭</p>
          )}
        </div> : userInfo?.role === "hospital" ? <div className="notificationsWrapper">
          {userInfo?.notifications?.length > 0 ? (
            userInfo?.notifications?.map((notification, index) => (
              <div
                key={index}
                className="notificationsCardsWrap"
                onClick={() => handleOpenedMessageToggle(index)}
              >
                <h1>{notification.from} {!notification.isRead && <GoUnread />}</h1>
                {openedMessageIndex === index && (
                  <>
                    <span>{notification.message}</span>
                    <p>{new Date(notification.date).toLocaleString()}</p>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No notifications yet 📭</p>
          )}
        </div> : null}
      </Drawer>
    </>
  );
};

export default Header;
import React, { useEffect, useState } from 'react';
import './dashboardHeader.css';
import { MdCircleNotifications } from "react-icons/md";
import { Drawer } from 'antd';
import { GoUnread } from "react-icons/go";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { IoMdRefreshCircle } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';

const Base_Url = import.meta.env.VITE_BASEURL;
const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;

const DashBoardHeader = () => {
  const loggedInUser = useSelector((state) => state?.loggedInUser);
  const token = useSelector((state) => state?.token);

  const [notificationSideBar, setNotificationSideBar] = useState(false);
  const [openedMessageIndex, setOpenedMessageIndex] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  const nav = useNavigate();

  const headerNameSplit = loggedInUser?.fullName?.split(" ");
  const headerNamePrompt = headerNameSplit?.[0];

  // ✅ Fetch donor notifications
  const getDonorNotification = async () => {
    try {
      const response = await axios.get(`${VITE_BASEURL_REN}/donor/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response?.data?.notifications || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // ✅ Periodic refresh of notifications
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      getDonorNotification();
    }, 10000);

    getDonorNotification();

    return () => clearInterval(interval);
  }, [token]);

  // ✅ Fetch hospitals
  const fetchHospitals = async () => {
    try {
      const res = await axios.get(`${Base_Url}/hospitals`);
      const hospitalData = res.data?.data || [];
      setHospitals(hospitalData);
      setFilteredHospitals(hospitalData);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // ✅ Mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.put(
        `${VITE_BASEURL_REN}/donor/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getDonorNotification();
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  // ✅ Toggle open/close of message
  const handleOpenedMessageToggle = (index) => {
    setOpenedMessageIndex((prev) => (prev === index ? null : index));
  };

  // ✅ Donor and Hospital tips
  const donationTips = [
    "Stay hydrated! Drink plenty of water before and after your donation.",
    "Eat a healthy meal before donating — avoid fatty foods.",
    "Get enough sleep the night before your donation.",
    "Bring a valid ID and know your blood type (if you can).",
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
    "You’re a hero. Thank you for making a difference!"
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

  // ✅ Tips carousel animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % donationTips.length);
        setFadeClass("fade-in");
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Choose tips based on user role
  const tips = loggedInUser?.role === "donor" ? donationTips : hospitalTips;

  return (
    <div className="dashboardHeaderWrapper">
      <div className="dashboardHeaderName">
        <h1>
          Hello {headerNamePrompt || 'Visitor'}{" "}
          <p style={{ fontSize: '15px' }}>&#128522;</p>
        </h1>
        <span>“Save a life today”</span>
      </div>

      <div className="dashboardHeaderSearchWrapper">
        <div className="carousel-card">
          <p className={`carousel-text ${fadeClass}`}>
            {tips[currentIndex]}
          </p>
        </div>
      </div>

      {searchQuery && (
        <div className="searchDropdown">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((h) => (
              <div
                key={h.id}
                className="searchResultItem"
                onClick={() => nav(`/hospital/${h.id}`)}
              >
                {h.name}
              </div>
            ))
          ) : (
            <div className="noResult">No hospitals found</div>
          )}
        </div>
      )}

      <div className="profilePicAndNotification">
        <div
          className="notificationIconWrapper"
          onClick={() => setNotificationSideBar(true)}
        >
          <MdCircleNotifications size={30} cursor="pointer" />
          {notifications?.some((n) => !n.isRead) && (
            <span className="notificationDot"></span>
          )}
        </div>

        <div className="profilePicture">
          {loggedInUser?.profilePics || loggedInUser?.profilePicture ? (
            <img
              src={loggedInUser?.profilePics || loggedInUser?.profilePicture}
              alt="profile"
              className="profileAvatar"
            />
          ) : (
            <img
              src="/images/default profile pic.jpg"
              alt="default"
              className="profileAvatar"
            />
          )}
        </div>
      </div>

      <Drawer
        open={notificationSideBar}
        onClose={() => setNotificationSideBar(false)}
        title="Notifications"
      >
        <div className="refreshWrapperHeader">
          <RiDeleteBin6Fill size={30} cursor="pointer" title="Delete all" />
          <IoMdRefreshCircle
            size={30}
            cursor="pointer"
            title="Refresh"
            onClick={getDonorNotification}
          />
        </div>

        <div className="notificationsWrapper">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={notification._id || index}
                className="notificationsCardsWrap"
                onClick={() => handleOpenedMessageToggle(index)}
              >
                <h1>
                  {notification.from} {!notification.isRead && <GoUnread />}
                </h1>

                {openedMessageIndex === index && (
                  <>
                    <span>{notification.message}</span>
                    <button
                      onClick={() => {
                        markNotificationAsRead(notification._id);
                        nav(`/hospitalsrequestdetails/${notification?._id}`);
                        setNotificationSideBar(false);
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
        </div>
      </Drawer>
    </div>
  );
};

export default DashBoardHeader;

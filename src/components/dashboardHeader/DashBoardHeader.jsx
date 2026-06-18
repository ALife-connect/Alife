import React, { useEffect, useState } from 'react';
import './dashboardHeader.css';
import { MdCircleNotifications } from "react-icons/md";
import { Drawer } from 'antd';
import { GoUnread } from "react-icons/go";
import { useNavigate, useLocation } from 'react-router'; // Added useLocation hook integration
import axios from 'axios';
import { IoMdRefreshCircle } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiSearch, FiChevronRight } from "react-icons/fi"; 
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const Base_Url = import.meta.env.VITE_BASEURL;
const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL;

const DashBoardHeader = () => {
  const loggedInUser = useSelector((state) => state?.loggedInUser);
  const token = useSelector((state) => state?.token);

  console.log(loggedInUser)

  const nav = useNavigate();
  const location = useLocation(); // Hook initialization to track active route changes

  // Dynamic route verification (Adjust this string to match your routing architecture)
  const isFindHospitalPage = location.pathname === '/dashboard/findhospital';

  const [notificationSideBar, setNotificationSideBar] = useState(false);
  const [openedMessageIndex, setOpenedMessageIndex] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  const headerNameSplit = loggedInUser?.fullName?.split(" ");
  const headerNamePrompt = headerNameSplit?.[0];

  // Fetch donor notifications
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

  // Periodic refresh of notifications
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      getDonorNotification();
    }, 10000);

    getDonorNotification();

    return () => clearInterval(interval);
  }, [token]);

  // Fetch hospitals
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim() === "") {
      setFilteredHospitals(hospitals);
    } else {
      const internalFilter = hospitals.filter((hospital) =>
        hospital?.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredHospitals(internalFilter);
    }
  };

  const handleDeleteAllNotifications = () => {
    if (notifications.length === 0) {
      toast.info("Your notification tray is already completely empty.");
      return;
    }
    setNotifications([]);
    toast.success("All local notification records cleared.");
  };

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

  const handleOpenedMessageToggle = (index) => {
    setOpenedMessageIndex((prev) => (prev === index ? null : index));
  };

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
    "Keep your hospital profile and KYC documents updated for better visibility.",
    "Respond to donor matches quickly to avoid losing opportunities.",
    "Clearly list your required blood types and update needs in real time.",
    "Provide a clean, comfortable, and welcoming environment for donors.",
    "Log in regularly to stay active and manage donation requests promptly.",
    "Train staff to treat donors with respect and professionalism.",
    "Send a thank-you message after donations to build long-term trust.",
    "Use dashboard analytics to track donation trends and optimize planning.",
    "Promote your hospital's presence on social media and local platforms.",
    "Stay compliant with all health and safety regulations to ensure donor confidence.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  const tips = loggedInUser?.role === "donor" ? donationTips : hospitalTips;

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % tips.length);
        setFadeClass("fade-in");
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [tips]);

  return (
    <div className="ModernHeaderContainer">
      {/* Left Block: Welcoming Context Stream */}
      <div className="HeaderGreetingPane">
        <h1>
          Hello, {headerNamePrompt || 'User'}{" "}
          <span className="AnimatedGreetingHand">👋</span>
        </h1>
        <p>“Save a life today”</p>
      </div>

      {/* Middle Block: Conditionally Isolated Layout Panel */}
      <div className="HeaderSearchAndTipsBlock">
        {/* Conditional Search Layer Injection */}
        {isFindHospitalPage && (
          <div className="HeaderSearchContainer">
            <FiSearch className="SearchBoxPrefixIcon" />
            <input 
              type="text"
              placeholder="Search verified medical centers..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="SearchEngineInputElement"
            />
            
            {searchQuery && (
              <div className="HeaderSearchDropdownPanel">
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map((h) => (
                    <div
                      key={h.id || h._id}
                      className="SearchDropdownResultRow"
                      onClick={() => {
                        nav(`/hospital/${h.id || h._id}`);
                        setSearchQuery('');
                      }}
                    >
                      <span>{h.name}</span>
                      <FiChevronRight className="ActionRowIndicatorIcon" />
                    </div>
                  ))
                ) : (
                  <div className="SearchDropdownNoResultsRow">No matching clinics or hospitals found</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tips Carousel Wrapper Card (Grows to full center width if search is absent) */}
        <div 
          className={`TipsCarouselWrapperCard ${!isFindHospitalPage ? 'isCenteredFullWidth' : ''}`}
          onClick={() => nav('/dashboard/tips')}
          title="Click to view all health guidelines and tips"
        >
          <p className={`TipsCarouselInnerBodyText ${fadeClass}`}>
            💡 {tips[currentIndex]}
          </p>
        </div>
      </div>

      {/* Right Block: Action Triggers Panel */}
      <div className="HeaderActionControllersCluster">
        <button 
          className="HeaderNotificationBellButton"
          onClick={() => setNotificationSideBar(true)}
          aria-label="Open notifications window drawer"
        >
          <MdCircleNotifications size={32} />
          {notifications?.some((n) => !n.isRead) && (
            <span className="HeaderActiveAlertNotificationBadge"></span>
          )}
        </button>

        <div className="HeaderUserProfileAvatarFrame" onClick={() => nav({ pathname: loggedInUser?.role === "donor" ? '/dashboard/settings' : '/dashboard/hospitalsettings' })}>
          <img
            src={loggedInUser?.profilePics || loggedInUser?.profilePicture || "/images/default profile pic.jpg"}
            alt="User Account Profile Vector"
          />
        </div>
      </div>

      {/* Ant Design Sidebar Notification Housing Drawer */}
      <Drawer
        open={notificationSideBar}
        onClose={() => setNotificationSideBar(false)}
        title="Notification Center"
        width={380}
        className="ModernHeaderSystemDrawer"
      >
        <div className="DrawerActionControlsBar">
          <button 
            className="DrawerUtilityActionTextButton variantClearAll"
            onClick={handleDeleteAllNotifications}
          >
            <RiDeleteBin6Fill size={16} /> Clear All
          </button>
          <button 
            className="DrawerUtilityActionTextButton" 
            onClick={getDonorNotification}
          >
            <IoMdRefreshCircle size={18} /> Refresh Tray
          </button>
        </div>

        <div className="DrawerNotificationsScrollerList">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={notification._id || index}
                className={`DrawerNotificationDataCard ${!notification.isRead ? 'isUnreadCardAlert' : ''}`}
                onClick={() => handleOpenedMessageToggle(index)}
              >
                <div className="NotificationCardHeaderLine">
                  <h4>{notification.from || "Medical Request Center"}</h4> 
                  {!notification.isRead && (
                    <span className="UnreadIndicatorDotTag">
                      <GoUnread /> New
                    </span>
                  )}
                </div>

                {openedMessageIndex === index ? (
                  <div className="NotificationCardExpandedBodyText animateBodyExpansion">
                    <p>{notification.message}</p>
                    <button
                      className="NotificationCardActionActionButton"
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationAsRead(notification._id);
                        nav(`/hospitalsrequestdetails/${notification?._id}`);
                        setNotificationSideBar(false);
                      }}
                    >
                      View Request Details
                    </button>
                    <span className="NotificationCardTimestampString">
                      {new Date(notification.date).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <p className="NotificationCardCollapsedSnippet">
                    {notification.message ? `${notification.message.substring(0, 55)}...` : "Click to view request parameters"}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="DrawerEmptyTrayStateFallback">
              <span className="EmptyTrayEmojiContext">📭</span>
              <h4>Your tray is completely clear</h4>
              <p>We will let you know when new donation queries surface matching your file data.</p>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default DashBoardHeader;
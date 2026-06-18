import React from 'react';
import './profilePage.css';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const loggedInUser = useSelector((state) => state?.loggedInUser);
  const paymentStatus = useSelector((state) => state?.paymentStatus);
  const nav = useNavigate();

  // Dynamic Settings Path Configuration
  const getSettingsPath = () => {
    if (loggedInUser?.role === "hospital") return '/dashboard/hospitalsettings';
    if (loggedInUser?.role === "admin") return '/dashboard/adminsettings';
    return '/dashboard/settings';
  };

  return (
    <div className="ProfilePageWRapper">
      {/* Alert Banner Container */}
      {(loggedInUser?.role === "hospital" && (!loggedInUser?.kycCompleted || !paymentStatus)) && (
        <div className="profileAlertContainer">
          {!loggedInUser?.kycCompleted && (
            <div className="kycCompleteMessage" onClick={() => nav('/kyc')}>
              ⚠️ Verification Missing: Please upload your KYC documents to secure your account.
            </div>
          )}
          {!paymentStatus && (
            <div className="paymentStatusMessage" onClick={() => nav('/dashboard/subscribe')}>
              💳 Subscription Inactive: Subscribe now to get listed on our active map tracking.
            </div>
          )}
        </div>
      )}

      <h1>Profile</h1>

      {/* Profile Header Block */}
      <div className="profilePageProfileAndNameWrapper">
        <div className="profilePageProfilePic">
          <img 
            src={loggedInUser?.profilePics || loggedInUser?.profilePicture || "/images/default profile pic.jpg"} 
            alt="Profile Avatar" 
          />
        </div>

        <div className="profileNameWrapper">
          <h3>{loggedInUser?.fullName}</h3>
          {loggedInUser?.role === "donor" && loggedInUser?.bloodType && (
            <span className="profileMetaDataBadge">Blood Type: {loggedInUser?.bloodType}</span>
          )}
          {loggedInUser?.role !== "donor" && (
            <span className="profileMetaDataBadge">{loggedInUser?.role}</span>
          )}
        </div>
      </div>

      {/* Personal Details Information Card */}
      <div className="profilePageInfosCards">
        <h2>Personal Information</h2>
        <div className="infosWRapper">
          <div className="infoBlock">
            <b>Full Name</b>
            <span>{loggedInUser?.fullName || "-"}</span>
          </div>
          
          {loggedInUser?.role === "hospital" && (
            <>
              <div className="infoBlock">
                <b>Account Type</b>
                <span>Hospital Portal</span>
              </div>
              <div className="infoBlock">
                <b>Local Government Area (LGA)</b>
                <span>{loggedInUser?.city || "-"}</span>
              </div>
              <div className="infoBlock">
                <b>Street Address</b>
                <span>{loggedInUser?.location || "-"}</span>
              </div>
            </>
          )}

          {loggedInUser?.role === "donor" && (
            <>
              <div className="infoBlock">
                <b>Age Allocation</b>
                <span>{loggedInUser?.age ? `${loggedInUser?.age} years old` : "-"}</span>
              </div>
              <div className="infoBlock">
                <b>Blood Group</b>
                <span>{loggedInUser?.bloodType || "-"}</span>
              </div>
              <div className="infoBlock">
                <b>Gender</b>
                <span>{loggedInUser?.gender || "-"}</span>
              </div>
            </>
          )}

          {loggedInUser?.role === "admin" && (
            <>
              <div className="infoBlock">
                <b>System Status</b>
                <span>Administrator</span>
              </div>
              <div className="infoBlock">
                <b>Recovery Email Address</b>
                <span>{loggedInUser?.email || "-"}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Contact Details Information Card */}
      {loggedInUser?.role !== "admin" && (
        <div className="profilePageInfosCards">
          <h2>Contact Information</h2>
          <div className="infosWRapper">
            <div className="infoBlock">
              <b>Email Address</b>
              <span>{loggedInUser?.email || "-"}</span>
            </div>
            <div className="infoBlock">
              <b>Phone Number</b>
              <span>
                {loggedInUser?.role === "hospital" 
                  ? loggedInUser?.phone || "-" 
                  : loggedInUser?.phoneNumber || "-"}
              </span>
            </div>
            {loggedInUser?.role !== "hospital" && (
              <div className="infoBlock">
                <b>Home Address</b>
                <span>{loggedInUser?.location || "-"}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form Submit Redirect Action Button */}
      <button className="editProfileButton" onClick={() => nav(getSettingsPath())}>
        Edit Profile Properties
      </button>
    </div>
  );
};

export default ProfilePage;
import React from 'react';
import './profilePage.css';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const loggedInUser = useSelector((state) => state?.loggedInUser)
  const paymentStatus = useSelector((state)=> state?.paymentStatus)
  const nav = useNavigate();

  return (
    <div className="ProfilePageWRapper">
      {loggedInUser?.role === "hospital" && !loggedInUser?.kycCompleted && (
        <div className="kycCompleteMessage" onClick={()=> nav('/kyc')}>Please Upload your KYC</div>
      )}
      {loggedInUser?.role === "hospital" && !paymentStatus && (
        <div className="paymentStatusMessage" onClick={()=> nav('/dashboard/subscribe')}>Subscribe to get listed</div>
      )}

      <h1>Profile</h1>

      <div className="profilePageProfileAndNameWrapper">
        <div className="profilePageProfilePic">
          {
            loggedInUser?.profilePics || loggedInUser?.profilePicture ? <img src={loggedInUser?.profilePics || loggedInUser?.profilePicture} alt="profile Picture" /> : <img src="/images/default profile pic.jpg" alt="profile Picture" />
          }
        </div>

        <div className="profileNameWrapper">
          <h3>{loggedInUser?.fullName}</h3>
          <p>{loggedInUser?.bloodType}</p>
        </div>
      </div>

      <div className="profilePageInfosCards">
        <h2>Personal Information</h2>
        <div className="infosWRapper">
          <p><b>Full Name</b><br /> {loggedInUser?.role === "hospital" ? loggedInUser?.fullName : loggedInUser?.fullName}</p>
          {loggedInUser?.role === "hospital" ? (
            <>
              <p><b>Type</b><br /> {loggedInUser?.role}</p>
              <p><b>LGA</b><br /> {loggedInUser?.city}</p>
              <p><b>Address</b><br /> {loggedInUser?.location}</p>
            </>
          ) : (null)}
          {loggedInUser?.role === "donor" ? (
            <>
              <p><b>Age</b><br /> {loggedInUser?.age}</p>
              <p><b>Blood Group</b><br /> {loggedInUser?.bloodType}</p>
              <p><b>Gender</b><br /> {loggedInUser?.gender ? loggedInUser?.gender : "-"}</p>
            </>
          ) : (null)}
          {loggedInUser?.role === "admin" ? (
            <>
              <p><b>Role</b><br /> {loggedInUser?.role}</p>
              <p><b>Gender</b><br /> {loggedInUser?.email ? loggedInUser?.email : "-"}</p>
            </>
          ) : (null)}
        </div>
      </div>

       {loggedInUser?.role === "admin" ? null :<div className="profilePageInfosCards">
        <h2>Contact Information</h2>
        <div className="infosWRapper">
          <p><b>Email Address</b><br /> {loggedInUser?.role === "hospital" ? loggedInUser?.email : loggedInUser?.email}</p>
          <p><b>Phone Number</b><br />{loggedInUser?.role === "hospital" ? loggedInUser?.phone || "-" : loggedInUser?.phoneNumber || "-"}</p>
          {!loggedInUser?.role === "hospital" && (
            <p><b>Home Address</b><br /> {loggedInUser?.location}</p>
          )}
        </div>
      </div>}

      {
        loggedInUser?.role === "hospital" ? <button className="editProfileButton" onClick={() => nav('/dashboard/hospitalsettings')}>
          Edit Profile
        </button> : loggedInUser?.role === "admin" ? <button className="editProfileButton" onClick={() => nav('/dashboard/adminsettings')}>
          Edit Profile
        </button> : <button className="editProfileButton" onClick={() => nav('/dashboard/settings')}>
          Edit Profile
        </button>
      }

    </div>
  );
};

export default ProfilePage;
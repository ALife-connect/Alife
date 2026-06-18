import React from 'react';
import './hospitalCard.css';
import { useNavigate } from 'react-router';
import { FiMapPin, FiChevronRight } from 'react-icons/fi'; // Matches your app's existing icon standard
import { BsShieldCheck } from "react-icons/bs";

const HospitalCard = ({ hospital }) => {
  const nav = useNavigate();

  // Route target for details click action
  const handleDetailsNavigation = () => {
    nav(`/dashboard/hospitaldetails/${hospital?._id || hospital?.id}`);
  };

  return (
    <div className="PremiumHospitalCard" onClick={handleDetailsNavigation}>
      {/* Upper Section: Image Container with Absolute-Positioned Badges */}
      <div className="HospitalCardImageWrapper">
        <img 
          src={hospital?.profilePicture || hospital?.profilePics || "/images/default profile pic.jpg"} 
          alt={`${hospital?.fullName || 'Hospital'} preview showcase`} 
          loading="lazy"
        />
        {/* Modern floating network verification chip */}
        <div className="HospitalStatusFloatingBadge">
          <BsShieldCheck size={12} />
          <span>Verified Network</span>
        </div>
      </div>

      {/* Middle Section: Information Context Group */}
      <div className="HospitalCardBodyContext">
        <h3 className="HospitalCardTitleText">
          {hospital?.fullName || hospital?.name || "Unnamed Medical Facility"}
        </h3>
        
        <div className="HospitalCardMetadataRow">
          <FiMapPin className="MetaIconElement" size={14} />
          <span className="MetaTextString">
            {hospital?.address || hospital?.location || "Location address on file"}
          </span>
        </div>
      </div>

      {/* Lower Section: Interactive CTA Trigger Button */}
      <button 
        className="HospitalCardActionCTAButton" 
        onClick={(e) => {
          e.stopPropagation(); // Prevents double click propagation up to parent card layout wrapper
          handleDetailsNavigation();
        }}
      >
        <span>View Facility Details</span>
        <FiChevronRight className="ActionBtnArrowIcon" size={16} />
      </button>
    </div>
  );
};

export default HospitalCard;
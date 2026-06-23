import React, { useEffect, useState } from 'react';
import '../../components/hospitalCard/hospitalCard.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoadComponents from '../../components/componentsLoadScreen/LoadComponents';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Base_Url = import.meta.env.VITE_BASEURL;

const HospitalRequestsPage = () => {
  const [loadState, setLoadState] = useState(false);
  const [hospitalRequests, setHospitalRequests] = useState([]);
  const token = useSelector((state) => state?.token);
  const nav = useNavigate();

  const getAllHospitalRequest = async () => {
    setLoadState(true);
    try {
      const ress = await axios.get(`${Base_Url}/blood-requests`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Safety guard check to handle undefined structures gracefully
      setHospitalRequests(ress?.data?.bloodRequests || []);
    } catch (err) {
      console.error("Fetch hospital requests error:", err);
      toast.error(err.response?.data?.message || "Failed to load blood emergency requests.");
    } finally {
      setLoadState(false);
    }
  };

  useEffect(() => {
    getAllHospitalRequest();
  }, []);

  if (loadState) {
    return <LoadComponents />;
  }

  return (
    <div className='hospitalRequestPageWrapper'>
      <div className="hospitalPageHeader">
        <h2>Emergency Blood Requests</h2>
        <p>Review real-time critical shortages and active donation requests from verified clinical partners.</p>
      </div>

      {hospitalRequests.length === 0 ? (
        <div className="emptyRequestsState">
          <img src="/images/checkmail.png" alt="No active requests available" />
          <h3>All quiet right now</h3>
          <p>There are currently no active emergency blood shortage requests listed. Check back shortly.</p>
        </div>
      ) : (
        <div className="hospitalCardsWRapper">
          {hospitalRequests.map((request, index) => (
            <div 
              className='PremiumHospitalCard' 
              key={request?._id || index}
              onClick={() => nav(`/dashboard/hospitalsrequestdetails/${request?._id}`)}
            >
              {/* Image Frame Wrapper with Layer Masks */}
              <div className="HospitalCardImageWrapper">
                <img 
                  src={request?.hospital?.profilePicture || "/images/default profile pic.jpg"} 
                  alt={`${request?.hospital?.fullName || 'Hospital'} cover profile`} 
                />
                {/* Floating Status Indicator Tag */}
                <div className="HospitalStatusFloatingBadge">
                  <span className="badgePulseDot"></span>
                  {request?.bloodType ? `Needs ${request.bloodType}` : "Urgent Support"}
                </div>
              </div>

              {/* Text Context Body Frame */}
              <div className="HospitalCardBodyContext">
                <h3 className="HospitalCardTitleText">
                  {request?.hospital?.fullName || "Verified Medical Center"}
                </h3>
                
                <div className="HospitalCardMetadataRow">
                  {/* Embedded Location SVG Geo Pin Pointer */}
                  <svg className="MetaIconElement" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="MetaTextString">
                    {request?.hospital?.city || "Emergency Location Specified"}
                  </span>
                </div>
              </div>

              {/* Action Button CTA Frame */}
              <button 
                className="HospitalCardActionCTAButton"
                onClick={(e) => {
                  e.stopPropagation(); // Stops double navigation events firing through card div layer
                  nav(`/dashboard/hospitalsrequestdetails/${request?._id}`);
                }}
              >
                View Details <span className="ActionBtnArrowIcon">→</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalRequestsPage;
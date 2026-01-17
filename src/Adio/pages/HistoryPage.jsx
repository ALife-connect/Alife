import React, { useEffect, useState } from 'react';
import './historyPage.css';
import { SlCalender } from "react-icons/sl";
import { Modal } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoadComponents from '../../components/componentsLoadScreen/LoadComponents';
import { toast } from 'react-toastify';

// Ensure your .env contains this correctly:
// VITE_BASEURL_REN=https://lifelink-7pau.onrender.com/api/v1
const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;

const HistoryPage = () => {
  const token = useSelector((state) => state.token);

  const [donations, setDonations] = useState([]);
  const [viewDetailsPopUp, setViewDetailsPopUp] = useState(null);
  const [status, setStatus] = useState("pending");
  const [loadingState, setLoadingState] = useState(false);
  const [appointmentsHistory, setAppointmentHistory] = useState([]);

  // Helper: validate token before making requests
  const validateToken = () => {
    if (!token || typeof token !== "string" || token.trim() === "") {
      toast.error("User not authenticated. Please log in again.");
      return false;
    }
    return true;
  };

  // Fetch donations by status
  const getDonationsByStatus = async (status) => {
    if (!validateToken()) return;

    setLoadingState(true);
    try {
      const res = await axios.get(`${VITE_BASEURL_REN}/donations/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sortedDonations = (res?.data?.donations || []).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setDonations(sortedDonations);
    } catch (err) {
      console.error("❌ Error fetching donations:", err);
      toast.error("Failed to fetch donation history.");
    } finally {
      setLoadingState(false);
    }
  };

  // Fetch appointments
  const getAppointments = async () => {
    if (!validateToken()) return;

    setLoadingState(true);
    try {
      const res = await axios.get(`${VITE_BASEURL_REN}/donor/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointmentHistory(res?.data?.appointments || []);
    } catch (err) {
      console.error("❌ Error fetching appointments:", err);
      toast.error("Failed to fetch appointment history.");
    } finally {
      setLoadingState(false);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    if (!validateToken()) return;

    try {
      await axios.put(
        `${VITE_BASEURL_REN}/donor/appointments/${appointmentId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Appointment cancelled successfully");
      setViewDetailsPopUp(null);
      getDonationsByStatus(status);
    } catch (error) {
      console.error("❌ Cancel appointment error:", error);
      toast.error("Failed to cancel appointment.");
    }
  };

  // Effects
  useEffect(() => {
    if (token && status) {
      getDonationsByStatus(status);
    }
  }, [status, token]);

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  if (loadingState) {
    return <LoadComponents />;
  }

  return (
    <>
      {/* Appointment History */}
      <div className='HistoryPageWrapper'>
        <h1>Appointment History</h1>

        <div className="DonationsHistoryCardsHeading">
          <div className="DonationsHistoryCardsInnerWrapper">
            <h1>Facility Name</h1>
            <h1>VIEW DETAILS</h1>
            <h1><SlCalender /> DATE</h1>
            <h1>LOCATION</h1>
            <h1>STATUS</h1>
          </div>
        </div>

        <div className="DonationsHistoryCardsWrapper">
          {donations.length > 0 ? (
            donations.map((donation, index) => (
              <div className="DonationsHistoryCards" key={index}>
                <div className="DonationsHistoryCardsInnerWrapper">
                  <h3>{donation.hospital?.fullName || "N/A"}</h3>
                  <button
                    className="view-btn-dtl"
                    onClick={() => setViewDetailsPopUp(donation)}
                  >
                    VIEW DETAILS
                  </button>

                  <h3><SlCalender /> {new Date(donation.date).toLocaleDateString()}</h3>
                  <h3>{donation.hospital?.location || "N/A"}</h3>
                  <h3>
                    <span className={`status-btn status-${donation.status?.toLowerCase()}`}>
                      {donation.status}
                    </span>
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p>No {status} donations yet.</p>
          )}
        </div>
      </div>

      {/* Schedule History */}
      <div className='HistoryPageWrapper'>
        <h1>Schedule History</h1>

        <div className="DonationsHistoryCardsHeading">
          <div className="DonationsHistoryCardsInnerWrapper">
            <h1>Facility Name</h1>
            <h1><SlCalender /> DATE</h1>
            <h1>LOCATION</h1>
            <h1>STATUS</h1>
          </div>
        </div>

        <div className="DonationsHistoryCardsWrapper">
          {appointmentsHistory.length > 0 ? (
            appointmentsHistory.map((donation, index) => (
              <div className="DonationsHistoryCards" key={index}>
                <div className="DonationsHistoryCardsInnerWrapper">
                  <h3>{donation.hospital?.email || "N/A"}</h3>
                  <h3><SlCalender /> {new Date(donation.date).toLocaleDateString()}</h3>
                  <h3>{donation.hospital?.location || "N/A"}</h3>
                  <h3>
                    <span className={`status-btn status-${donation.status?.toLowerCase()}`}>
                      {donation.status}
                    </span>
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p>No scheduled appointments yet.</p>
          )}
        </div>
      </div>

      {/* Modal for View Details */}
      <Modal
        open={!!viewDetailsPopUp}
        onCancel={() => setViewDetailsPopUp(null)}
        footer={null}
      >
        {viewDetailsPopUp && (
          <div className="viewDetailsPopUpWrapper">
            <h1>Details</h1>
            <p>Name: <b>{viewDetailsPopUp.hospital?.fullName}</b></p>
            <p>Location: <b>{viewDetailsPopUp.hospital?.location}</b></p>
            <p>Date: <b>{new Date(viewDetailsPopUp.date).toLocaleDateString()}</b></p>
            <p>Time: <b>{viewDetailsPopUp.time || "No time specified"}</b></p>
            <p>Status: <b>{viewDetailsPopUp.status}</b></p>
            <img src="/images/hospital image.jpg" alt="Hospital image" />

            {viewDetailsPopUp.status === "pending" && (
              <button
                style={{
                  backgroundColor: "#c0392b",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  marginTop: "15px",
                  cursor: "pointer",
                  border: "none"
                }}
                onClick={() => cancelAppointment(viewDetailsPopUp._id)}
              >
                Cancel Request
              </button>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default HistoryPage;

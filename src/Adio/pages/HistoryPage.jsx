import React, { useEffect, useState } from 'react';
import './historyPage.css';
import { SlCalender } from "react-icons/sl";
import { Modal } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoadComponents from '../../components/componentsLoadScreen/LoadComponents';
import { toast } from 'react-toastify';

const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL;

const HistoryPage = () => {
  const token = useSelector((state) => state.token);

  const [donations, setDonations] = useState([]);
  const [viewDetailsPopUp, setViewDetailsPopUp] = useState(null);
  const [status] = useState("pending");
  const [loadingState, setLoadingState] = useState(false);
  const [appointmentsHistory, setAppointmentHistory] = useState([]);

  const validateToken = () => {
    if (!token || typeof token !== "string" || token.trim() === "") {
      toast.error("User not authenticated. Please log in again.");
      return false;
    }
    return true;
  };

  const getDonationsByStatus = async (targetStatus) => {
    if (!validateToken()) return;

    setLoadingState(true);
    try {
      const res = await axios.get(`${VITE_BASEURL_REN}/donations/${targetStatus}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sortedDonations = (res?.data?.donations || []).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setDonations(sortedDonations);
    } catch (err) {
      toast.error("Failed to fetch donation history.");
    } finally {
      setLoadingState(false);
    }
  };

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
      toast.error("Failed to fetch appointment history.");
    } finally {
      setLoadingState(false);
    }
  };

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
      getAppointments(); // Refresh the schedules view seamlessly
    } catch (error) {
      toast.error("Failed to cancel appointment.");
    }
  };

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
      {/* SECTION 1: Appointment History */}
      <div className="HistoryPageWrapper">
        <h2>Appointment History</h2>

        <div className="DonationsHistoryCardsHeading historyTableGrid">
          <h4>Facility Name</h4>
          <h4><SlCalender /> Date</h4>
          <h4 className="locationHeader">Location</h4>
          <h4>Status</h4>
        </div>

        <div className="DonationsHistoryCardsWrapper">
          {donations.length > 0 ? (
            donations.map((donation, index) => (
              <div className="DonationsHistoryCards historyTableGrid" key={donation._id || index}>
                <div className="facilityMetaBlock">
                  <span>{donation.hospital?.fullName || "N/A"}</span>
                  <button
                    className="view-btn-dtl"
                    onClick={() => setViewDetailsPopUp(donation)}
                  >
                    View Details
                  </button>
                </div>

                <div className="dateBlock">
                  <SlCalender /> {donation.date ? new Date(donation.date).toLocaleDateString() : "N/A"}
                </div>
                
                <div className="locationBlock">
                  {donation.hospital?.location || "N/A"}
                </div>

                <div className="statusBadgeContainer">
                  <span className={`status-btn status-${donation.status?.toLowerCase()}`}>
                    {donation.status || "Unknown"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="noDataFallbackText">No records found matching your {status} donation logs.</p>
          )}
        </div>
      </div>

      {/* SECTION 2: Schedule History */}
      <div className="HistoryPageWrapper">
        <h2>Schedule History</h2>

        <div className="DonationsHistoryCardsHeading historyTableGrid">
          <h4>Facility Name</h4>
          <h4><SlCalender /> Date</h4>
          <h4 className="locationHeader">Location</h4>
          <h4>Status</h4>
        </div>

        <div className="DonationsHistoryCardsWrapper">
          {appointmentsHistory.length > 0 ? (
            appointmentsHistory.map((appointment, index) => (
              <div className="DonationsHistoryCards historyTableGrid" key={appointment._id || index}>
                <div className="facilityMetaBlock">
                  {/* Fixed bug here: Changed tracking source from raw email string over to clean facility designation string */}
                  <span>{appointment.hospital?.fullName || "N/A"}</span>
                </div>

                <div className="dateBlock">
                  <SlCalender /> {appointment.date ? new Date(appointment.date).toLocaleDateString() : "N/A"}
                </div>

                <div className="locationBlock">
                  {appointment.hospital?.location || "N/A"}
                </div>

                <div className="statusBadgeContainer">
                  <span className={`status-btn status-${appointment.status?.toLowerCase()}`}>
                    {appointment.status || "Unknown"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="noDataFallbackText">No active upcoming healthcare procedures scheduled yet.</p>
          )}
        </div>
      </div>

      {/* Overhauled System Metadata Control Center Modal */}
      <Modal
        open={!!viewDetailsPopUp}
        onCancel={() => setViewDetailsPopUp(null)}
        footer={null}
        centered
        destroyOnClose
      >
        {viewDetailsPopUp && (
          <div className="viewDetailsPopUpWrapper">
            <h3>Appointment Information</h3>
            
            <p>Facility Name: <b>{viewDetailsPopUp.hospital?.fullName || "N/A"}</b></p>
            <p>Target Destination: <b>{viewDetailsPopUp.hospital?.location || "N/A"}</b></p>
            <p>Booking Date: <b>{viewDetailsPopUp.date ? new Date(viewDetailsPopUp.date).toLocaleDateString() : "N/A"}</b></p>
            <p>Arrival Windows: <b>{viewDetailsPopUp.time || "No custom window assigned"}</b></p>
            <p>Current Status: <b>{viewDetailsPopUp.status || "N/A"}</b></p>
            
            <img src="/images/hospital image.jpg" alt="Target Healthcare Center Showcase Asset" />

            {viewDetailsPopUp.status === "pending" && (
              <button
                className="modalCancelActionButton"
                onClick={() => cancelAppointment(viewDetailsPopUp._id)}
              >
                Cancel Scheduled Appointment
              </button>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default HistoryPage;
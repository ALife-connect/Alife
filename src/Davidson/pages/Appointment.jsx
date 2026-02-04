import React, { useEffect, useState } from "react";
import "./appointment.css";
import { MdAccessTime } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import { Modal, Button, message } from "antd";
import LoadComponents from "../../components/componentsLoadScreen/LoadComponents";

const Appointment = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);

  const userToken = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.user);
  const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;


  const fetchAppointment = async () => {
    if (!userToken) {
      message.warning("No authentication token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${VITE_BASEURL_REN}/appointments`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setAppointmentData(res?.data?.data || []);
    } catch (err) {
      console.error("❌ Error fetching appointments:", err);
      const status = err.response?.status;
      if (status === 401) message.error("Unauthorized. Please log in again.");
      else if (status === 403) message.error("Access denied.");
      else message.error("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);


  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  
  const showDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  
  const handleAccept = async () => {
    if (!selectedAppointment?._id) return;

    const appointmentId = selectedAppointment._id.replace(/"/g, "");
    const preferredHospital = user?.preferredHospital;
    const appointmentHospital = selectedAppointment?.hospital?.name;

    
    if (
      preferredHospital &&
      appointmentHospital &&
      preferredHospital !== appointmentHospital
    ) {
      message.warning(
        `You can only schedule an appointment at your preferred hospital (${preferredHospital}).`
      );
      return;
    }

    setAccepting(true);

    try {
      await axios.put(
        `${VITE_BASEURL_REN}/appointments/${appointmentId}/respond`,
        { status: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      message.success("Appointment accepted successfully ✅");
      handleClose();
      fetchAppointment();
    } catch (err) {
      console.error("❌ Error accepting appointment:", err);
      message.error("Failed to accept appointment");
    } finally {
      setAccepting(false);
    }
  };

  
  const handleDecline = async () => {
    if (!selectedAppointment?._id) return;

    const appointmentId = selectedAppointment._id.replace(/"/g, "");
    setDeclining(true);

    try {
      await axios.put(
        `${VITE_BASEURL_REN}/appointments/${appointmentId}/respond`,
        { status: "cancel" },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      message.success("Appointment cancelled successfully ❌");
      handleClose();
      fetchAppointment();
    } catch (err) {
      console.error("❌ Error cancelling appointment:", err);
      message.error("Failed to cancel appointment");
    } finally {
      setDeclining(false);
    }
  };

  
  const getStatusClass = (status) => {
    if (!status) return "pending";
    switch (status.toLowerCase()) {
      case "accepted":
        return "accepted";
      case "cancel":
      case "cancelled":
        return "cancelled";
      default:
        return "pending";
    }
  };


  if (loading) return <LoadComponents />;

  return (
    <div className="AppointmentContainer">
      <h2 className="AppointmentTitle">Upcoming Appointments</h2>

      {appointmentData.length === 0 ? (
        <p className="empty">No upcoming appointments.</p>
      ) : (
        <>
          <div className="AppointmentHeader">
            <div>Donor Name</div>
            <div>Details</div>
            <div>
              <MdAccessTime /> Time
            </div>
            <div>
              <MdAccessTime /> Date
            </div>
            <div>Status</div>
          </div>

          {appointmentData.map((item, index) => (
            <div className="AppointmentItem" key={index}>
              <div>{item?.donor?.fullName || "N/A"}</div>
              <div>
                <button className="view-btn" onClick={() => showDetails(item)}>
                  View Details
                </button>
              </div>
              <div>
                <MdAccessTime /> {item?.time || "N/A"}
              </div>
              <div>
                <MdAccessTime /> {formatDate(item?.date)}
              </div>
              <div className={`status-badge ${getStatusClass(item?.status)}`}>
                {item?.status || "Pending"}
              </div>
            </div>
          ))}
        </>
      )}

      {/* 🔹 Modal */}
      <Modal
        title="Appointment Details"
        open={isModalOpen}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            Close
          </Button>,
          <Button
            key="accept"
            type="primary"
            loading={accepting}
            onClick={handleAccept}
            disabled={
              selectedAppointment?.status?.toLowerCase() === "accepted" ||
              (user?.preferredHospital &&
                selectedAppointment?.hospital?.name &&
                user.preferredHospital !== selectedAppointment.hospital.name)
            } 
          >
            Accept Appointment
          </Button>,
          <Button
            key="decline"
            danger
            loading={declining}
            onClick={handleDecline}
            disabled={selectedAppointment?.status?.toLowerCase() === "cancel"}
          >
            Cancel Appointment
          </Button>,
        ]}
      >
        {selectedAppointment && (
          <div className="appointment-details">
            <p>
              <strong>Donor Name:</strong>{" "}
              {selectedAppointment?.donor?.fullName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {selectedAppointment?.donor?.email || "N/A"}
            </p>
            <p>
              <strong>Blood Type:</strong>{" "}
              {selectedAppointment?.donor?.bloodType || "N/A"}
            </p>
            <p>
              <strong>Preferred Hospital:</strong>{" "}
              {user?.preferredHospital || "Not Set"}
            </p>
            <p>
              <strong>Appointment Hospital:</strong>{" "}
              {selectedAppointment?.hospital?.name || "N/A"}
            </p>
            <p>
              <strong>Appointment Time:</strong>{" "}
              {selectedAppointment?.time || "N/A"}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(selectedAppointment?.date)}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`status-badge ${getStatusClass(
                  selectedAppointment?.status
                )}`}
              >
                {selectedAppointment?.status || "Pending"}
              </span>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Appointment;

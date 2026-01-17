import React, { useEffect, useState } from "react";
import "../../Adio/pages/hospitalDetailsPage.css";
import { DatePicker, Modal } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadComponents from "../../components/componentsLoadScreen/LoadComponents";
import { toast } from "sonner";
import FadeLoader from "react-spinners/CircleLoader";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import RequestNotAvailable from "./RequestNotAvailable";

const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;

const HospitalRequestDetails = () => {
  const [volunteerPopUp, setVolunteerPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [anHospital, setAnHospital] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const token = useSelector((state) => state?.token);
  const { bloodRequestId } = useParams();

  const [scheduleData, setScheduleData] = useState({
    date: "",
    time: "",
    hospitalId: ""
  });

  // Disable all past dates and dates beyond hospital's preferred date
  const disabledDate = (current) => {
    if (!anHospital?.preferredDate) return current && current < dayjs().endOf("day");
    const preferred = dayjs(anHospital.preferredDate);
    return current < dayjs().endOf("day") || current > preferred.endOf("day");
  };

  const handleChange = (e) => {
    setScheduleData((prev) => ({
      ...prev,
      date: e.format("YYYY-MM-DD"),
    }));
  };

  const time = [
    { label: "8:00 AM - 10:00 AM", value: "8:00 AM" },
    { label: "10:00 AM - 12:00 PM", value: "10:00 AM" },
    { label: "12:00 PM - 3:00 PM", value: "12:00 PM" },
    { label: "3:00 PM - 5:00 PM", value: "3:00 PM" },
  ];

  const getOneHospital = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${VITE_BASEURL_REN}/blood-request/${bloodRequestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res?.data?.data;
      setAnHospital(data);

      // Check if request is expired
      if (data?.preferredDate && dayjs().isAfter(dayjs(data.preferredDate), "day")) {
        setIsExpired(true);
      }
    } catch (err) {
      console.error("Error fetching hospital details:", err);
      if (err?.response?.status === 404) {
        setNotFound(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOneHospital();
  }, [bloodRequestId]);

  const handleSchedule = async () => {
    setIsScheduleLoading(true);
    try {
      const res = await axios.post(`${VITE_BASEURL_REN}/bookAppointment`, {
        date: scheduleData.date,
        time: scheduleData.time,
        hospitalId: scheduleData.hospitalId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res?.data?.message);
      setScheduleData({
        date: "",
        time: "",
        bloodRequestId,
      });
      setVolunteerPopUp(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to schedule.");
    } finally {
      setIsScheduleLoading(false);
    }
  };

  useEffect(() => {
    if (anHospital?.hospital?._id) {
      setScheduleData((prev) => ({
        ...prev,
        hospitalId: anHospital.hospital._id,
      }));
    }
  }, [anHospital]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (notFound) return <RequestNotAvailable />;
  if (isLoading) return <LoadComponents />;

  return (
    <div className="HospitalDetailsPageWrapper">
      <h1>{anHospital?.hospital?.fullName} Request Details</h1>
      <span>This post was made on {formatDate(anHospital?.updatedAt)}</span>

      <div className="detailsTextAndImageWrapper">
        <div className="detailsImageWrapper">
          <img src="/images/hospital image.jpg" alt="Hospital" />
        </div>

        <div className="detailsTextWrapper">
          <div className="innerTextWRapper">
            <p>
              Name: <b>{anHospital?.hospital?.fullName || "-"}</b>
            </p>
            <p>
              Blood group needed: <b>{anHospital?.bloodGroup || "-"}</b>
            </p>
            <p>
              Number Of Pints: <b>{anHospital?.numberOfPints || "-"}</b>
            </p>
            <p>
              Urgency Level: <b>{anHospital?.urgencyLevel || "-"}</b>
            </p>
            <p>
              Offer: <b>{anHospital?.amount?.toLocaleString() || "-"}</b>
            </p>
            <p>
              Preferred Date: <b>{formatDate(anHospital?.preferredDate) || "-"}</b>
            </p>
            <p>
              Address: <b>{anHospital?.hospital?.location || "-"}</b>
            </p>
            <p>
              LGA: <b>{anHospital?.hospital?.city || "-"}</b>
            </p>
            <p>
              Email: <b>{anHospital?.hospital?.email || "-"}</b>
            </p>
            <p>
              Contact: <b>{anHospital?.hospital?.phone || "-"}</b>
            </p>
            <p>
              Operating Hours: <b>{"Mon-Fri, 8AM - 5PM"}</b>
            </p>
          </div>

          {isExpired ? (
            <button disabled className="expiredButton">
              Request Expired
            </button>
          ) : (
            <button onClick={() => setVolunteerPopUp(true)}>
              Volunteer to Donate
            </button>
          )}
        </div>
      </div>

      {isExpired && (
        <div className="expiredNotice">
          ⚠️ This blood request has expired. Please contact the hospital for updates.
        </div>
      )}

      <Modal
        open={volunteerPopUp}
        onCancel={() => setVolunteerPopUp(false)}
        footer={null}
      >
        <div className="volunteerDateWrapper">
          <h1>Pick Date/Time</h1>

          <div className="datePickerWrapper">
            <label>Date</label>
            <DatePicker
              onChange={handleChange}
              disabledDate={disabledDate}
              id="preferredDate"
              name="preferredDate"
              className="lg:w-80 border h-10 border-gray-300 rounded text-sm text-gray-600 px-2 pl-2 sm:w-35"
            />
          </div>

          <div className="datePickerWrapper">
            <label>Time</label>
            {time?.map((time, idx) => (
              <p key={idx}>
                <input
                  type="radio"
                  name="time"
                  value={time.value}
                  onChange={(e) =>
                    setScheduleData((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                />{" "}
                {time.label}
              </p>
            ))}
          </div>

          <button onClick={handleSchedule} disabled={isScheduleLoading}>
            {isScheduleLoading ? (
              <FadeLoader color="white" size={25} />
            ) : (
              "Schedule"
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HospitalRequestDetails;

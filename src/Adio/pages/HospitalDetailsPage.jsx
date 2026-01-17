import React, { useEffect, useState } from "react";
import "./hospitalDetailsPage.css";
import { DatePicker, Modal } from "antd";
import { useParams } from "react-router";
import axios from "axios";
import LoadComponents from "../../components/componentsLoadScreen/LoadComponents";
import { toast } from "sonner";
import FadeLoader from "react-spinners/CircleLoader";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const Base_Url = import.meta.env.VITE_BASEURL;

const HospitalDetailsPage = () => {
  const [volunteerPopUp, setVolunteerPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [anHospital, setAnHospital] = useState([]);

  const token = useSelector((state) => state?.token)
  const { hospitalId } = useParams();
  const [scheduleData, setScheduleData] = useState({
    date: "",
    time: "",
    hospitalId,
  });
  const disabledDate = (current) => {
    const today = dayjs()
    const startOfMonth = today.startOf("month")
    const endOfMonth = today.endOf("month")
    return (
      (current && current < dayjs().endOf("day")) ||
      (current && (current < startOfMonth || current > endOfMonth))
    )
  };
  const handleChange = (e) => {
    if (e.$isDayjsObject) {
      setScheduleData((prev) => ({
        ...prev,
        date: e.format("YYYY-MM-DD"),
      }));
    }

  };

  const time = [
    { label: "8:00AM - 10:00AM", value: "8:00AM - 10:00AM" },
    { label: "10:00AM - 12:00PM", value: "10:00AM - 12:00PM" },
    { label: "12:00PM - 3:00PM", value: "12:00PM - 3:00PM" },
    { label: "3:00PM - 5:00PM", value: "3:00PM - 5:00PM" },
  ];

  const getOneHospital = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${Base_Url}/hospital/${hospitalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnHospital(res?.data?.hospital);
    } catch (err) {
      console.error("Error fetching hospital details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOneHospital();
  }, [hospitalId]);

  const handleSchedule = async () => {
    setIsScheduleLoading(true);
    try {
      const res = await axios.post(`${Base_Url}/schedule`, scheduleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsScheduleLoading(false);
      toast.success(res?.data?.message);
      setScheduleData("");
      setVolunteerPopUp(false);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setIsScheduleLoading(false);
    }
  };

  if (isLoading) return <LoadComponents />;
  return (
    <div className="HospitalDetailsPageWrapper">
      <h1>Hospital Details</h1>

      <div className="detailsTextAndImageWrapper">
        <div className="detailsImageWrapper">
          <img src="/images/hospital image.jpg" alt="Hospital" />
        </div>

        <div className="detailsTextWrapper">
          <div className="innerTextWRapper">
            <p>
              Name: <b>{anHospital?.fullName}</b>
            </p>
            <p>
              Location: <b>{anHospital?.location}</b>
            </p>
            <p>
              Contact: <b>{anHospital?.phone ? anHospital?.phone : "-"}</b>
            </p>
            <p>
              Operating Hours:{" "}
              <b>{anHospital?.operatingHours || "Mon-Fri, 8AM - 5PM"}</b>
            </p>
          </div>
          <button onClick={() => setVolunteerPopUp(true)}>
            Volunteer to Donate
          </button>
        </div>
      </div>

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

          <button onClick={handleSchedule}>
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

export default HospitalDetailsPage;

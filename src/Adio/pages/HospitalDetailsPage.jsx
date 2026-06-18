import React, { useEffect, useState } from "react";
import "./hospitalDetailsPage.css";
import { DatePicker, Modal } from "antd";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import LoadComponents from "../../components/componentsLoadScreen/LoadComponents";
import { toast } from "sonner";
import FadeLoader from "react-spinners/CircleLoader";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { 
  FiArrowLeft, FiMapPin, FiPhone, 
  FiClock, FiCalendar, FiActivity 
} from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";

const Base_Url = import.meta.env.VITE_BASEURL;


const HospitalDetailsPage = () => {
  const nav = useNavigate();
  const { hospitalId } = useParams();
  const token = useSelector((state) => state?.token);

  const [volunteerPopUp, setVolunteerPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [anHospital, setAnHospital] = useState(null);
  console.log(anHospital)

  const [scheduleData, setScheduleData] = useState({
    date: "",
    time: "",
    hospitalId,
  });

  // Calendar boundaries restriction logic
  const disabledDate = (current) => {
    const today = dayjs();
    const startOfMonth = today.startOf("month");
    const endOfMonth = today.endOf("month");
    return (
      (current && current < dayjs().endOf("day")) ||
      (current && (current < startOfMonth || current > endOfMonth))
    );
  };

  const handleDateChange = (dateObj) => {
    if (dateObj && dateObj.$isDayjsObject) {
      setScheduleData((prev) => ({
        ...prev,
        date: dateObj.format("YYYY-MM-DD"),
      }));
    }
  };

  const timeSlots = [
    { label: "8:00 AM - 10:00 AM", value: "8:00AM - 10:00AM" },
    { label: "10:00 AM - 12:00 PM", value: "10:00AM - 12:00PM" },
    { label: "12:00 PM - 3:00 PM", value: "12:00PM - 3:00PM" },
    { label: "3:00 PM - 5:00 PM", value: "3:00PM - 5:00PM" },
  ];

  const getOneHospital = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${Base_Url}/hospital/${hospitalId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
        console.log("THE HOSPITAL DATA:",res)
      setAnHospital(res?.data?.hospital);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load medical facility credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hospitalId) getOneHospital();
  }, [hospitalId]);

  const handleSchedule = async () => {
    if (!scheduleData.date || !scheduleData.time) {
      toast.error("Please pick both a valid date and time slot configuration.");
      return;
    }

    setIsScheduleLoading(true);
    try {
      const res = await axios.post(`${Base_Url}/schedule`, scheduleData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res?.data?.message || "Donation slot reserved successfully!");
      setScheduleData({ date: "", time: "", hospitalId });
      setVolunteerPopUp(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "An scheduling error occurred.");
    } finally {
      setIsScheduleLoading(false);
    }
  };

  if (isLoading) return <LoadComponents />;


  console.log("Base URL:", Base_Url);
console.log("Hospital ID:", hospitalId);
console.log("Final URL:", `${Base_Url}/hospital/${hospitalId}`);

  return (
    <div className="RequestDetailsMasterContainer">
      {/* Control Navigation Back-bar */}
      <div className="RequestDetailsBackActionBar">
        <button className="DetailsReturnBtn" onClick={() => nav(-1)}>
          <FiArrowLeft size={16} />
          <span>Return to Listings</span>
        </button>
      </div>

      {/* Top Level Header Segment */}
      <header className="RequestDetailsHeaderSegment">
        <div className="HeaderTitleWrapper">
          <h1>Medical Center Profile</h1>
          <span className="HeaderPostDateBadge">
            Verified Partner Node ID: #{hospitalId?.substring(0, 8)}
          </span>
        </div>
        <div className="RequestUrgencyPillBadge urgency-normal">
          <BsShieldCheck size={14} />
          <span>Active Intake Center</span>
        </div>
      </header>

      {/* Main Grid Splitting Block */}
      <div className="RequestDetailsLayoutGrid">
        
        {/* Left Side Column: Media Showcase & Meta Directives */}
        <aside className="DetailsViewLeftColumnFrame">
          <div className="FacilityHeroShowcaseCard">
            <div className="FacilityImageContainerMask">
              <img 
                src={anHospital?.profilePicture || anHospital?.profilePics || "/images/hospital image.jpg"} 
                alt={`${anHospital?.fullName || "Facility"} storefront view`} 
                onError={(e) => { e.target.src = "/images/hospital image.jpg"; }}
              />
            </div>
            <div className="FacilityIdentityFooterBlock">
              <h3>{anHospital?.fullName || "Unnamed Medical Facility"}</h3>
              <p><FiMapPin size={13} /> {anHospital?.location || "Address unspecified"}</p>
            </div>
          </div>

          <div className="FacilityDirectoryMetaCard">
            <h4>Contact & Operations</h4>
            
            <div className="DirectoryRowItem">
              <FiPhone className="RowIconRef" />
              <div>
                <label>Direct Phone Registry</label>
                <span>{anHospital?.phone || "No direct telephone provided"}</span>
              </div>
            </div>

            <div className="DirectoryRowItem">
              <FiClock className="RowIconRef" />
              <div>
                <label>Operating Window Hours</label>
                <span>{anHospital?.operatingHours || "Mon - Fri, 8:00 AM - 5:00 PM"}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side Column: Clinical Parameter Summaries & Action Blocks */}
        <main className="DetailsViewRightColumnFrame">
          <h3 className="ColumnSectionTitleLabel">Facility Allocation Overview</h3>
          
          <div className="ClinicalParametersGridRows">
            <div className="ParameterMetricSummaryCard highlight-droplet">
              <div className="MetricIconWrapperBox">
                <FiActivity size={20} />
              </div>
              <div className="MetricValueContentHolder">
                <span className="MetricCardTitleTextLabel">Intake Status</span>
                <span className="MetricCardCoreValueData">Open</span>
              </div>
            </div>

            <div className="ParameterMetricSummaryCard">
              <div className="MetricIconWrapperBox">
                <FiCalendar size={20} />
              </div>
              <div className="MetricValueContentHolder">
                <span className="MetricCardTitleTextLabel">Reservations</span>
                <span className="MetricCardCoreValueData">Available</span>
              </div>
            </div>
          </div>

          <div className="DetailsSubmissionCTACluster">
            <button 
              className="GlobalActionTriggerButton" 
              onClick={() => setVolunteerPopUp(true)}
            >
              Volunteer to Donate Blood
            </button>
          </div>
        </main>
      </div>

      {/* Modernized Interactive Form Scheduling Modal */}
      <Modal
        open={volunteerPopUp}
        onCancel={() => setVolunteerPopUp(false)}
        footer={null}
        centered
        className="PremiumModernSchedulingSystemModal"
        width={420}
      >
        <div className="ModalSchedulingFormInnerStructure">
          <div className="ModalFormTitleBanner">
            <h2>Select Appointment Slot</h2>
            <p>Coordinate your clinical visit parameters to ensure immediate reception upon point arrival.</p>
          </div>

          {/* Date Input Field Frame */}
          <div className="ModalFormInputGroupField">
            <label className="ModalFieldInputLabel" htmlFor="preferredDate">
              <FiCalendar /> Preferred Appointment Date
            </label>
            <DatePicker
              onChange={handleDateChange}
              disabledDate={disabledDate}
              id="preferredDate"
              name="preferredDate"
              className="ModalSystemCustomDatePicker"
              placeholder="Select data day criteria"
            />
          </div>

          {/* Time Input Field Frame using Interactive Radio Chips */}
          <div className="ModalFormInputGroupField">
            <label className="ModalFieldInputLabel">
              <FiClock /> Available Direct Time Windows
            </label>
            <div className="CustomInteractiveChipRadiosGrid">
              {timeSlots.map((slot, idx) => {
                const isSelected = scheduleData.time === slot.value;
                return (
                  <label 
                    key={idx} 
                    className={`InteractiveTimeRadioChipBox ${isSelected ? "isRadioChipChecked" : ""}`}
                  >
                    <input
                      type="radio"
                      name="time"
                      value={slot.value}
                      checked={isSelected}
                      onChange={(e) =>
                        setScheduleData((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      className="HiddenNativeRadioControlBubble"
                    />
                    <span className="ChipRadioLabelStringText">{slot.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submission Button Interface Block */}
          <button 
            className="ModalFormSubmissionTriggerActionButton" 
            onClick={handleSchedule}
            disabled={isScheduleLoading}
          >
            {isScheduleLoading ? (
              <FadeLoader color="#ffffff" size={18} />
            ) : (
              "Confirm Schedule Booking"
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HospitalDetailsPage;
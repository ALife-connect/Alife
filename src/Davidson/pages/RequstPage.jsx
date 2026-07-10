import React, { useState } from "react";
import "./requestpage.css";
import axios from "axios";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import { 
  FiDroplet, FiLayers, FiCalendar, 
  FiAlertCircle, FiFileText, FiArrowRight 
} from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";

const RequestPage = () => {
  const nav = useNavigate();
  const Base_Url = import.meta.env.VITE_BASEURL;
  const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL;

  const userToken = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.loggedInUser);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: "",
    numberOfPints: "",
    preferredDate: "",
    urgencyLevel: "",
    reason: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const disabledDate = (current) => current && current < dayjs().startOf("day");

  const handleChange = (e) => {
    // Check if the parameter passed is an Ant Design Dayjs object
    if (e && e.$isDayjsObject) {
      setFormData((prev) => ({
        ...prev,
        preferredDate: e.format("YYYY-MM-DD"),
      }));
      return;
    }

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.bloodGroup ||
      !formData.numberOfPints ||
      !formData.urgencyLevel ||
      !formData.preferredDate
    ) {
      toast.error("Please populate all mandatory operational parameters.");
      return;
    }

    if (!user?.kycCompleted) {
      toast.error("Account verification required. Complete KYC profile before posting requests.");
      return;
    }

    if (!userToken) {
      toast.error("Session missing. Please re-authenticate your institutional login.");
      return;
    }

    const payload = {
      bloodGroup: formData.bloodGroup,
      numberOfPints: Number(formData.numberOfPints),
      preferredDate: formData.preferredDate,
      urgencyLevel: formData.urgencyLevel,
      reason: formData.reason || "Urgent medical need",
      amount: 0,
    };

    setIsSubmitting(true);
    const toastId = toast.loading("Broadcasting emergency blood request across the local network...");

    try {
      const res = await axios.post(
        `${VITE_BASEURL_REN}/hospital/request-blood`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success(res?.data?.message || "Emergency request broadcasted successfully!", { id: toastId });
        setFormData({
          bloodGroup: "",
          numberOfPints: "",
          preferredDate: "",
          urgencyLevel: "",
          reason: "",
        });
        nav("/dashboard/requesthistory");
      } else {
        toast.error("Unexpected pipeline response context.", { id: toastId });
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Network request structural timeout error.";
      toast.error(errorMsg, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="RequestHubPageMasterFrame">
      {/* Informative Header Title Section */}
      <header className="RequestHubFormHeader">
        <div className="HeaderTitleContext">
          <h1>Create Blood Allocation Request</h1>
          <p>Deploy a live localized broadcast request to connect matching verified regional donors with emergency clinic needs.</p>
        </div>

        {/* Dynamic Warning Alert Banner if KYC validation is absent */}
        {!user?.kycCompleted && (
          <div className="InstitutionalKYCWarningBanner">
            <BsShieldCheck size={18} />
            <div>
              <h5>Verification Required</h5>
              <p>Your institutional node must have an approved KYC file profile active before distribution queries execute.</p>
            </div>
          </div>
        )}
      </header>

      {/* Main Structural core Grid Form Layout */}
      <main className="RequestFormCardWrapper">
        <form onSubmit={handleSubmit} className="ModernAsymmetricFormStructure">
          
          {/* Blood Group Target Dropdown */}
          <div className="FormGroupInputField">
            <label htmlFor="bloodGroup" className="FormElementFieldLabel">
              <FiDroplet /> Target Blood Group
            </label>
            <div className="InteractiveInputContainerWrapper">
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="FormSelectInputElement"
              >
                <option value="">Select variance code</option>
                {bloodGroups.map((group, idx) => (
                  <option key={idx} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity Allocation Count Input */}
          <div className="FormGroupInputField">
            <label htmlFor="pints" className="FormElementFieldLabel">
              <FiLayers /> Volumetric Pints Count Required
            </label>
            <div className="InteractiveInputContainerWrapper">
              <input
                type="number"
                id="pints"
                min={1}
                name="numberOfPints"
                placeholder="e.g. 4"
                value={formData.numberOfPints}
                onChange={handleChange}
                className="FormGenericTextInputElement"
              />
            </div>
          </div>

          {/* Schedule Calendar Input */}
          <div className="FormGroupInputField">
            <label htmlFor="preferredDate" className="FormElementFieldLabel">
              <FiCalendar /> Targeted Fulfillment Date
            </label>
            <DatePicker
              onChange={handleChange}
              disabledDate={disabledDate}
              id="preferredDate"
              name="preferredDate"
              placeholder="Select target calendar point"
              className="FormModernSystemDatePicker"
            />
          </div>

          {/* Urgency Matrix Input */}
          <div className="FormGroupInputField">
            <label htmlFor="urgencyLevel" className="FormElementFieldLabel">
              <FiAlertCircle /> Priority Classification Matrix
            </label>
            <div className="InteractiveInputContainerWrapper">
              <select
                id="urgencyLevel"
                name="urgencyLevel"
                onChange={handleChange}
                value={formData.urgencyLevel}
                className="FormSelectInputElement"
              >
                <option value="">Select response priority</option>
                <option value="high">Critical / High Emergency</option>
                <option value="medium">Moderate / Standard Allocation</option>
                <option value="low">Low Routine Stocking</option>
              </select>
            </div>
          </div>

          {/* Reason Narrative Textarea Block (Takes full wide span) */}
          <div className="FormGroupInputField fullWidthSpanField">
            <label htmlFor="reason" className="FormElementFieldLabel">
              <FiFileText /> Clinical Diagnosis / Reason for Request
            </label>
            <textarea
              id="reason"
              name="reason"
              placeholder="Specify clinical context or diagnostic procedure validation data parameters (e.g. Scheduled emergency surgery)..."
              value={formData.reason}
              onChange={handleChange}
              className="FormModernTextAreaElement"
              rows={4}
            />
          </div>

          {/* Operation Submit Row */}
          <div className="FormActionFooterRow fullWidthSpanField">
            <button 
              type="submit" 
              className={`FormHubSubmissionButton ${isSubmitting ? 'isButtonLoadingDisabled' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CircleLoader color="#ffffff" size={18} />
                  <span>Processing Protocol...</span>
                </>
              ) : (
                <>
                  <span>Broadcast Request Pipeline</span>
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RequestPage;
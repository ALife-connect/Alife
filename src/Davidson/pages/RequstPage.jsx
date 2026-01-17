import { useState } from "react";
import "./requestpage.css";
import axios from "axios";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RequestPage = () => {
  const bloodGroups = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ];

  const nav = useNavigate();
  const Base_Url = import.meta.env.VITE_BASEURL;
  const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;

  const [formData, setFormData] = useState({
    bloodGroup: "",
    numberOfPints: "",
    preferredDate: "",
    urgencyLevel: "",
    reason: "",
    amount: 0,
  });

  const userToken = useSelector((state) => state?.token);
  const user = useSelector((state) => state?.loggedInUser);

  const disabledDate = (current) => current && current < dayjs().startOf("day");

  const handleChange = (e) => {
    // Handle DatePicker input
    if (e?.$isDayjsObject) {
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
    console.log("this is token", userToken)

    if (
      !formData.bloodGroup ||
      !formData.numberOfPints ||
      !formData.urgencyLevel ||
      !formData.preferredDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!user?.kycCompleted) {
      toast.error("Please complete KYC before requesting");
      return;
    }

    if (!userToken) {
      toast.error("You are not logged in. Please log in.");
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

    toast.loading("Sending blood request...");

    try {
      console.log("Payload being sent:", payload);

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

      toast.dismiss();

      if (res.status === 201 || res.status === 200) {
        toast.success(res?.data?.message || "Blood request created successfully!");
        setFormData({
          bloodGroup: "",
          numberOfPints: "",
          preferredDate: "",
          urgencyLevel: "",
          reason: "",
        });
        nav("/dashboard/requesthistory");
      } else {
        toast.error("Unexpected server response");
      }
    } catch (err) {
      toast.dismiss();

      const errorMsg =
        err?.response?.data?.message ||
        "Internal server error. Please try again later.";

      toast.error(errorMsg);
      console.error("Request error details:", err?.response || err);
    }
  };

  return (
    <div className="request-form-container">
      <h2 className="form-title">Blood Request Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Blood Group */}
        <div className="form-field">
          <label htmlFor="bloodGroup">Blood Group Needed</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-80 border h-10 border-gray-300 rounded text-sm text-gray-600 px-2"
          >
            <option value="">Select your blood group</option>
            {bloodGroups.map((item, index) => (
              <option key={index} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Pints */}
        <div className="form-field">
          <label htmlFor="pints">Number of Pints</label>
          <input
            type="number"
            id="pints"
            min={1}
            name="numberOfPints"
            placeholder="e.g. 3 Pints"
            value={formData.numberOfPints}
            onChange={handleChange}
            className="record-input w-80 border h-10 border-gray-300 rounded text-sm text-gray-600 px-2"
          />
        </div>

        {/* Preferred Date */}
        <div className="form-field">
          <label htmlFor="preferredDate">Preferred Date</label>
          <DatePicker
            onChange={handleChange}
            disabledDate={disabledDate}
            id="preferredDate"
            name="preferredDate"
            className="w-80 border h-10 border-gray-300 rounded text-sm text-gray-600 px-2"
          />
        </div>

        {/* Urgency Level */}
        <div className="form-field">
          <label htmlFor="urgencyLevel">Urgency Level</label>
          <select
            id="urgencyLevel"
            name="urgencyLevel"
            onChange={handleChange}
            value={formData.urgencyLevel}
            className="w-80 border h-10 border-gray-300 rounded text-sm text-gray-600 px-2"
          >
            <option value="">Select urgency level</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Reason Field (instead of Incentive) */}
        <div className="form-field">
          <label htmlFor="reason">Reason for Request</label>
          <textarea
            id="reason"
            name="reason"
            placeholder="Briefly explain why blood is needed (e.g., emergency surgery)"
            value={formData.reason}
            onChange={handleChange}
            className="record-input w-80 border rounded text-sm text-gray-600 px-2 py-2"
            rows={3}
          />
        </div>

        <button type="submit" className="submit-button">
          Post Request
        </button>
      </form>
    </div>
  );
};

export default RequestPage;

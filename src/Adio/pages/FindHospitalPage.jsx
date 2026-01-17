import React, { useEffect, useState } from "react";
import "./findHospitalPage.css";
import HospitalCard from "../../components/hospitalCard/HospitalCard";
import LoadComponents from "../../components/componentsLoadScreen/LoadComponents";
import { useSelector } from "react-redux";
import axios from "axios";

const Base_Url = import.meta.env.VITE_BASEURL;
const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;

const tips = [
  "One blood donation can save up to 3 lives",
  "Donating blood can lower stress and improve heart rate",
  "O-negative blood donors can be used for anyone",
  "Donating regularly can help maintain healthy iron levels",
  "Drink plenty of water before donating blood",
  "Avoid alcohol 24 hours before your donation",
  "Eat iron-rich foods like spinach and beans before donating",
  "Every donor is a hero — you help save lives!",
];

const FindHospitalPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listOfHospitals, setListOfHospitals] = useState([]);
  const [error, setError] = useState("");

  const token = useSelector((state) => state?.token);

  const getListOfHospitals = async () => {
    setIsLoading(true);
    setError(""); // reset error message
    try {
      console.log("🔑 Auth token:", token);
      console.log("🌍 Fetching hospitals from:", `${VITE_BASEURL_REN}/hospitals`);

      const res = await axios.get(`${VITE_BASEURL_REN}/hospitals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("🏥 Hospital API Response:", res?.data);

      if (res?.data?.data?.length > 0) {
        setListOfHospitals(res.data.data);
      } else {
        setListOfHospitals([]);
        console.warn("⚠️ No hospitals found in the response.");
      }
    } catch (err) {
      console.error("❌ Error fetching hospitals:", err);
      setError("Failed to load hospitals. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListOfHospitals();
  }, []);

  if (isLoading) {
    return <LoadComponents />;
  }

  return (
    <div className="FindHospitalPageWrapper">
      <h1>List of Hospitals to Visit</h1>

      {error && <p className="error-text">{error}</p>}

      <div className="hospitalCardsWRapper">
        {listOfHospitals && listOfHospitals.length > 0 ? (
          listOfHospitals.map((hospital, index) => (
            <HospitalCard key={index} hospital={hospital} index={index} />
          ))
        ) : (
          !isLoading && <p className="noHospitalText">No Hospital Found 🏥</p>
        )}
      </div>

      <div className="quickTipsAndFunFactWrapper">
        <h1>Quick Tips & Fun Facts</h1>

        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="landingincentives"
            style={{
              width: "268px",
              height: "153px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="incentiveheader" style={{ width: "100%" }}>
              <img src="/images/Group.png" alt="icon" style={{ width: "41px" }} />
            </div>
            <h2 style={{ fontSize: "16px", width: "80%", textAlign: "center" }}>
              {tip}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindHospitalPage;

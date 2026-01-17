import React, { useEffect, useState } from "react";
import "./requesthistory.css";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadComponents from "../../components/componentsLoadScreen/LoadComponents";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "sonner";

const RequestHistory = () => {
  const [requestData, setRequestData] = useState([]);
  const [loadState, setLoadState] = useState(false)
  const userToken = useSelector((state) => state?.token);

  // const Base_Url = import.meta.env.VITE_BASEURL;
  const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL_REN;

  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  const fetchRequest = async () => {
    setLoadState(true)
    try {
      const res = await axios.get(`${VITE_BASEURL_REN}/re-hospital/history`, { headers });
      setRequestData(res.data.requests);
      setLoadState(false)
    } catch (err) {
      setLoadState(false)
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const handleDeleteRequest = async (id) => {
    try {
      const ress = await axios.delete(`${VITE_BASEURL_REN}/delete-blood-request/${id}`, { headers });
      toast.success("Request deleted successfully!");
      (ress)
      setRequestData(prev => prev.filter(request => request._id !== id));
    } catch (err) {
      console.error(err);
      toast.success("Request deleted successfully!");
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loadState) {
    return <LoadComponents />
  }

  return (
    <div className="RequestHistoryContainer">
      <h2 className="RequestHistoryTitle">Request History</h2>

      <div className="RequestHistoryHeader">
        <div>Blood Group</div>
        <div>Pints Requested</div>
        <div>Date Requested</div>
        <div>Preferred Date</div>
        <div>Urgency</div>
        <div>Status</div>
      </div>

      {requestData?.length > 0 ? (
        requestData.map((item, index) => (
          <div className="RequestHistoryItem" key={index}>
            <div>{item?.bloodGroup}</div>
            <div>{item?.numberOfPints}</div>
            <div>{formatDate(item?.createdAt)}</div>
            <div>{formatDate(item?.preferredDate)}</div>
            <div>{item?.urgencyLevel}</div>
            <div className={`status ${item?.status?.toLowerCase()}`}>{item?.status}</div>

            <RiDeleteBin6Fill color="red" size={20} cursor='pointer' onClick={() => handleDeleteRequest(item._id)} />
          </div>
        ))
      ) : (
        <p className="RequestHistoryEmpty">No requests found.</p>
      )}
    </div>
  );
};

export default RequestHistory;

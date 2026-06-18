import React, { useEffect, useState } from "react";
import "./requesthistory.css";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadComponents from "../../components/componentsLoadScreen/LoadComponents";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "sonner";

const RequestHistory = () => {
  const [requestData, setRequestData] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const userToken = useSelector((state) => state?.token);

  const VITE_BASEURL_REN = import.meta.env.VITE_BASEURL;

  // Wrapped token calculation dynamically inside function layer block execution
  const getHeaders = () => ({
    Authorization: `Bearer ${userToken}`,
  });

  const fetchRequest = async () => {
    if (!userToken) return;
    setLoadState(true);
    try {
      const res = await axios.get(`${VITE_BASEURL_REN}/re-hospital/history`, { 
        headers: getHeaders() 
      });
      setRequestData(res?.data?.requests || []);
    } catch (err) {
      console.error("❌ Error fetching request logs:", err);
      toast.error("Failed to load request history logs.");
    } finally {
      setLoadState(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [userToken]);

  const handleDeleteRequest = async (id) => {
    try {
      await axios.delete(`${VITE_BASEURL_REN}/delete-blood-request/${id}`, { 
        headers: getHeaders() 
      });
      toast.success("Request deleted successfully!");
      setRequestData((prev) => prev.filter((request) => request._id !== id));
    } catch (err) {
      console.error("❌ Error processing request deletion execution:", err);
      // Fixed Bug: Changed from toast.success to toast.error
      toast.error("Failed to delete processing request. Please try again.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loadState) {
    return <LoadComponents />;
  }

  return (
    <div className="RequestHistoryContainer">
      <h2 className="RequestHistoryTitle">Request History</h2>

      {/* Synchronized 7 Column Spreadsheet Mapping Layer */}
      <div className="RequestHistoryHeader requestHistoryGrid">
        <div>Blood Group</div>
        <div>Pints</div>
        <div>Date Requested</div>
        <div>Preferred Date</div>
        <div>Urgency</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      <div className="RequestHistoryItemWrapper">
        {requestData?.length > 0 ? (
          requestData.map((item, index) => (
            <div className="RequestHistoryItem requestHistoryGrid" key={item._id || index}>
              <div data-label="Blood Group">{item?.bloodGroup || "N/A"}</div>
              <div data-label="Pints Requested">{item?.numberOfPints || "0"} Pints</div>
              <div data-label="Date Requested">{formatDate(item?.createdAt)}</div>
              <div data-label="Preferred Date">{formatDate(item?.preferredDate)}</div>
              <div data-label="Urgency">{item?.urgencyLevel || "Normal"}</div>
              
              <div className="statusContainer" data-label="Status">
                <span className={`status ${item?.status?.toLowerCase() || "pending"}`}>
                  {item?.status || "Pending"}
                </span>
              </div>

              <div className="deleteActionContainer">
                <button 
                  className="deleteActionButton"
                  onClick={() => handleDeleteRequest(item._id)}
                  title="Delete Request Record"
                  aria-label="Delete request history row"
                >
                  <RiDeleteBin6Fill size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="RequestHistoryEmpty">No request records found matching your hospital profile data.</p>
        )}
      </div>
    </div>
  );
};

export default RequestHistory;
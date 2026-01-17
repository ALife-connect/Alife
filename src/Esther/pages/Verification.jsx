import React, { useEffect, useState } from 'react';
import '../../Esther/styles/verification.css';
import { Modal } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const Base_Url = import.meta.env.VITE_BASEURL;

const Verification = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [allKyc, setAllKyc] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const token = useSelector((state) => state?.token);

  const openModal = (hospital) => {
    setSelectedHospital(hospital);
    setModalOpen(true);
  };

  const getHospitalsKYC = async () => {
    try {
      const res = await axios.get(`${Base_Url}/admin/allKyc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllKyc(res?.data?.kycs || []);
    } catch (err) {
      console.log(err || err?.message);
    }
  };

  useEffect(() => {
    getHospitalsKYC();
  }, []);


  const handleApproveReject = async (id, action) => {
    const endpoint =
      action === "approve"
        ? `${Base_Url}/admin/verify-kyc/${id}`
        : `${Base_Url}/admin/decline-kyc/${id}`;
  
    try {
      const ress = await axios.patch(endpoint, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(`Hospital ${action === "approve" ? "approved" : "rejected"} successfully!`);
      getHospitalsKYC();
      setModalOpen(false); 
      console.log(ress)
    } catch (error) {
      toast.error("Something went wrong. Try again!");
    }
  };

  const getStatusBadge = (status) => {
    let color = '';
    let label = '';

    switch (status) {
      case 'approved':
        color = 'green';
        label = 'Approved ✅';
        break;
      case 'pending':
        color = 'orange';
        label = 'Pending ⏳';
        break;
      case 'rejected':
        color = 'red';
        label = 'Rejected ❌';
        break;
      default:
        color = 'gray';
        label = 'Unknown';
    }

    return (
      <span
        style={{
          backgroundColor: color,
          color: 'white',
          padding: '2px 10px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          marginLeft: '10px',
        }}
      >
        {label}
      </span>
    );
  };

  const filteredData =
    filterStatus === "all"
      ? allKyc
      : allKyc.filter((h) => h.status === filterStatus);

  return (
    <div className='verificationwrap'>
      <div className='filter-buttons' style={{ marginBottom: '20px' }}>
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              marginRight: '10px',
              padding: '8px 16px',
              backgroundColor: filterStatus === status ? '#c0392b' : '#f0f0f0',
              color: filterStatus === status ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {filteredData.map((hospital) => (
        <div className='verifywrapinner' key={hospital._id}>
          <h1>
            {hospital.name} {getStatusBadge(hospital.status)}
          </h1>
          <button className='adminviewbuttton' onClick={() => openModal(hospital)}>
            VIEW DETAILS
          </button>
        </div>
      ))}

      <Modal open={modalOpen} onCancel={() => setModalOpen(false)} footer={null}>
        {selectedHospital && (
          <div className='modalContent'>
            <img
              src={selectedHospital.facilityImage}
              alt='Hospital'
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <p><strong>Name:</strong> {selectedHospital.name}</p>
            <p><strong>Email:</strong> {selectedHospital?.hospital?.email}</p>
            <p><strong>License Number:</strong> {selectedHospital.licenseNumber}</p>
            <p><strong>Status:</strong> {selectedHospital.status}</p>
            <p><strong>Submitted At:</strong> {new Date(selectedHospital.submittedAt).toLocaleDateString()}</p>
            <p><strong>Accredited Certificate:</strong><br /><img src={selectedHospital.accreditedCertificate} alt='Certificate' style={{ width: '100%' }} /></p>
            <p><strong>Utility Bill:</strong><br /><img src={selectedHospital.utilityBill} alt='Utility Bill' style={{ width: '100%' }} /></p>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <button className='adminverifyotherbtn' onClick={() => handleApproveReject(selectedHospital._id, "approve")}>APPROVE</button>
              <button className='adminverifyotherbtn' onClick={() => handleApproveReject(selectedHospital._id, "reject")}>REJECT</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Verification;

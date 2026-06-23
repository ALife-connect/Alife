import React, { useEffect, useState } from 'react';
import '../../Esther/styles/verification.css';
import { Modal, Image, Tabs, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const Base_Url = import.meta.env.VITE_BASEURL;

const Verification = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [allKyc, setAllKyc] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Advanced Verification States
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [checklist, setChecklist] = useState({
    nameMatches: false,
    licenseValid: false,
    documentsClear: false
  });

  const token = useSelector((state) => state?.token);

  const openModal = (hospital) => {
    setSelectedHospital(hospital);
    setModalOpen(true);
    // Reset workspace states for a fresh review session
    setShowRejectInput(false);
    setRejectionReason("");
    setChecklist({ nameMatches: false, licenseValid: false, documentsClear: false });
  };

  const getHospitalsKYC = async () => {
    try {
      const res = await axios.get(`${Base_Url}/admin/allKyc`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllKyc(res?.data?.kycs || []);
    } catch (err) {
      console.error("Failed to fetch KYC records:", err);
    }
  };

  useEffect(() => {
    getHospitalsKYC();
  }, []);

  const handleApproveReject = async (id, action) => {
    // Enforce checklist validation before approving
    if (action === "approve" && (!checklist.nameMatches || !checklist.licenseValid || !checklist.documentsClear)) {
      toast.error("Please complete and verify all items in the checklist before approving.");
      return;
    }

    if (action === "reject" && !rejectionReason.trim()) {
      toast.error("Please state a clear reason for rejecting this verification.");
      return;
    }

    const endpoint = action === "approve"
        ? `${Base_Url}/admin/verify-kyc/${id}`
        : `${Base_Url}/admin/decline-kyc/${id}`;
  
    try {
      // If your backend accepts context parameters for rejections, you can pass the reason payload here
      await axios.patch(endpoint, { reason: rejectionReason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success(`Hospital ${action === "approve" ? "approved" : "rejected"} successfully!`);
      getHospitalsKYC();
      setModalOpen(false); 
    } catch (error) {
      toast.error("Network or internal error occurred. Please try again.");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      approved: { className: 'badge-approved', label: 'Approved ✅' },
      pending: { className: 'badge-pending', label: 'Pending ⏳' },
      rejected: { className: 'badge-rejected', label: 'Rejected ❌' }
    };
    const currentBadge = badges[status] || { className: 'badge-default', label: 'Unknown' };
    return <span className={`status-badge ${currentBadge.className}`}>{currentBadge.label}</span>;
  };

  const filteredData = filterStatus === "all"
      ? allKyc
      : allKyc.filter((h) => h.status === filterStatus);

  // Tab configurations for the document pane
  const getDocumentTabs = (hospital) => [
    {
      key: 'facility',
      label: '1. Facility Image (KYC)',
      children: (
        <div className="tab-image-container">
          <Image src={hospital.facilityImage} alt='Hospital Facility' fallback="https://placehold.co/600x400?text=No+Image+Available" />
        </div>
      )
    },
    {
      key: 'certificate',
      label: '2. Accredited Certificate',
      children: (
        <div className="tab-image-container">
          <Image src={hospital.accreditedCertificate} alt='Accredited Certificate' fallback="https://placehold.co/600x400?text=No+Image+Available" />
        </div>
      )
    },
    {
      key: 'utility',
      label: '3. Utility Bill',
      children: (
        <div className="tab-image-container">
          <Image src={hospital.utilityBill} alt='Utility Bill' fallback="https://placehold.co/600x400?text=No+Image+Available" />
        </div>
      )
    }
  ];

  const isChecklistComplete = checklist.nameMatches && checklist.licenseValid && checklist.documentsClear;

  return (
    <div className='verificationwrap'>
      <div className='filter-buttons-container'>
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className='kyc-list-container'>
        {filteredData.length > 0 ? (
          filteredData.map((hospital) => (
            <div className='verifywrapinner' key={hospital._id}>
              <h1 className='hospital-title-row'>
                {hospital.name} {getStatusBadge(hospital.status)}
              </h1>
              <button className='adminviewbutton' onClick={() => openModal(hospital)}>
                LAUNCH WORKSPACE
              </button>
            </div>
          ))
        ) : (
          <div className='no-data-message'>No verification profiles found for this selection.</div>
        )}
      </div>

      <Modal 
        open={modalOpen} 
        onCancel={() => setModalOpen(false)} 
        footer={null} 
        width={1200}
        centered
        className="kyc-workspace-modal"
      >
        {selectedHospital && (
          <div className='workspace-container'>
            
            {/* LEFT PANELS: DATA CONTROLS & CHECKLIST */}
            <div className='workspace-sidebar'>
              <h2 className='workspace-heading'>Review Profile</h2>
              
              <div className='data-spec-card'>
                <div className='data-field'><span className='label'>Hospital Name:</span> <span className='val'>{selectedHospital.name}</span></div>
                <div className='data-field'><span className='label'>Contact Email:</span> <span className='val'>{selectedHospital?.hospital?.email || 'N/A'}</span></div>
                <div className='data-field'><span className='label'>License Number:</span> <span className='val highlights'>{selectedHospital.licenseNumber}</span></div>
                <div className='data-field'><span className='label'>Submission:</span> <span className='val'>{new Date(selectedHospital.submittedAt).toLocaleDateString()}</span></div>
                <div className='data-field'><span className='label'>Current Status:</span> <span className='val text-capitalize'>{selectedHospital.status}</span></div>
              </div>

              {selectedHospital.status === 'pending' && (
                <div className='compliance-checklist-container'>
                  <h3>Audit Requirements Checklist</h3>
                  <label className='checklist-item'>
                    <input 
                      type="checkbox" 
                      checked={checklist.nameMatches} 
                      onChange={(e) => setChecklist({...checklist, nameMatches: e.target.checked})} 
                    />
                    <span>Name matches across all documents</span>
                  </label>
                  <label className='checklist-item'>
                    <input 
                      type="checkbox" 
                      checked={checklist.licenseValid} 
                      onChange={(e) => setChecklist({...checklist, licenseValid: e.target.checked})} 
                    />
                    <span>License code is valid and unexpired</span>
                  </label>
                  <label className='checklist-item'>
                    <input 
                      type="checkbox" 
                      checked={checklist.documentsClear} 
                      onChange={(e) => setChecklist({...checklist, documentsClear: e.target.checked})} 
                    />
                    <span>Utility bill details match system location</span>
                  </label>
                </div>
              )}

              {selectedHospital.status === 'pending' && (
                <div className='workspace-actions-wrapper'>
                  {!showRejectInput ? (
                    <div className='action-buttons-group'>
                      <button 
                        className={`action-btn complete-approve-btn ${!isChecklistComplete ? 'disabled-look' : ''}`}
                        onClick={() => handleApproveReject(selectedHospital._id, "approve")}
                        disabled={!isChecklistComplete}
                      >
                        APPROVE RECORD
                      </button>
                      <button 
                        className='action-btn intent-reject-btn' 
                        onClick={() => setShowRejectInput(true)}
                      >
                        REJECT APPLICATION...
                      </button>
                    </div>
                  ) : (
                    <div className='rejection-reason-panel'>
                      <h3>Specify Reason for Decline</h3>
                      <Input.TextArea 
                        rows={3} 
                        placeholder="Provide details (e.g., 'The uploaded utility bill is blurry/unreadable' or 'License registration expired')."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="custom-textarea"
                      />
                      <div className='nested-action-row'>
                        <button className='back-btn' onClick={() => setShowRejectInput(false)}>CANCEL</button>
                        <button className='confirm-decline-btn' onClick={() => handleApproveReject(selectedHospital._id, "reject")}>CONFIRM REJECTION</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* RIGHT PANEL: DYNAMIC INTERACTIVE DOCUMENT VIEWER */}
            <div className='workspace-viewer'>
              <div className='viewer-instruction-bar'>
                💡 *Tip: Hover over any image to access zoom, rotate, and full-screen tools.*
              </div>
              <Tabs 
                defaultActiveKey="facility" 
                items={getDocumentTabs(selectedHospital)} 
                className="workspace-tabs"
              />
            </div>

          </div>
        )}
      </Modal>
    </div>
  );
};

export default Verification;
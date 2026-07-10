import React, { useState } from 'react';
import '../../Esther/styles/kyc.css';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import CircleLoader from 'react-spinners/CircleLoader';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FiUploadCloud, FiCheckCircle } from 'react-icons/fi';

const KYC = () => {
  const nav = useNavigate();
  const [loadState, setLoadState] = useState(false);
  const [facilityImg, setFacilityImg] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [utilityBill, setUtilityBill] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState('');

  const userToken = useSelector((state) => state?.token);
  const VITE_BASEURL = import.meta.env.VITE_BASEURL;

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit.");
        return;
      }
      setFile(file);
      toast.success("Document attached successfully.");
    }
  };

  const handleSubmit = async () => {
    if (!facilityImg || !certificate || !utilityBill || !licenseNumber) {
      toast.error('Please populate all document fields and license information.');
      return;
    }

    const formData = new FormData();
    formData.append('facilityImage', facilityImg);
    formData.append('accreditedCertificate', certificate);
    formData.append('utilityBill', utilityBill);
    formData.append('licenseNumber', licenseNumber);
    setLoadState(true);

    try {
      await axios.post(`${VITE_BASEURL}/kyc/kyc`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
          },
      });
      toast.success('KYC documentation submitted successfully!');
      nav('/dashboard');
    } catch (err) {
      toast.error('Failed to submit KYC documentation. Please check your network and try again.');
    } finally {
      setLoadState(false);
    }
  };

  const renderUploadBox = (label, file, setFile, inputId) => (
    <div className="kyc-upload-section">
      <label className="kyc-upload-label">{label}</label>
      <div 
        className={`kyc-upload-box ${file ? 'has-file' : ''}`} 
        onClick={() => document.getElementById(inputId).click()}
      >
        <input
          type="file"
          id={inputId}
          className="kyc-hidden-input"
          onChange={(e) => handleFileChange(e, setFile)}
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <div className="kyc-upload-content">
          {file ? (
            <>
              <FiCheckCircle className="upload-icon success-icon" />
              <p className="file-name">{file.name}</p>
              <span>Click to replace document</span>
            </>
          ) : (
            <>
              <FiUploadCloud className="upload-icon" />
              <p>Upload {label}</p>
              <span>Click to browse storage</span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="kyc-root-wrapper">
      {/* Mobile Top Header */}
      <div className="kycmobilewrap">
        <IoArrowBackCircleOutline className="mobile-back-icon" onClick={() => nav(-1)} />
        <h1>Verification</h1>
      </div>

      <div className="kyc-main-card">
        {/* Navigation & Branding Strip */}
        <div className="kyclogohold">
          <HiOutlineArrowCircleLeft className="desktop-back-icon" onClick={() => nav(-1)} />
          <Link to="/">
            <img src="/images/Slodat.jpeg" alt="Branding Logo" className="kyclogo" />
          </Link>
        </div>

        {/* Dynamic Form Module */}
        <div className="kyc-form-container">
          <h1>Identity Verification</h1>
          <p className="kyc-subtitle">Please submit valid structural and operational credentials to activate administrative privileges.</p>

          <div className="kyc-scrollable-fields">
            {renderUploadBox('Facility Image', facilityImg, setFacilityImg, 'file1')}
            {renderUploadBox('Accredited Certificate', certificate, setCertificate, 'file2')}
            {renderUploadBox('Utility Bill', utilityBill, setUtilityBill, 'file3')}

            <div className="kyc-input-group">
              <label htmlFor="licenseInput">LICENSE NUMBER</label>
              <input
                id="licenseInput"
                type="text"
                className="kyc-text-input"
                placeholder="Enter formal identification numbers"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>
          </div>

          <button className="kyc-submit-btn" onClick={handleSubmit} disabled={loadState}>
            {loadState ? <CircleLoader color="white" size={20} /> : "SUBMIT VERIFICATION"}
          </button>
        </div>
      </div>

      {/* Decorative Vector Side-Panel */}
      <div className="kyc-vector-panel">
        <img src="images/Subtract.png" alt="Decorative Graphic" className="kycsignimage" />
      </div>
    </div>
  );
};

export default KYC;
import React, { useState } from 'react';
import '../../Esther/styles/kyc.css';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import FadeLoader from 'react-spinners/CircleLoader'
import { IoArrowBackCircleOutline } from 'react-icons/io5';



const KYC = () => {
  const nav = useNavigate();
  const [loadState, setLoadState] = useState(false)
  const [facilityImg, setFacilityImg] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [utilityBill, setUtilityBill] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState('');

  const userToken = useSelector((state) => state?.token);
  const Base_Url = import.meta.env.VITE_BASEURL;

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) setFile(file);
  };

  const handleSubmit = async () => {
    if (!facilityImg || !certificate || !utilityBill || !licenseNumber) {
      message.error('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('facilityImage', facilityImg);
    formData.append('accreditedCertificate', certificate);
    formData.append('utilityBill', utilityBill);
    formData.append('licenseNumber', licenseNumber);
    setLoadState(true)
    try {
      const res = await axios.post(`${Base_Url}/kyc/kyc`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('KYC submitted successfully!');
      nav('/dashboard');
      setLoadState(false)
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit KYC. Try again.');
      setLoadState(false)
    }
  };

  const renderUploadBox = (label, file, setFile, inputId) => (
    <div className="upload-section">
      <label className="upload-label">{label}</label>
      <div className="upload-box" onClick={() => document.getElementById(inputId).click()}>
        <input
          type="file"
          id={inputId}
          className="hidden-input"
          onChange={(e) => handleFileChange(e, setFile)}
        />
        <div className="upload-content">
          <p>{file ? file.name : `Upload ${label}`}</p>
          <span>Click or drag to upload</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="kycwrapper">
      <div className="kycmobilewrap">
      <div className='smallarrow' ><IoArrowBackCircleOutline onClick={()=>nav(-1)}/></div>

        <h1>KYC</h1>
      </div>
      <div className="kycinfowrap">
        <div className="kyclogohold">
          <HiOutlineArrowCircleLeft size={50} onClick={() => nav(-1)} />
          <Link to="/">
            <img src="images/alifenobg.png" alt="Logo" className="kyclogo" />
          </Link>
        </div>

        <div className="kycinfo1">
          <h1>KYC</h1>

          {renderUploadBox('Facility Image', facilityImg, setFacilityImg, 'file1')}
          {renderUploadBox('Accredited Certificate', certificate, setCertificate, 'file2')}
          {renderUploadBox('Utility Bill', utilityBill, setUtilityBill, 'file3')}

          <div className="kycinputwrapper">
            <p>LICENSE NUMBER</p>
            <input
              type="text"
              className="kycinput"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
          </div>

          <button className="kycbtn" onClick={handleSubmit}>
            {loadState? <FadeLoader color="white" size={25}/> : "SUBMIT"}
          </button>
        </div>
      </div>
      <img src="images/Subtract.png" alt="" className="kycsignimage" />
    </div>
  );
};

export default KYC;

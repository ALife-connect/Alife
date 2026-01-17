import React, { useState } from "react";
import "./hospitalsettingspage.css";
import { TiCloudStorageOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { logIn } from "../../global/Slice";
import FadeLoader from "react-spinners/CircleLoader";


const Base_Url = import.meta.env.VITE_BASEURL

const HospitalSettingsPage = () => {

  const [userData, setUserData] = useState({
    fullName: "",
    state: "",
    address: "",
    phoneNumber: "",
    email: "",
    profilePicture: null
  });


  const token = useSelector((state) => state?.token);
  const [resetPasswordInput, setResetPasswordInput] = useState({
    token,
    newPassword: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()


  const handleResetPassword = async () => {
    if (resetPasswordInput?.newPassword !== confirmPassword) {
      toast.error("New Password do not match");
      return;
    }
    if (!resetPasswordInput?.newPassword || !confirmPassword) {
      toast.error("Please input a new Password");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await axios.post(`${Base_Url}/hospital/resetPassword`,
        resetPasswordInput
        , { headers: { Authorization: `Bearer ${token}` } });
      toast.success(res?.data?.message);
      setPasswordLoading(false);
      return;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setPasswordLoading(false);
    }
  };

  const [imagePreview, setImagePreview] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePicture(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setProfilePicture(null);
      setImagePreview(null);
    }
  };

  const handleUpdateProfile = async () => {
    if (
      !userData.fullName ||
      !userData.state ||
      !userData.address ||
      !userData.phoneNumber ||
      !userData.email
    ) {
      toast.error("Please input all fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    formData.append("state", userData.state);
    formData.append("address", userData.address);
    formData.append("phone", userData.phoneNumber);
    if (userData.profilePicture) {
      formData.append("profilePicture", userData.profilePicture);
    }


    setLoading(true);
    try {
      const res = await axios.patch(`${Base_Url}/hospital/updateProfile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res?.data?.message);
      setUserData({
        fullName: "",
        state: "",
        address: "",
        phoneNumber: "",
        email: "",
        profilePicture: null,
      });
      dispatch(logIn(res?.data?.data));
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };




  const lagosLGAs = [
    { label: "Agege", value: "Agege" },
    { label: "Ajeromi-Ifelodun", value: "Ajeromi-Ifelodun" },
    { label: "Alimosho", value: "Alimosho" },
    { label: "Amuwo-Odofin", value: "Amuwo-Odofin" },
    { label: "Apapa", value: "Apapa" },
    { label: "Badagry", value: "Badagry" },
    { label: "Epe", value: "Epe" },
    { label: "Eti-Osa", value: "Eti-Osa" },
    { label: "Ibeju-Lekki", value: "Ibeju-Lekki" },
    { label: "Ifako-Ijaiye", value: "Ifako-Ijaiye" },
    { label: "Ikeja", value: "Ikeja" },
    { label: "Ikorodu", value: "Ikorodu" },
    { label: "Kosofe", value: "Kosofe" },
    { label: "Lagos Island", value: "Lagos Island" },
    { label: "Lagos Mainland", value: "Lagos Mainland" },
    { label: "Mushin", value: "Mushin" },
    { label: "Ojo", value: "Ojo" },
    { label: "Oshodi-Isolo", value: "Oshodi-Isolo" },
    { label: "Shomolu", value: "Shomolu" },
    { label: "Surulere", value: "Surulere" },
  ];




  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  return (
    <div className="HospitalSettingsPageWrapper">
      <h1>Settings</h1>

      <div className="HospitalSettingssideWrapper">
        <div className="HospitalSettingsprofilePageProflePicWrapper">
          <div className="HospitalprofilePicture">
            <label htmlFor="profile-upload" className="uploadIconLabel">
              <TiCloudStorageOutline size={24} className="UploadIcon" />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setUserData({ ...userData, profilePicture: file });
              }}
              className="hiddenFileInput"
            />
            {userData.profilePicture ? (
              <img src={URL.createObjectURL(userData.profilePicture)} alt="Selected" />
            ) : (
              <img src="/images/default profile pic.jpg" alt="Default" />
            )}



          </div>

          <button>Delete</button>
        </div>

        <div className="HospitalSettingsInputsWrapper">
          <label>Hospital Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="hospitalsettingInputs"
            value={userData.fullName}
            onChange={(e) => setUserData((prev) => ({ ...prev, fullName: e.target.value }))}
          />
          <label>Local Government</label>
          <select
            className="hospitalsettingInputs"
            onChange={handleChange}
            id="bloodGroup"
            name="state"
          >
            <option value="">Select your LGA</option>
            {lagosLGAs.map((item, index) => (
              <option key={index} value={item.value}>{item?.value}</option>
            ))}
          </select>
          <label>Address</label>
          <input
            type="text"
            placeholder="e.g. 12 Allen Avenue, Ikeja"
            className="hospitalsettingInputs"
            value={userData.address}
            onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
          />
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="+234*********"
            className="hospitalsettingInputs"
            value={userData.phoneNumber}
            onChange={(e) => setUserData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="you@example.com"
            className="hospitalsettingInputs"
            value={userData.email}
            onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <button className="editProfileButton" onClick={handleUpdateProfile}>{loading ? <FadeLoader color="white" size={25} /> : "Edit Profile"}</button>
      </div>

      <div className="HospitalSettingsPasswordsideWrapper">
        <div className="HospitalSettingsInputsWrapper">
          <label>New Password</label>
          <input
            type="text"
            placeholder="Enter Password"
            className="hospitalsettingInputs"
            value={resetPasswordInput.newPassword}
            onChange={(e) => setResetPasswordInput((prev) => ({ ...prev, newPassword: e.target.value }))}
          />
          <label>Confrm Password</label>
          <input
            type="text"
            placeholder="Enter Password"
            className="hospitalsettingInputs"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="editProfileButton" onClick={handleResetPassword}>{passwordLoading ? <FadeLoader color="white" size={25} /> : "Change Password"}</button>
      </div>
    </div>
  );
};

export default HospitalSettingsPage;

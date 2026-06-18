import React, { useRef, useState, useEffect } from "react";
import "./settingsPage.css";
import { toast } from "sonner";
import CircleLoader from "react-spinners/CircleLoader";
import axios from "axios";
import { FaCamera, FaTrashAlt, FaCloudUploadAlt } from "react-icons/fa";
import { LuEye, LuEyeClosed } from "react-icons/lu"; // Added eye icon tracking components
import { useDispatch, useSelector } from "react-redux";
import { logIn, profilePic } from "../../global/Slice";

const Base_Url = import.meta.env.VITE_BASEURL;

const SettingsPage = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const token = useSelector((state) => state?.token);
  const InitialUserData = useSelector((state) => state?.loggedInUser) || {};

  // Form states tracking profile configuration changes
  const [userData, setUserData] = useState({
    fullName: InitialUserData?.fullName || "",
    gender: InitialUserData?.gender || "",
    location: InitialUserData?.location || "",
    phoneNumber: InitialUserData?.phoneNumber || "",
    email: InitialUserData?.email || "",
    age: InitialUserData?.age || "",
    bloodType: InitialUserData?.bloodType || "",
  });

  const [changePasswordDatas, setChangePasswordDatas] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);

  // Visibility toggle states for each secure input field
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialize visual states with existing user imagery assets
  const [imagePreview, setImagePreview] = useState(InitialUserData?.profilePics || null);
  const [profilePicture, setProfilePicture] = useState(null);

  // Sync internal local state hooks if store dependencies change asynchronously
  useEffect(() => {
    if (InitialUserData) {
      setUserData({
        fullName: InitialUserData.fullName || "",
        gender: InitialUserData.gender || "",
        location: InitialUserData.location || "",
        phoneNumber: InitialUserData.phoneNumber || "",
        email: InitialUserData.email || "",
        age: InitialUserData.age || "",
        bloodType: InitialUserData.bloodType || "",
      });
      if (InitialUserData.profilePics) {
        setImagePreview(InitialUserData.profilePics);
      }
    }
  }, [InitialUserData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeletePhoto = () => {
    setImagePreview(InitialUserData?.profilePics || null);
    setProfilePicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    if (!profilePicture) {
      toast.error("Please choose a new image file first.");
      return;
    }

    try {
      setPhotoLoading(true);
      const formData = new FormData();
      formData.append("profilePics", profilePicture);

      const res = await axios.put(`${Base_Url}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res?.data?.message || "Profile picture updated!");
      dispatch(profilePic(res?.data?.data?.profilePics || res?.data?.data));
      setProfilePicture(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to upload image file.");
    } finally {
      setPhotoLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!userData.fullName.trim() || !userData.email.trim()) {
      toast.error("Full Name and Email address fields cannot be left blank.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(`${Base_Url}/update-profile`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res?.data?.message || "Profile text records updated!");
      if (res?.data?.data) {
        dispatch(logIn(res.data.data));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred during updating.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!changePasswordDatas.currentPassword || !changePasswordDatas.newPassword) {
      toast.error("Please fill in all security password fields.");
      return;
    }
    if (changePasswordDatas.newPassword !== confirmPassword) {
      toast.error("Your newly assigned passwords do not match.");
      return;
    }

    try {
      setPasswordLoading(true);
      const res = await axios.put(`${Base_Url}/changePassword`, changePasswordDatas, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res?.data?.message || "Password updated successfully.");
      setChangePasswordDatas({ currentPassword: "", newPassword: "" });
      setConfirmPassword("");
      
      // Reset eye dropdown parameters back to obscure mask visibility configurations
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update security credentials.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="SettingsPageWrapper">
      <header className="SettingsHeader">
        <h1>Account Settings</h1>
        <p>Manage your public profile information, contact channels, and account security credentials.</p>
      </header>

      <div className="SettingsLayoutGrid">
        {/* Left Section: Profile Info and Image Management */}
        <div className="SettingsPrimaryColumn">
          <section className="SettingsCard">
            <h3>Profile Photo</h3>
            <div className="AvatarUploadContext">
              <div className="AvatarPreviewFrame">
                {imagePreview ? (
                  <img src={imagePreview} alt="User Avatar Viewport" />
                ) : (
                  <FaCamera className="FallbackCameraIcon" />
                )}
                <label htmlFor="imageUpload" className="FloatingCameraBadge" title="Choose new image file">
                  <FaCamera />
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="HiddenInputNode"
                  onChange={handleImageChange}
                />
              </div>

              <div className="AvatarActionControls">
                <button 
                  className="PrimaryActionButton textIconButton" 
                  onClick={handlePhotoSubmit}
                  disabled={photoLoading || !profilePicture}
                >
                  {photoLoading ? <CircleLoader color="#ffffff" size={16} /> : <><FaCloudUploadAlt /> Save Photo</>}
                </button>
                {profilePicture && (
                  <button className="SecondaryActionButton textIconButton variantDelete" onClick={handleDeletePhoto}>
                    <FaTrashAlt /> Discard
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="SettingsCard">
            <h3>Personal Information</h3>
            <form onSubmit={handleUpdateProfile} className="FormLayoutGrid">
              <div className="FormGroup fullWidthRow">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="FormGroup">
                <label>Gender</label>
                <select name="gender" value={userData.gender} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="FormGroup">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                  placeholder="25"
                />
              </div>

              <div className="FormGroup">
                <label>Blood Type</label>
                <select name="bloodType" value={userData.bloodType} onChange={handleInputChange}>
                  <option value="">Select Type</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="FormGroup">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={handleInputChange}
                  placeholder="Lagos, Nigeria"
                />
              </div>

              <div className="FormGroup">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+234..."
                />
              </div>

              <div className="FormGroup">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="example@domain.com"
                />
              </div>

              <div className="FormActionWrapper fullWidthRow">
                <button type="submit" className="PrimaryActionButton" disabled={loading}>
                  {loading ? <CircleLoader color="#ffffff" size={20} /> : "Save Profile Changes"}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Right Section: Security Configuration */}
        <div className="SettingsSecondaryColumn">
          <section className="SettingsCard">
            <h3>Security & Password</h3>
            <form onSubmit={handleResetPassword} className="SingleColumnForm">
              
              <div className="FormGroup">
                <label>Current Password</label>
                <div className="PasswordInputContainer">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={changePasswordDatas.currentPassword}
                    onChange={(e) =>
                      setChangePasswordDatas((prev) => ({ ...prev, currentPassword: e.target.value }))
                    }
                  />
                  <button
                    type="button"
                    className="PasswordToggleToggle"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                  >
                    {showCurrentPassword ? <LuEyeClosed /> : <LuEye />}
                  </button>
                </div>
              </div>

              <div className="FormGroup">
                <label>New Password</label>
                <div className="PasswordInputContainer">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={changePasswordDatas.newPassword}
                    onChange={(e) =>
                      setChangePasswordDatas((prev) => ({ ...prev, newPassword: e.target.value }))
                    }
                  />
                  <button
                    type="button"
                    className="PasswordToggleToggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <LuEyeClosed /> : <LuEye />}
                  </button>
                </div>
              </div>

              <div className="FormGroup">
                <label>Confirm New Password</label>
                <div className="PasswordInputContainer">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="PasswordToggleToggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <LuEyeClosed /> : <LuEye />}
                  </button>
                </div>
              </div>

              <div className="FormActionWrapper">
                <button type="submit" className="PrimaryActionButton variantSecurity" disabled={passwordLoading}>
                  {passwordLoading ? <CircleLoader color="#ffffff" size={20} /> : "Update Password"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
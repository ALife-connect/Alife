import React, { useState } from "react";
import "./hospitalsettingspage.css";
import { TiCloudStorageOutline } from "react-icons/ti";
import { FiUser, FiMapPin, FiPhone, FiMail, FiLock, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { logIn } from "../../global/Slice";
import FadeLoader from "react-spinners/CircleLoader";

const Base_Url = import.meta.env.VITE_BASEURL;

const HospitalSettingsPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.token);

  const [userData, setUserData] = useState({
    fullName: "",
    state: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [resetPasswordInput, setResetPasswordInput] = useState({
    token,
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility States for Passwords
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const lagosLGAs = [
    "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa",
    "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye",
    "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland",
    "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClearImage = () => {
    setProfilePicture(null);
    setImagePreview(null);
  };

  const handleUpdateProfile = async () => {
    if (
      !userData.fullName ||
      !userData.state ||
      !userData.address ||
      !userData.phoneNumber ||
      !userData.email
    ) {
      toast.error("Please populate all profile detail parameters.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", userData.fullName);
    formData.append("state", userData.state);
    formData.append("address", userData.address);
    formData.append("phone", userData.phoneNumber);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    setLoading(true);
    try {
      const res = await axios.patch(`${Base_Url}/hospital/updateProfile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res?.data?.message || "Profile credentials updated.");
      dispatch(logIn(res?.data?.data));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save data revisions.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetPasswordInput.newPassword || !confirmPassword) {
      toast.error("Please fill out both password configuration targets.");
      return;
    }
    if (resetPasswordInput.newPassword !== confirmPassword) {
      toast.error("Security configurations do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await axios.post(
        `${Base_Url}/hospital/resetPassword`,
        resetPasswordInput,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res?.data?.message || "Security access phrase updated.");
      setResetPasswordInput((prev) => ({ ...prev, newPassword: "" }));
      setConfirmPassword("");
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Authorization modification failed.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="HospitalSettingsPanelMasterLayout">
      <header className="SettingsHeaderSegmentBlock">
        <h1>Account Settings</h1>
        <p>Manage your medical facility profile metrics, geographic deployment coordinates, and access authority rules.</p>
      </header>

      <div className="SettingsModularDashboardGrid">
        
        {/* Card Block 1: Profile & Identity details configuration */}
        <section className="SettingsWorkspaceCardBox">
          <div className="CardBoxSectionTitleLabel">
            <h2>Facility Identification</h2>
            <p>Update baseline institutional public directory identities.</p>
          </div>

          <div className="AvatarUploadManagementComponent">
            <div className="AvatarImageMaskCircle">
              <img 
                src={imagePreview || "/images/default profile pic.jpg"} 
                alt="Institutional logo preview frame" 
                onError={(e) => { e.target.src = "/images/default profile pic.jpg"; }}
              />
              <label htmlFor="profile-upload" className="AvatarActionOverlayLabel">
                <TiCloudStorageOutline size={22} />
                <span>Upload New</span>
              </label>
            </div>
            
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="HiddenNativeFileMechanicControl"
            />

            {imagePreview && (
              <button type="button" className="AvatarResetActionTrigger" onClick={handleClearImage}>
                <FiTrash2 size={13} /> Remove
              </button>
            )}
          </div>

          <div className="StructuredFormGroupInputsStack">
            <div className="ConfigInputFieldGroup">
              <label htmlFor="fullName"><FiUser /> Official Hospital Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="e.g. St. Nicholas Medical Center"
                value={userData.fullName}
                onChange={handleChange}
                className="SettingsGenericTextControlField"
              />
            </div>

            <div className="ConfigInputFieldGroup">
              <label htmlFor="state"><FiMapPin /> Local Government Area (LGA)</label>
              <select
                id="state"
                name="state"
                value={userData.state}
                onChange={handleChange}
                className="SettingsGenericSelectControlField"
              >
                <option value="">Select operational zone</option>
                {lagosLGAs.map((lga, index) => (
                  <option key={index} value={lga}>{lga}</option>
                ))}
              </select>
            </div>

            <div className="ConfigInputFieldGroup">
              <label htmlFor="address"><FiMapPin /> Physical Address Location</label>
              <input
                id="address"
                type="text"
                name="address"
                placeholder="e.g. 12 Allen Avenue, Ikeja"
                value={userData.address}
                onChange={handleChange}
                className="SettingsGenericTextControlField"
              />
            </div>

            <div className="ConfigInputFieldGroup">
              <label htmlFor="phoneNumber"><FiPhone /> Secure Contact Phone</label>
              <input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                placeholder="e.g. +2348030000000"
                value={userData.phoneNumber}
                onChange={handleChange}
                className="SettingsGenericTextControlField"
              />
            </div>

            <div className="ConfigInputFieldGroup">
              <label htmlFor="email"><FiMail /> Administrative Email Registry</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="contact@hospital.org"
                value={userData.email}
                onChange={handleChange}
                className="SettingsGenericTextControlField"
              />
            </div>
          </div>

          <div className="CardActionsSubmissionFooterBlock">
            <button className="FormMasterCTAActionButton" onClick={handleUpdateProfile} disabled={loading}>
              {loading ? <FadeLoader color="white" size={18} /> : "Save Profile Revisions"}
            </button>
          </div>
        </section>

        {/* Card Block 2: Security Parameters & Passphrase Adjustment */}
        <section className="SettingsWorkspaceCardBox securityAllocationAdjustmentCard">
          <div className="CardBoxSectionTitleLabel">
            <h2>Access Protection</h2>
            <p>Revise cryptographic access vectors to secure institutional data assets.</p>
          </div>

          <div className="StructuredFormGroupInputsStack">
            <div className="ConfigInputFieldGroup">
              <label htmlFor="newPassword"><FiLock /> New Secure Password Target</label>
              <div className="PasswordInputRelativeWrapper">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={resetPasswordInput.newPassword}
                  onChange={(e) => setResetPasswordInput((prev) => ({ ...prev, newPassword: e.target.value }))}
                  className="SettingsGenericTextControlField context-password"
                />
                <button 
                  type="button" 
                  className="PasswordVisibilityToggleTrigger"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div className="ConfigInputFieldGroup">
              <label htmlFor="confirmPassword"><FiLock /> Retype New Password Verification</label>
              <div className="PasswordInputRelativeWrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="SettingsGenericTextControlField context-password"
                />
                <button 
                  type="button" 
                  className="PasswordVisibilityToggleTrigger"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="CardActionsSubmissionFooterBlock">
            <button className="FormMasterCTAActionButton variant-security" onClick={handleResetPassword} disabled={passwordLoading}>
              {passwordLoading ? <FadeLoader color="white" size={18} /> : "Update Access Phrase"}
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HospitalSettingsPage;
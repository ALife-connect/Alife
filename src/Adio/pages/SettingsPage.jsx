import React, { useRef, useState } from "react";
import "./settingsPage.css";
import { toast } from "sonner";
import FadeLoader from "react-spinners/CircleLoader";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logIn, profilePic } from "../../global/Slice";

const Base_Url = import.meta.env.VITE_BASEURL;

const SettingsPage = () => {
  const InitialUserData = useSelector((state) => state?.loggedInUser);

  const [userData, setUserData] = useState({
    fullName: InitialUserData.fullName,
    gender: InitialUserData.gender || "Male/Female",
    location: InitialUserData.location,
    phoneNumber: InitialUserData.phoneNumber || "+234***********",
    email: InitialUserData.email,
    age: InitialUserData.age,
    bloodType: InitialUserData.bloodType,
  });

  const [changePasswordDatas, setChangePasswordDatas] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.token);

  const handleUpdateProfile = async () => {
    if (
      !userData.fullName &&
      !userData.gender &&
      !userData.location &&
      !userData.phoneNumber &&
      !userData.email &&
      !userData.age &&
      !userData.bloodType
    ) {
      toast.error("Please input fields");
      return;
    }
    if (!profilePicture) {
      toast.error("Please select an image first");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(`${Base_Url}/update-profile`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res?.data?.message);
      setUserData({
        fullName: "",
        gender: "",
        location: "",
        phoneNumber: "",
        email: "",
        age: "",
        bloodType: "",
      });
      dispatch(logIn(res?.data?.data));
      dispatch(profilePic(res?.data?.data?.profilePics));
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = () => {
    setImagePreview(null);
    setProfilePicture(null);
    fileInputRef.current.value = "";
  };

  const handleResetPassword = async () => {
    if (changePasswordDatas.newPassword !== confirmPassword) {
      toast.error("New Password do not match");
      return;
    }
    if (
      !changePasswordDatas.newPassword ||
      !changePasswordDatas.currentPassword ||
      !confirmPassword
    ) {
      toast.error("Please input a new Password");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await axios.put(
        `${Base_Url}/changePassword`,
        changePasswordDatas,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res?.data?.message);
      setPasswordLoading(false);
      setNewPasswords("");
      setConfirmPassword("");

      return;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setPasswordLoading(false);
    }
  };

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [resetInput, setResetInput] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePics", profilePicture);

      const res = await axios.put(`${Base_Url}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setResetInput((prev) => !prev);
      setLoading(false);
      toast.success(res?.data?.message);
      dispatch(profilePic(res?.data?.data));
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        console.error("An error occurred while submitting the form:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SettingsPageWrapper">
      <h1>Profile Settings</h1>

      <div className="SettingssideWrapper">
        <div className="profilePageProflePicWrapper">
          <label htmlFor="imageUpload">
            <div className="settingsProfilePicture">
              {!imagePreview && <FaCamera className="cam" />}
              {imagePreview && <img src={imagePreview} alt="User Profile" />}
              <input
                key={resetInput ? "reset" : "normal"}
                ref={fileInputRef}
                type="file"
                id="imageUpload"
                accept="image/*"
                name="addImage"
                className="UploadFileInput"
                onChange={handleImageChange}
              />
            </div>
          </label>
          <button onClick={handleSubmit}> Add Photo</button>
          <button onClick={handleDeletePhoto}>Delete</button>
        </div>

        <div className="settingsInputsWrapper">
          <label>Full Name</label>
          <input
            type="text"
            className="settingInputs"
            value={userData.fullName}
            onChange={(e) =>
              setUserData({ ...userData, fullName: e.target.value })
            }
          />
          <label>Gender</label>
          <select
            className="settingInputs"
            value={userData.gender}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
          >
            <option value="">
              {InitialUserData.gender
                ? InitialUserData.gender
                : "--Male/Female--"}
            </option>
            <option value="Male">male</option>
            <option value="Female">female</option>
          </select>

          <label>Location</label>
          <input
            type="text"
            className="settingInputs"
            value={userData.location}
            onChange={(e) =>
              setUserData({ ...userData, location: e.target.value })
            }
          />
          <label>Phone Number</label>
          <input
            type="text"
            className="settingInputs"
            value={userData.phoneNumber}
            onChange={(e) =>
              setUserData({ ...userData, phoneNumber: e.target.value })
            }
          />
          <label>Email</label>
          <input
            type="text"
            className="settingInputs"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <label>Age</label>
          <input
            type="text"
            className="settingInputs"
            value={userData.age}
            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
          />
          <label>Blood Type</label>
          <select
            className="settingInputs"
            value={userData.bloodType}
            onChange={(e) =>
              setUserData({ ...userData, bloodType: e.target.value })
            }
          >
            <option value="">-- BloodType --</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <button
            className="editProfileButton"
            onClick={handleUpdateProfile}
            disabled={loading}
          >
            {loading ? <FadeLoader color="white" size={25} /> : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className="SettingsPasswordsideWrapper">
        <div className="settingsInputsWrapper">
          <label>Current Password</label>
          <input
            type="password"
            className="settingInputs"
            placeholder="Current Password"
            value={changePasswordDatas.currentPassword}
            onChange={(e) =>
              setChangePasswordDatas((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
          />
          <label>New Password</label>
          <input
            type="password"
            className="settingInputs"
            placeholder="New Password"
            value={changePasswordDatas.newPassword}
            onChange={(e) =>
              setChangePasswordDatas((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
          />
          <label>Confirm Password</label>
          <input
            type="password"
            className="settingInputs"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="editProfileButton" onClick={handleResetPassword}>
            {passwordLoading ? (
              <FadeLoader color="white" size={25} />
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

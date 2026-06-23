import React, { useState, useRef } from 'react';
import '../../Esther/styles/settings.css';
import { toast } from 'sonner';

const Settings = () => {
  // Profile Data States
  const [profile, setProfile] = useState({
    fullName: 'Hero Medical Center',
    location: 'Ikeja, Lagos',
    phoneNumber: '09013717091',
    email: 'mayriepatrick@gmail.com'
  });

  // Password Update States
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // Handle Text Inputs changes dynamically
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Image Upload Handling
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size is too large. Max limit is 2MB.");
        return;
      }
      setProfileImage(URL.createObjectURL(file));
      toast.success("New photo preview loaded!");
    }
  };

  const handleDeletePhoto = () => {
    setProfileImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.info("Profile photo removed.");
  };

  // Submission Operations
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profile.fullName || !profile.email) {
      toast.error("Full Name and Email Address are mandatory fields.");
      return;
    }
    // API action template can be injected here
    toast.success("Profile changes saved successfully!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all security credential fields.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Confirmation matching error. Password strings must be identical.");
      return;
    }

    // API action template can be injected here
    toast.success("Security credentials updated successfully!");
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className='adminsettingswrap'>
      <div className="settings-section-card">
        <h1>Profile Settings</h1>
        
        <div className="adminsidewrapper">
          {/* Avatar Management Panel */}
          <div className="adminsettingsprofilewrapper">
            <div 
              className="settingprofilepics" 
              style={{ backgroundImage: profileImage ? `url(${profileImage})` : 'none' }}
            >
              {!profileImage && profile.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="avatar-control-buttons">
              <button type="button" onClick={handleImageUploadClick} className="upload-photo-btn">
                Upload New Photo
              </button>
              <button type="button" onClick={handleDeletePhoto} className="delete-photo-btn">
                Delete
              </button>
            </div>
            {/* Hidden native pointer interface */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
          </div>

          {/* Profile Core Metas */}
          <form onSubmit={handleSaveProfile} className="adminInputsWrapper">
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <input 
                id="fullName"
                type="text" 
                name="fullName"
                value={profile.fullName} 
                onChange={handleProfileChange}
                placeholder='Enter center name' 
                className='adminsettingInputs'
              />
            </div>

            <div className="input-group">
              <label htmlFor="location">Location</label>
              <input 
                id="location"
                type="text" 
                name="location"
                value={profile.location} 
                onChange={handleProfileChange}
                placeholder='City, State' 
                className='adminsettingInputs'
              />
            </div>

            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input 
                id="phoneNumber"
                type="text" 
                name="phoneNumber"
                value={profile.phoneNumber} 
                onChange={handleProfileChange}
                placeholder='Contact extension' 
                className='adminsettingInputs'
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                name="email"
                value={profile.email} 
                onChange={handleProfileChange}
                placeholder='administrative@domain.com' 
                className='adminsettingInputs'
              />
            </div>

            <button type="submit" className="editProfileButton">Save Changes</button>
          </form>
        </div>
      </div>

      {/* Security Module Card */}
      <div className="settings-section-card security-card-adjustment">
        <h1>Change Password</h1>
        
        <form onSubmit={handleChangePassword} className="adminInputsWrapper">
          <div className="input-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input 
              id="currentPassword"
              type="password" 
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder='••••••••' 
              className='adminsettingInputs'
            />
          </div>

          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input 
              id="newPassword"
              type="password" 
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder='••••••••' 
              className='adminsettingInputs'
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input 
              id="confirmPassword"
              type="password" 
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder='••••••••' 
              className='adminsettingInputs'
            />
          </div>

          <button type="submit" className="editProfileButton change-pass-btn">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
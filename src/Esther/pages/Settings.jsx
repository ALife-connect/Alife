import React from 'react'
import '../../Esther/styles/settings.css'

const Settings = () => {
  return (
    <div className='adminsettingswrap'>
      <h1>Profile Settings</h1>

      <div className="adminsidewrapper">

        <div className="adminsettingsprofilewrapper">
          <div className="settingprofilepics"></div>
          <button>UpLoad New Photo</button>
          <button>Delete</button>
        </div>

        <div className="adminInputsWrapper">
          <label>Full Name</label>
          <input type="text" placeholder='Hero Meical Center' className='adminsettingInputs'/>
          <label>Location</label>
          <input type="text" placeholder='Ikeja, lagos' className='adminsettingInputs'/>
          <label>Phone Number</label>
          <input type="text" placeholder='09013717091' className='adminsettingInputs'/>
          <label>Email Address</label>
          <input type="email" placeholder='mayriepatrick@gmail.com' className='adminsettingInputs'/>
          <button className="editProfileButton">Save Change</button>
        </div>
      </div>

      <div className="adminsettingspasswrap">
        <h1>Change Password</h1>
      <div className="adminInputsWrapper">
          <label>Current Password</label>
          <input type="text" placeholder='Enter Password' className='adminsettingInputs'/>
          <label>New Password</label>
          <input type="text" placeholder='Enter Password' className='adminsettingInputs'/>
          <label>Confrm Password</label>
          <input type="text" placeholder='Enter Password' className='adminsettingInputs'/>
          <button className="editProfileButton">Change</button>
        </div>
      </div>
    </div>
  )
}

export default Settings
import React, { useState } from 'react'
import '../../Esther/styles/reset.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import FadeLoader from 'react-spinners/CircleLoader';
import { toast } from 'sonner'
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const VITE_BASEURL = import.meta.env.VITE_BASEURL

const Resetpassword = () => {
  const [newPassword, setNewPassword] = useState("")
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const nav = useNavigate()
  const {token} = useParams()

  const handleResetPassword = async() =>{
    setLoading(true)
    if(newPassword !== ConfirmNewPassword){
      toast.error("New Password do not match!")
      return
    } if(!newPassword || !ConfirmNewPassword){
      toast.error("Input a new password!")
      return
    }
    try{
      const ress = await axios.post(`${VITE_BASEURL}/resetPassword/${token}`, {
      newPassword
      });      
      (ress)
      setLoading(false)
      toast.success(ress?.data?.message)
      return
    }catch(err){
      toast.error(err?.response?.data?.message)
      setLoading(false)
    }
  }

  return (
    <div className='resetwrapper'>
      <div className='resetmobilewrap'>
      <div className='smallarrow' ><IoArrowBackCircleOutline onClick={()=>nav(-1)}/></div>

        <h2>RESET PASSWORD</h2>
      </div>
      <div className='resetinfowrap'>
        <div className='resetlogohold'>
        <HiOutlineArrowCircleLeft size={50} onClick={()=> nav(-1)} />
          <Link to="/">
            <img src="/images/logo.png" alt="Logo" className='resetlogo'/>
          </Link>
          
        </div>
        <div className='resetinfo1'>
          <h2>RESET PASSWORD</h2>
          <div className='resetinputwrapper'>
            <p>PASSWORD</p>
            <input type="password" className='resetinput'
            placeholder='Password'
            value={newPassword}
            onChange={(e)=> setNewPassword(e.target.value)}
            />
          </div>
          <div className='resetinputwrapper'>
            <p>CONFIRM PASSWORD</p>
            <input type="password" className='resetinput'
             placeholder='Password'
             value={ConfirmNewPassword}
             onChange={(e)=> setConfirmNewPassword(e.target.value)}
            />
          </div>
          <button className='resetbtn' onClick={handleResetPassword}>{loading ? <FadeLoader color='white' size={25}/> : "RESET"}</button>
        </div>
      </div>
      <img src="/images/Subtract.png" alt="" className='resetimage'/>
    </div>
  )
}

export default Resetpassword
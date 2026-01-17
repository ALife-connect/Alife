import React, { useState } from 'react'
import '../../Esther/styles/adminlogin.css'
import { Link, useNavigate } from 'react-router'
import FadeLoader from 'react-spinners/CircleLoader'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { logIn, saveToken } from '../../global/Slice'

const Base_Url = import.meta.env.VITE_BASEURL


const Adminlogin = () => {
    const [adminData, setAdminData] = useState({
      email : '',
      password : ''
    })
    const [loadState, setLoadState] = useState(false)
  
    const dispatch = useDispatch()
    const nav = useNavigate()
  
  
    const handleLogin = async() =>{
      if(!adminData.email || !adminData.password){
        toast.error("Please fill in your details")
        return
      }
      setLoadState(true)
      try{
        const res = await axios.post(`${Base_Url}/admin/login`, adminData)
        dispatch(logIn(res?.data?.data))
        dispatch(saveToken(res?.data?.token))
        toast.success(res?.data?.message)
        nav("/dashboard")
        setLoadState(false)
      }catch(err){
        (err)
        setLoadState(false)
      }
    }
    return (
        <div className='admindonorloginwrapper'>
          <div className='admindonorloginmobilewrap'>
            <h2>LOG IN</h2>
          </div>
          <img src="images/Subtract.png" alt="" className='admindonorslogimage'/>
          <div className='admindonorlogininfowrap'>
          <div className='admindonorloginlogohold'>
              <Link to="/">
                <img src="images/logo.png" alt="Logo" className='admindonorloginlogo'/>
              </Link>
            </div>
            <div className='admindonorlogininfo1'>
              <h2>LOG IN</h2>
              <div className='admindonorlogininputwrapper'>
                <p>EMAIL ADDRESS</p>
                <input type="email" placeholder='ENTER EMAIL' className='admindonorlogininput'
                value={adminData.email}
                onChange={(e)=> setAdminData(prev => ({...prev, email : e.target.value}))}
                />
              </div>
              <div className='admindonorlogininputwrapper'>
                <p>ENTER PASSWORD</p>
                <input type="password" placeholder='PASSWORD' className='admindonorlogininput' 
                value={adminData.password}
                onChange={(e)=> setAdminData(prev => ({...prev, password : e.target.value}))}
                />
              </div>

              <button className='admindonorloginbtn' onClick={handleLogin}>{loadState? <FadeLoader color="white" size={25}/> : "LOG-IN"}</button>
              <div className='admindonorloginforgotwrap'>
                <p onClick={()=>nav("/adminsignin")}>DON'T HAVE AN ACCOUNT?SIGNUP</p>
                <p onClick={()=> nav("/adminforgotpassword")}>FORGOT PASSWORD</p>
              </div>
            </div>
          </div>
        </div>
      )
}

export default Adminlogin
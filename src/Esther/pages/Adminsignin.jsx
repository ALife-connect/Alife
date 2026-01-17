import React, { useState } from 'react'
import '../../Esther/styles/adminsignin.css'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { logIn } from '../../global/Slice'
import FadeLoader from 'react-spinners/CircleLoader'
const Base_Url = import.meta.env.VITE_BASEURL

const Adminsignin = () => {
  const [adminData, setAdminData] = useState({
    fullName : '',
    email : '',
    role : 'admin',
    password : ''
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loadState, setLoadState] = useState(false)

  const dispatch = useDispatch()
  const nav = useNavigate()


  const handleSignUp = async() =>{
    if(!adminData.fullName || !adminData.email || !adminData.password){
      toast.error("Please fill in your details")
      return
    }if(adminData.password !== confirmPassword){
      toast.error("Password do not match")
      return
    }
    setLoadState(true)
    try{
      const res = await axios.post(`${Base_Url}/admin/newRegister`, adminData)
      dispatch(logIn(res))
      toast.success(res?.data?.message)
      nav("/dashboard")
      setLoadState(false)
    }catch(err){
      setLoadState(false)
    }
  }
    return (
        <div className='adminsignwrapper'>
          <img src="images/Subtract.png" alt="" className='adminsignimg'/>
          <div className='adminmobilewrap'>
            <h1>CREATE AN ACCOUNT</h1>
            <p>REGISTER AS ADMIN</p>
          </div>
          <div className='adminsigninfowrap'>
            <div className='adminsignlogohold'>
              <Link to="/">
                <img src="images/logo.png" alt="Logo" className='adminsignlogo'/>
              </Link>
            </div>
            <div className='adminsigninfo1'>
              <h1>REGISTER AS AN <br />ADMIN</h1>
              <div className='adminsigninputwrapper'>
                <p>NAME</p>
                <input type="text" placeholder='FULL NAME' className='adminsigninput' 
                value={adminData.fullName}
                onChange={(e)=> setAdminData(prev => ({...prev, fullName : e.target.value}))}
                />
              </div>
              <div className='adminsigninputwrapper'>
                <p>EMAIL ADDRESS</p>
                <input type="text" placeholder='ENTER ADDRESS' className='adminsigninput' 
                  value={adminData.email}
                  onChange={(e)=> setAdminData(prev => ({...prev, email : e.target.value}))}
                />
              </div>
              <div className='adminsigninputwrapper'>
                <p>PASSWORD</p>
                <input type="password" placeholder='Password' className='adminsigninput' 
                  value={adminData.password}
                  onChange={(e)=> setAdminData(prev => ({...prev, password : e.target.value}))}
                />
              </div>
              <div className='adminsigninputwrapper'>
                <p>CONFIRM PASSWORD</p>
                <input type="password" placeholder='Confirm Password' className='adminsigninput' 
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                />
              </div>
              
              <button className='adminbtn' onClick={handleSignUp}>{loadState? <FadeLoader color="white" size={25}/> : "SIGN-IN"}</button>
              <p>ALREADY HAVE AN ACCOUNT? <a href="">LOG IN</a></p>
            </div>
          </div>
        </div>
      )
}

export default Adminsignin
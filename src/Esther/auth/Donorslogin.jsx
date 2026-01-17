import React, { useEffect, useState } from 'react'
import '../../Esther/styles/donorslog.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import FadeLoader from 'react-spinners/CircleLoader'
import { HiOutlineArrowCircleLeft } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "sonner";
import { logIn, saveToken } from "../../global/Slice";
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
const Base_Url = import.meta.env.VITE_BASEURL;



const Donorslogin = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: ""
  })
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(true)
  const loggedInUser = useSelector(state => state?.loggedInUser)
  const nav = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${Base_Url}/login`, userLoginData);
      const user = res?.data?.data;
      if (!user?.isVerified) {
        toast.error('Account not verified. Please check your email.');
        nav("/checkmail", {state: {email:userLoginData.email} })

        try {
            await axios.post(`${Base_Url}/resend-otp`, {
              email: userLoginData.email,
          });
        } catch (err) {
          console.error("Error sending re-verification email:", err);
        }
        return;
      }
      toast.success(res?.data?.message);
      dispatch(logIn(res?.data?.data))
      dispatch(saveToken(res?.data?.token))
      setTimeout(() => {
        nav("/dashboard");
      }, 1000);
      return res.message;
    } catch (err) {
      console.error("Login error:", err?.response?.data?.message || err);
      toast.error(
        err?.response?.data?.message || "Something went wrong during registration."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userLoginData.email || !userLoginData.password) {
      setRess("Please input all field")
      return
    }

    handleLogin(userLoginData, Base_Url, setIsLoading, nav);
  };



  return (
    <div className='donorloginwrapper'>
      <div className='donorloginmobilewrap'>
      <div className='smallarrow' ><IoArrowBackCircleOutline onClick={()=>nav(-1)}/></div>

        <h2>LOG IN</h2>
      </div>
      <img src="images/Subtract.png" alt="" className='donorslogimage' />
      <div className='donorlogininfowrap'>
        <div className='donorloginlogohold'>
          <Link to="/">
            <img src="images/alifenobg.png" alt="Logo" className='donorloginlogo' />
          </Link>
          <HiOutlineArrowCircleLeft size={50} onClick={()=> nav(-1)} />
        </div>
        <div className='donorlogininfo1'>
          <h2>LOG IN</h2>
          <div className='donorlogininputwrapper'>
            <p>EMAIL ADDRESS</p>
            <input type="email" placeholder='ENTER EMAIL' className='donorlogininput'
              value={userLoginData.email}
              onChange={(e) => setUserLoginData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className='donorlogininputwrapper'>
            <p>ENTER PASSWORD</p>
            <div className="donorlogininputAndIcon">
            <input
              type={showPassword1? "password" : "text"}
              className='donorssignpasswordinput'
              placeholder='Password'
              value={userLoginData.password}
              onChange={(e) => setUserLoginData(prev => ({ ...prev, password: e.target.value }))}
            />
            {showPassword1? <LuEyeClosed onClick={()=> setShowPassword1(false)}/> : <LuEye onClick={()=> setShowPassword1(true)}/>}
            </div>
          </div>
          <button className='donorloginbtn' onClick={handleSubmit}>{isLoading ? <FadeLoader color="white" size={25} /> : "LOG-IN"}</button>
          <div className='donorloginforgotwrap'>
            <p onClick={() => nav("/donorssignup")} className='AuthRedirectionLinkWrap'>DON'T HAVE AN ACCOUNT? SIGNUP</p>
            <p onClick={() => nav("/forgotpassword")}>FORGOT PASSWORD</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donorslogin
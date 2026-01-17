import React, { useState } from 'react'
import '../../Esther/styles/authentry.css'
import { HiOutlineArrowCircleLeft } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { IoArrowBackCircleOutline } from 'react-icons/io5'

const Authentry = ({type}) => {
    const nav = useNavigate();
    const isLogin = type === "login"

    const [selectedimage, setSelectedimage] = useState(null);

    const handleSelect = (role) => {
        setSelectedimage(role);
      };
    
      const handleContinue = () => {
        if (!selectedimage) return;
    
        if (selectedimage === "hospital") {
          nav(isLogin ? "/hospitallogin" : "/hospitalsignup");
        } else if (selectedimage === "donor") {
          nav(isLogin ? "/donorslogin" : "/donorssignup");
        }
      };

  return (
    <div className='authwrapper'>
        <img src="images/Subtract.png" alt=""className='authimage'/>
        <div className='authmobilewrap'>
        <div className='smallarrow' ><IoArrowBackCircleOutline onClick={()=>nav(-1)}/></div>

        </div>
        <div className='authinfowrap'>
            <div className='authlogohold'>
            <Link to="/">
                <img src="images/alifenobg.png" alt="" className='authlogo'/>
            </Link>
            <HiOutlineArrowCircleLeft size={50} onClick={()=> nav(-1)} />
            </div>
            <div className='authinfo1'>
                <h3>{isLogin ? "LOG-IN" : "SIGN-UP"}</h3>
                <p>{isLogin ? "Access your account" : "As a donor or Hospital/Bloodbank"} </p>
            </div>
            <div className='authinfo2'>
                <img
                 onClick={() => handleSelect("hospital")}
                  src="images/authhospital.png"
                   alt=""
                   className={`authimg ${selectedimage === "hospital" ? "selected" : ""}`} />
                <img
                 onClick={() => handleSelect("donor")}
                  src="images/authdonors.png"
                   alt=""
                   className={`authimg ${selectedimage === "donor" ? "selected" : ""}`}/>
            </div>
            <button 
            className='authinfo3'
            onClick={handleContinue}
            disabled={!selectedimage}>
            {isLogin ? "LOGIN" : "SELECT"}</button>
        </div>
    </div>
  )
}

export default Authentry


import React, { useState } from 'react';
import '../../Esther/styles/donorssign.css';
import { Link, useNavigate } from 'react-router';
import FadeLoader from 'react-spinners/CircleLoader'
import { toast } from 'sonner';
import { HiOutlineArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const Base_Url = import.meta.env.VITE_BASEURL;

const Donorssignup = () => {
  const [click,setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    bloodType: "",
    location: "",
    age: "",
  });


  const [showPassword1, setShowPassword1] = useState(true)
  const [showPassword2, setShowPassword2] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    } if (!userData.fullName || !userData.email || !userData.location || !userData.password || !userData.age || !userData.bloodType) {
      toast.error("Please input all field")
      return
    }
      setIsLoading(true);
      try {
        const res = await axios.post(`${Base_Url}/register`, userData);
        toast.success(res.data.message);
        setTimeout(() => {
          nav("/checkmail");
        }, 1000);
        return res.data.message;
      } catch (err) {
        if(err.status === 400){
          toast.error(err.response.data.message);
        }

      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className='donorsignwrapper'>
      <img src="images/Subtract.png" alt="" className='donorsignimage' />
      <div className='donsignmobilewrap'>
      <div className='smallarrow' ><IoArrowBackCircleOutline onClick={()=>nav(-1)}/></div>

        <h1>CREATE AN ACCOUNT</h1>
        <p>REGISTER AS A DONOR</p>
      </div>
      <div className='donorsigninfowrap'>
        <div className='donorsignlogohold'>
          <Link to="/">
            <img src="images/alifenobg.png" alt="Logo" className='donorsignlogo' />
          </Link>
          <HiOutlineArrowCircleLeft size={50} onClick={()=> nav(-1)} />
        </div>
        <div className='donorsigninfo1'>
          <h1>REGISTER AS A DONOR</h1>

          <div className='donorsigninputwrapper'>
            <p>NAME</p>
            <input
              type="text"
              placeholder='FULL NAME'
              className='donorssigninput'
              value={userData.fullName}
              onChange={(e) => setUserData((prev) => ({ ...prev, fullName: e.target.value }))}
            />
          </div>

          <div className='donorsigninputwrapper'>
            <p>AGE</p>
            <input
              type="number"
              min={18}
              placeholder='AGE'
              className='donorssigninput'
              value={userData.age}
              onChange={(e) => setUserData((prev) => ({ ...prev, age: e.target.value}))}
            />
          </div>

          <div className='donorsigninputwrapper'>
            <p>HOME ADDRESS</p>
            <input
              type="text"
              placeholder='ADDRESS'
              className='donorssigninput'
              value={userData.location}
              onChange={(e) => setUserData((prev) => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div className='donorsigninputwrapper'>
            <p>ENTER EMAIL</p>
            <input
              type="email"
              placeholder='ENTER EMAIL'
              className='donorssigninput'
              value={userData.email}
              onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className='donorclick'>
            <p>HAVE YOU DONATED BEFORE?</p>
            <div className='donorclickinner'>
              <div className='clickinner'>
                <input type="radio" name='donatedBefore' />
                <p>YES</p>
              </div>
              <div className='clickinner'>
                <input type="radio" name='donatedBefore' />
                <p>NO</p>
              </div>
            </div>
          </div>

          <div className='donorbloodclick'>
            <h2>BLOOD GROUP</h2>
            <div className='bloodgrouphold'>
              {["A+", "B+", "AB+", "O-", "Unknown", "A-", "B-", "O+"].map((type) => (
                <p key={type}>
                  <input
                    type="radio"
                    name="bloodType"
                    value={type}
                    checked={userData.bloodType === type}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, bloodType: e.target.value }))
                    }
                  />
                  {type}
                </p>
              ))}
            </div>
          </div>

          <div className='donorsigninputwrapper'>
            <p>CREATE PASSWORD</p>
            <div className="inputAndIcon">
            <input
              type={showPassword1? "password" : "text"}
              className='donorssignpasswordinput'
              placeholder='Password'
              value={userData.password}
              onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
            />
            {showPassword1? <LuEyeClosed onClick={()=> setShowPassword1(false)}/> : <LuEye onClick={()=> setShowPassword1(true)}/>}
            </div>
          </div>
          <p className="passwordTips">† Password must be at least 6 characters long <br />
          † Password must include at least one uppercase letter and a number.
          </p>

          <div className='donorsigninputwrapper'>
            <p>CONFIRM PASSWORD</p>
            <div className="inputAndIcon">
            <input
              type={showPassword2? "password" : "text"}
              className='donorssignpasswordinput'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showPassword2? <LuEyeClosed onClick={()=> setShowPassword2(false)}/> : <LuEye onClick={()=> setShowPassword2(true)}/>}
            </div>
          </div>

          <div className='checkboxwrapper'>
            <input type="checkbox" 
            isClick={click}
            onClick={()=>setClick(!click)}
            required={true} />
            <p>
              I agree to the{" "}
              <a href="" onClick={() => nav("/donorterms")} className='tandc'>
                TERMS AND CONDITIONS
              </a>
            </p>
          </div>
          <div className='hosloginforgotwrap'>
            <p onClick={()=>nav("/donorslogin")}>ALREADY HAVE AN ACCOUNT? <a href="" style={{color:"blue"}}>LOGIN</a></p>
          </div>

          <button className='donsignbtn'
          disabled={!click || isLoading}
          onClick={handleSubmit} 
          >
            {isLoading ? <FadeLoader color="white" size={25}/> : "REGISTER"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donorssignup;

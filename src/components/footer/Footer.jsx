import React from 'react'
import '../../components/footer/footer.css'
import { PiUserCircleDashedThin } from 'react-icons/pi'
import { IoMdMail } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='footerwrapper'>
      <div className='footerlogo'>
        <div className='footerlogo1'>  <img src="images/logo.png" alt="LifeLink logo" className="logo-breath" /> </div>

        <h3>ALIFE</h3>
      </div>
      <div className='footernewsletter'>
        <h1>Join the mission to save lives through blood donation.</h1>
        <div className='footerinput'>

          <IoMdMail color='white' />
          <p style={{ color: "white" }}>alife.connect20@gmail.com</p>
        </div>
        <div className="footer-col">
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      <div className='footerfeatures'>
        <ul className='featureslist'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/howitworks">How it works</Link>
          </li>
          <li>Contact us</li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p style={{ color: "white" }}>© 2025 ALIFE | All rights reserved.</p>
      </div>

    </div>
  )
}

export default Footer
import React from 'react'
import { useNavigate } from "react-router-dom";
import '../../Davidson/pages/beahero.css'

const BeaHero = () => {
  const navigate = useNavigate();

  const iSRegistered = localStorage.getItem("user");

  const handlePrimaryClick = () => {
    if (iSRegistered) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  }
  const handleSecondaryClick = () => {
    navigate("/about");
  }
  return (
    <section className="cta-wrapper">
      <h1>Ready to Become a Hero?</h1>
      <p className='cta-subtitle'>Join thousands of everyday heroes making life-saving impact.
        Your blood can save up to three lives.
      </p>
      <div className='cta-buttons'>
        <button className='btn-primary' onClick={handlePrimaryClick}>Become a Donor</button>
        <button className='btn-secondary' onClick={handleSecondaryClick}>Learn More</button>
      </div>
      <div className='safty-cnt'>
        <img src="/images/svg.png" alt="" />
        <p className='cta-footer'>100% Safty & Verified • Free Health Screening • Track Your Impact</p>
      </div>

    </section>
  )
}

export default BeaHero

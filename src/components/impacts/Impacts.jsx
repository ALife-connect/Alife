import React from 'react'
import '../../components/impacts/impacts.css'



const Impacts = () => {
  return (
   
    <section className="why-different">
      <h2>What Makes ALIFE Different</h2>
      <p className="subtitle">
        The most trusted blood donation platform in Nigeria
      </p>

      <div className="why-different-content">
        
        <div className="why-image">
          <img src="/images/image 22.png" alt="Blood donation" />
        </div>

       
        <div className="why-features">
          <div className="feature-item">
            <div className="icon "><img src="/images/flash.png" alt="" /></div>
            <div>
              <h4>Instant Notifications</h4>
              <p>
                Get real-time alerts when your blood type is urgently needed
                near you.
              </p>
            </div>
          </div>

          <div className="feature-item">
            <div className="icon"><img src="/images/quest.png" alt="" /></div>
            <div>
              <h4>Verified Hospitals Only</h4>
              <p>
                Every hospital and blood bank on our platform is verified and
                meets strict safety standards.
              </p>
            </div>
          </div>

          <div className="feature-item">
            <div className="icon "><img src="/images/phone2.png" alt="" /></div>
            <div>
              <h4>Seamless Experience</h4>
              <p>
                From signup to donation tracking, everything is designed to be
                simple and intuitive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  )
}

export default Impacts
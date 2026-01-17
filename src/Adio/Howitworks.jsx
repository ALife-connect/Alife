import React from "react";
import "./howitworks.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Howitworks = () => {
  const nav = useNavigate()
  const user = useSelector((state)=> state.token)

  return (
    <>
      <div>
        <section className="lifelink-Howitworks-first-section">
          <div className="lifelink-text">
            <h2>Saving Lives, Made <br /> Simple</h2>
            <p>
              Whether you’re a donor looking to make a <br />
              difference or a hospital in need of life-saving <br />
              blood, ALIFE streamlines the process for you. <br />
              Donors can easily find a donation center, give <br />
              blood, and track their impact. Hospitals and <br />
              blood banks can connect with verified donors to <br />
              ensure a steady, reliable supply. Here’s how it <br />
              works:
            </p>
          </div>
          <div className="lifelink-images">
            <img
              src="images/image(4).png"
              alt="Patient in hospital bed"
              className="img-back"
            />
            <img src="images/image(5).png" alt="Blood donation" className="img-front" />
          </div>
        </section>


        <section className="hospital-steps">
          <h2 className="section-title">HOW IT WORKS FOR DONORS</h2>

          <div className="steps-container">
            <div className="step-boxes step-1">
              <div className="icon"><img src="images/Group.png"/></div>
              <h3>Find a Donation <br /> Center</h3>
              <p>Locate a nearby verified hospital or blood bank using ALIFE</p>
            </div>

            <div className="step-boxes step-2">
              <div className="icon"><img src="images/Group.png"/></div>
              <h3>Donate Blood</h3>
              <p>Visit the center provide your unique code, & give blood safely.</p>
            </div>

            <div className="step-boxes step-3">
              <div className="icon"><img src="images/Group.png"/></div>
              <h3>Track Your Impact</h3>
              <p>Get updates on your donation history & see how many lives you’ve helped saved.</p>
            </div>

            <div className="step-boxes step-4">
              <div className="icon"><img src="images/Group.png"/></div>
              <h3>Enjoy Donor Benefits</h3>
              <p>Receive incentives like free health checkups & wellness perks as a token of appriciation.</p>
            </div>
          </div>

          <button className="cta-btn" onClick={()=> nav(`${user? "/dashboard" : "/donorssignup"}`)}>Donate</button>
        </section>


        <section className="hospital-steps">
          <h2 className="section-title">How It Works For Hospital & Blood Banks</h2>

          <div className="steps-container">
            <div className="step-boxes step-1">
              <div className="icon"><img src="images/Group.png"/></div>
              <h3>Register &<br />Get Verified</h3>
              <p>Sign up on ALIFE & get verified as a trusted hospital or blood bank.</p>
            </div>

            <div className="step-boxes step-2">
              <div className="icon"><img src="images/Group.png"/></div>
              <h3>Update Blood<br />Availability</h3>
              <p>Keep donors and patients informed by updating your blood supply in real time.</p>
            </div>

            <div className="step-boxes step-3">
              <div className="icon"><img src="images/Group.png"/></div>
              <h3>Receive Donors</h3>
              <p>Accept donors who visit with their unique ALIFE codes & confirm their donations.</p>
            </div>

            <div className="step-boxes step-4">
              <div className="icon"><img src="images/Group.png"/></div>
              <h3>Save More Lives</h3>
              <p>Easily connect with donors & ensure a steady supply of safe & reliable blood.</p>
            </div>
          </div>

          <button className="cta-btn" onClick={()=> nav(`${user? "/dashboard" : "/hospitalsignup"}`)}>Get Listed</button>
        </section>

        <section className="why-it-matters">
          <h2 className="section-title">WHY IT MATTERS</h2>

          <div className="cards">
            <div className="card card-1"></div>

            <div className="card card-2"></div>

            <div className="card card-3"></div>
          </div>
        </section>



      </div>
    </>
  );
};

export default Howitworks;

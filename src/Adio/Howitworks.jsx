import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import "./howitworks.css";

const HowItWorks = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.token);

  // Data Arrays for Clean, Scalable Architecture
  const donorSteps = [
    {
      id: 1,
      title: "Find a Center",
      text: "Locate a nearby verified hospital or mobile blood bank instantly using our live dashboard map.",
      icon: "images/Group.png"
    },
    {
      id: 2,
      title: "Donate Blood",
      text: "Visit your chosen center, check in with your unique secure SOLDAT ID code, and donate safely.",
      icon: "images/Group.png"
    },
    {
      id: 3,
      title: "Track Your Impact",
      text: "Receive automated real-time notifications showing when and where your blood is utilized.",
      icon: "images/Group.png"
    },
    {
      id: 4,
      title: "Earn Rewards",
      text: "Unlock exclusive wellness perks, premium health checkups, and tokens of appreciation.",
      icon: "images/Group.png"
    }
  ];

  const hospitalSteps = [
    {
      id: 1,
      title: "Get Verified",
      text: "Onboard your institution through our secure verification pipeline to join the trusted network.",
      icon: "images/Group.png"
    },
    {
      id: 2,
      title: "Update Live Stock",
      text: "Keep community donors and emergency staff updated by managing your blood inventory in real-time.",
      icon: "images/Group.png"
    },
    {
      id: 3,
      title: "Scan Check-Ins",
      text: "Seamlessly process arriving donors by checking their digital SOLDAT codes with a single click.",
      icon: "images/Group.png"
    },
    {
      id: 4,
      title: "Secure Your Supply",
      text: "Establish an optimized, on-demand pipeline of safe blood for critical procedures.",
      icon: "images/Group.png"
    }
  ];

  const insightCards = [
    {
      id: 1,
      class: "card-1",
      title: "Every Second Counts",
      text: "A single donation can save up to three lives. Efficient delivery ensures no patient waits in critical moments."
    },
    {
      id: 2,
      class: "card-2",
      title: "Community Resilience",
      text: "Bridging the gap between active volunteers and regional blood banks to build an unshakeable supply network."
    },
    {
      id: 3,
      class: "card-3",
      title: "Verified Integrity",
      text: "Eliminating supply friction and counterfeit tracking through strictly monitored secure health data pipelines."
    }
  ];

  return (
    <div className="howitworks-cnt-body">
      {/* Hero Interactive Split Section */}
      <section className="lifelink-Howitworks-first-section">
        <div className="lifelink-text">
          <h2>Saving Lives, Made Simple</h2>
          <p>
            Whether you’re a dedicated donor looking to make a lasting difference or a hospital coordinator 
            requiring critical, life-saving blood supplies, SOLDAT reinvents and simplifies the entire system. 
            We close the distance between supply and emergency care.
          </p>
        </div>
        <div className="lifelink-images">
          <div className="image-frame-back">
            <img src="images/image(4).png" alt="Patient Care Facility" className="img-back" />
          </div>
          <div className="image-frame-front">
            <img src="images/image(5).png" alt="Safe Blood Donation Process" className="img-front" />
          </div>
        </div>
      </section>

      {/* Donors Wave Segment */}
      <div className="hospital-steps-cnt-1">
        <section className="hospital-steps">
          <h2 className="section-title">How It Works For Donors</h2>
          <div className="steps-container">
            {donorSteps.map((step) => (
              <div key={step.id} className={`step-boxes step-${step.id}`}>
                <div className="icon">
                  <img src={step.icon} alt="" aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <button 
            className="cta-btn-premium" 
            onClick={() => navigate(user ? "/dashboard" : "/donorssignup")}
          >
            Become a Donor
          </button>
        </section>
      </div>

      {/* Hospitals & Blood Banks Wave Segment */}
      <section className="hospital-steps-cnt">
        <h2 className="section-title">For Hospitals & Blood Banks</h2>
        <div className="steps-container">
          {hospitalSteps.map((step) => (
            <div key={step.id} className={`step-boxes step-${step.id}`}>
              <div className="icon">
                <img src={step.icon} alt="" aria-hidden="true" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
        <button 
          className="cta-btn-premium cta-space-bottom" 
          onClick={() => navigate(user ? "/dashboard" : "/hospitalsignup")}
        >
          Register Institution
          </button>
      </section>

      {/* Why It Matters Content Populated Layer */}
      <section className="why-it-matters">
        <h2 className="section-title">Why It Matters</h2>
        <div className="cards-grid-wrapper">
          {insightCards.map((card) => (
            <div key={card.id} className={`insight-card ${card.class}`}>
              <div className="card-overlay-gradient" />
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
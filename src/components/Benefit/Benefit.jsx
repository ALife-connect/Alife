import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import "../Benefit/Benefit.css";
// import Sponsors from "../Sponsors/Sponsors";

const Benefit = () => {
  const nav = useNavigate();
 

  return (
    <>
    <section className="benefits">
      <div className="benefits-header">
        <h2>Benefits for you</h2>
        <p>Donating blood isn't just heroicーit's healthy</p>
      </div>
       <div className="benefits-grid">
        <div className="benefit-card">
          <div className="icon red"><img src="/images/Heart.png" alt="" /></div>
          <h3>Health Benefits</h3>
          <p>
            Regular donation reduces iron overload,<br /> improves cardiovascular
            health, and <br /> provides free health screenings.
          </p>
        </div>

        <div className="benefit-card">
          <div className="icon green"><img src="/images/Brain.png" alt="" /></div>
          <h3>Mental Well-being</h3>
          <p>
            Experience the joy of giving. Studies show donors report higher life
            satisfaction and <br /> purpose.
          </p>
        </div>

        <div className="benefit-card">
          <div className="icon teal"><img src="/images/phone.png" alt="" /></div>
          <h3>Easy Scheduling</h3>
          <p>
            Book appointments at your convenience with our seamless
            mobile-first platform.
          </p>
        </div>
      </div>
      <div className="benifit-cont">
         <div className="benefit-card1">
          <div className="icon red"><img src="/images/heads.png" alt="" /></div>
          <h3>Community Impact</h3>
          <p>
            Join a community of heroes making Nigeria healthier, one donation at
            a time.
          </p>
        </div>

        <div className="benefit-card1">
          <div className="icon teal"><img src="/images/chat.png" alt="" /></div>
          <h3>Impact Transparency</h3>
          <p>
            See exactly where your donation goes and <br />track the real lives
            you’ve helped save in <br />real-time.
          </p>
        </div>
      </div>
    </section>

    </>
  );
};

export default Benefit;

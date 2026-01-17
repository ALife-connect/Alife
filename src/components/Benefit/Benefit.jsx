import { useNavigate } from "react-router";
import "../Benefit/Benefit.css";
import Sponsors from "../Sponsors/Sponsors";

const Benefit = () => {
  const nav = useNavigate()
  return (
    <>
      <div className="landingpagebenefits">

        <h1>KEY BENEFITS FOR DONORS</h1>
        <div className="landingbenefitsinner">

          <div className="landingbenefitsinner1">

            <h2>Saves lives while gaining valuable benefits.</h2>
            <p>
              When you donate blood, you’re not just <br /> saving lives you’re
              also gaining valuable <br /> benefits. Make an impact while taking
              care <br /> of your own well-being.
            </p>
            <button className="benefitsbtn" onClick={() => nav('/dashboard')}>Donate</button>
          </div>
          <div className="landingbenefitsinner2">
            <div className="landingincentives">
              <div className="incentiveheader">
                <img src="images/Group.png" alt="" />
              </div>
              <h2> Free basic health checkups (e.g blood pressure, general wellnes)</h2>
            </div>
            <div className="landingincentives">
              <div className="incentiveheader">
                <img src="images/Group.png" alt="" />
              </div>
              <h2> Reduces the risk of heartdiseses <br />
                and some cancers</h2>

            </div>
            <div className="landingincentives">
              <div className="incentiveheader">
                <img src="images/Group.png" alt="" />
              </div>
              <h2>Enhanced mental well-being</h2>

            </div>
            <div className="landingincentives">
              <div className="incentiveheader">
                <img src="images/Group.png" alt="" />
              </div>
              <h2>
                Provision of valuable information <br /> about your health.
              </h2>

            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Benefit;

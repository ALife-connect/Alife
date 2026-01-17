import React from "react";

const Achievement = () => {
  return (
    <div className="achivement-container">
      <span
        style={{ fontFamily: "poppins", fontSize: "36px", fontWeight: "700" }}
      >
        ACHIEVEMENTS
      </span>

      <div className="ach-img-cnt">
        <div className="ach-img1">
          <div className="sec-img-con">
            <img src="images/aboutpics.png" alt="" />
          </div>
          <div className="third-cnt">
            <h2>10,000 + Lives Saved</h2>
            <p>Connecting patients with life-saving <br />blood donations.</p>
          </div>
        </div>

        <div className="ach-img1">
          <div className="sec-img-con">
            <img src="images/roundpics5.png" alt="" />
          </div>
          <div className="third-cnt">
            <h2>5,000 + Donors Registered</h2>
            <p>Making blood donation seamless <br />and accessible.</p>
          </div>
        </div>

        <div className="ach-img1">
          <div className="sec-img-con">
            <img src="images/imagepics1.png" alt="" />
          </div>
          <div className="third-cnt">
            <h2>200 + Verified Hospitals & Blood Banks</h2>
            <p>Ensuring safe and reliable <br />donations.</p>
          </div>
        </div>

        <div className="ach-img1">
          <div className="sec-img-con">
            <img src="images/aboutpics2.png" alt="" />
          </div>
          <div className="third-cnt">
            <h2>Real Time Blood Availability</h2>
            <p>Helping hospitals manage and update blood supply efficiently.</p>
          </div>
        </div>

        <div className="ach-img1">
          <div className="sec-img-con">
            <img src="images/aboutpics3.png" alt="" />
          </div>
          <div className="third-cnt">
            <h2>Donor Incentives Program Launched</h2>
            <p>Encourage more donors <br />through health checkups <br /> and wellness perks.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievement;

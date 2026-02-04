import React from "react";

const MissionVision = () => {
  return (
    <div className="mission-div">
      <span
        style={{
          fontFamily: "poppins",
          fontSize: "36px",
          fontWeight: "700",
          lineHeight: "100%",
        }}
      >
        MISSION & VISSION
      </span>
      <div className="text-div3-cnt">
        <div className="text-div3">
          <h3>
            A future where every patient in need of blood <br />
            has instant access to a willing donor or a <br />
            nearby blood bank, ensuring is lost due <br />
            to lack of blood availability.
          </h3>
        </div>
         <div className="divider"></div> {/* Divider line here */}
        <div className="text-div4">
          <h3>
            To bridge the gap between blood donors, <br />
            hospitals, and blood banks by providing a <br />
            seamless platform that encourages and <br />
            tracks donations, ultimatily saving <br />
            lives.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;

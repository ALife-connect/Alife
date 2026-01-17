import React from "react";

const AboutHeader = () => {
  return (
    <>
      <div className="hilight-text">
        <div style={{ marginTop: "20px" }}>
          <h2 className="highlight">About us</h2>
        </div>

        <div className="text-div">
          <h3>
            Nigeria faces a critical blood shortage, endangering countless lives.
            <br />
            ALIFE connects donors hospitals and blood banks, ensuring a
            <br />
            steady, life-saving blood supply.
          </h3>
        </div>
      </div>
      <div className="image-div">
        <div className="img1">
          <img src="images/abthead.png" alt="" />
        </div>
        <div className="img2">
          <img src="images/abthead1.png" alt="" />
        </div>
        <div className="img3">
          <img src="images/abthead2.png" alt="" />
        </div>
        <div className="img4">
          <img src="images/abtheade3.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default AboutHeader;

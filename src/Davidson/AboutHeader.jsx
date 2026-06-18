import React from "react";

const AboutHeader = () => {
  return (
    <>
      <div className="hilight-text">
        <div>
          <h2 className="highlight">About Us</h2>
        </div>

        <div className="text-div">
          <h3>
            Nigeria faces a critical blood shortage, endangering countless lives.
            SLODAT connects donors, hospitals, and blood banks, ensuring a
            steady, life-saving blood supply.
          </h3>
        </div>
      </div>

      <div className="image-div">
        <div className="img1">
          <img src="/images/abthead.png" alt="Blood donation awareness" />
        </div>
        <div className="img2">
          <img src="/images/abthead1.png" alt="Medical professional" />
        </div>
        <div className="img3">
          <img src="/images/abthead2.png" alt="Blood storage facility" />
        </div>
        <div className="img4">
          <img src="/images/abtheade3.png" alt="Voluntary donor" />
        </div>
      </div>
    </>
  );
};

export default AboutHeader;
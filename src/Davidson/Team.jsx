import React from "react";
import { GrLinkedin } from "react-icons/gr";
import { FaGithub } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Team = () => {
  return (
    <div className="the-team-cnt">
      <span
        style={{ fontFamily: "Poppins", fontSize: "36px", fontWeight: "700" }}
      >
        THE TEAM
      </span>
      <p>
        A group of young, passionate, and driven individuals <br /> dedicated to
        creating impactful solutions
      </p>

      <div className="team-card-one">

        <div className="first-team-card">
          <div className="team-card-img">
            <img src="images/mary.png" alt="Mary Patrick" />
          </div>
          <div className="team-card-title">
            <h2>Mary Patrick</h2>
            <p>Product Designer</p>
            <a href="#">
              <GrLinkedin />
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className="first-team-card">
          <div className="team-card-img">
            <img src="images/sarah.png" alt="Sarah Emojoro" />
          </div>
          <div className="team-card-title">
            <h2>Sarah Emojoro</h2>
            <p>Product Designer</p>
            <a href="#">
              <GrLinkedin />
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className="first-team-card">
          <div className="team-card-img">
            <img src="images/esther.png" alt="Willams Esther" />
          </div>
          <div className="team-card-title">
            <h2>Willams Esther</h2>
            <p>Frontend Developer</p>
            <a href="#">
              <GrLinkedin />
              <FaGithub />
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className="first-team-card">
          <div className="team-card-img">
            <img src="images/davidson.png" alt="Ekah Davidson" />
          </div>
          <div className="team-card-title">
            <h2>Ekah Davidson</h2>
            <p>Frontend Developer</p>
            <a href="#">
              <GrLinkedin />
              <FaGithub />
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className="first-team-card">
          <div className="team-card-img">
            <img src="images/adio.png" alt="Kingsley Adio" />
          </div>
          <div className="team-card-title">
            <h2>Kingsley Adio</h2>
            <p>Frontend Developer</p>
            <a href="#">
              <GrLinkedin />
              <FaGithub />
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* <div className="first-team-card">
          <div className="team-card-img">
            <img src="images/jeffery.png" alt="Jeffery Abiuwa" />
          </div>
          <div className="team-card-title">
            <h2>Jeffery Abiuwa</h2>
            <p>Backend Developer</p>
            <a href="#">
              <GrLinkedin/>
              <FaGithub/>
              <FaFacebook/>
            </a>
          </div>
        </div> */}

        <div className="first-team-card">
          <div className="team-card-img">
            <img src="images/azeez.png" alt="Obadina Azeez" />
          </div>
          <div className="team-card-title">
            <h2>Obadina Azeez</h2>
            <p>Backend Developer</p>
            <a href="#">
              <GrLinkedin />
              <FaGithub />
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

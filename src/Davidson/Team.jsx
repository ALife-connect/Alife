import React from "react";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

const Team = () => {
  const teamMembers = [
    { name: "Mary Patrick", role: "Product Designer", img: "images/mary.png" },
    { name: "Sarah Emojoro", role: "Product Designer", img: "images/sarah.png" },
    { name: "Williams Esther", role: "Frontend Developer", img: "images/esther.png" },
    { name: "Ekah Davidson", role: "Frontend Developer", img: "images/davidson.png" },
    { name: "Kingsley Adio", role: "Frontend Developer", img: "images/adio.png" },
    { name: "Obadina Azeez", role: "Backend Developer", img: "images/azeez.png" }
  ];

  return (
    <div className="the-team-cnt">
      <h3>THE TEAM</h3>
      <p className="team-subtitle">
        A group of young, passionate, and driven individuals dedicated to creating impactful solutions.
      </p>

      <div className="team-card-one">
        {teamMembers.map((member, index) => (
          <div className="first-team-card" key={index}>
            <div className="team-card-img">
              <img src={member.img} alt={member.name} />
            </div>
            <div className="team-card-title">
              <h2>{member.name}</h2>
              <p>{member.role}</p>
              <div className="team-social-links">
                <a href="#linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="#github" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="#facebook" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
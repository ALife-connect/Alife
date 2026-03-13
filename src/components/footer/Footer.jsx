import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <div className="brand-logo">
            <img src="/images/Slodat.jpeg" alt="LifeLink Logo" className="logo-breath" />
            <h3>SLODAT</h3>
          </div>
          <p>
            Connecting life-savers with those <br />
            who need them most across Nigeria.
          </p>

          <div className="social-icons">
            <span><FaFacebook /></span>
            <span><FaXTwitter /></span>
            <span><FaInstagram /></span>
            <span><FaLinkedinIn /></span>
          </div>
        </div>


        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>How It Works</li>
            <li>For Donors</li>
            <li>For Hospitals</li>
            <li>About Us</li>
            <li>Blog</li>
          </ul>
        </div>


        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li>FAQs</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>


        <div className="footer-links">
          <h4>Contact</h4>
          <ul>
            <li>📞 +234 9013717091</li>
            <li>✉️ slodat.connect@gmail.com</li>
          </ul>
        </div>
      </div>


      <div className="footer-bottom">
        <p>© 2024 SLODAT. All rights reserved. Saving lives, one drop at a time.</p>
        {/* <span className="verified"><img src="/images/svg.png" alt="Verified" />Nigerian Health Authority</span> */}
      </div>
    </footer>
  );
};

export default Footer;

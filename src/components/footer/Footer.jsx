import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            <a href="https://www.facebook.com/share/1JDkLHBjBm/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook">
              <span><FaFacebook /></span>
            </a>
            <a href="https://x.com/slodatconnect?s=11" target="_blank" rel="noreferrer" aria-label="Twitter">
              <span><FaXTwitter /></span>
            </a>
            <a href="https://www.instagram.com/slodat.connect/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noreferrer" aria-label="Instagram">
              <span><FaInstagram /></span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <span><FaLinkedinIn /></span>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/howitworks">How It Works</Link></li>
            <li><Link to="/signup">For Donors</Link></li>
            <li><Link to="/signup">For Hospitals</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Contact</h4>
          <ul className="contact-info-list">
            <li>
              <a href="tel:+2349013717091">
                <span className="contact-emoji">📞</span> +234 901 371 7091
              </a>
            </li>
            <li>
              <a href="mailto:slodat.connect@gmail.com">
                <span className="contact-emoji">✉️</span> slodat.connect@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} SLODAT. All rights reserved. Saving lives, one drop at a time.</p>
      </div>
    </footer>
  );
};

export default Footer;
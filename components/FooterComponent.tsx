import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import "./FooterComponent.css";

const FooterComponent: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">&copy; 2024 CyberTEA | All Rights Reserved</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#speakers">Speakers</a>
          <a href="#schedule">Schedule</a>
          <a href="#registration">Register</a>
        </div>
        <div className="footer-social">
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaGithub /></a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;

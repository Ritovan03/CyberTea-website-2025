import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import "./FooterComponent.css";

const FooterComponent: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; 2025 CyberTEA | All Rights Reserved
        </p>
        <div className="footer-social">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;

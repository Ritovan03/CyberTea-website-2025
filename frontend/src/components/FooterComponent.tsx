import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import "./FooterComponent.css";

const FooterComponent: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© {year} CyberTEA | All Rights Reserved</p>

        <div className="footer-social">
          <a
            href="https://twitter.com/cybertea"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/company/cybertea"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/cybertea"
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

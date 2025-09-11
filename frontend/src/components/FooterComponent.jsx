// import React from "react";
// import "./FooterComponent.css"; // Import the corresponding CSS file

// const FooterComponent = () => {
//   const scrollToSection = (e) => {
//     e.preventDefault();
//     const targetId = e.target.getAttribute("href").substring(1);
//     const targetElement = document.getElementById(targetId);
//     if (targetElement) {
//       const offset = 50;
//       const targetPosition = targetElement.offsetTop - offset;
//       window.scrollTo({
//         top: targetPosition,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <>
//       <footer className="footer">
//         <ul className="menu">
//           <li className="menu__item">
//             <a className="menu__link" href="#">
//               Home
//             </a>
//           </li>
//           <li className="menu__item">
//             <a className="menu__link" href="#about" onClick={scrollToSection}>
//               About
//             </a>
//           </li>
//           <li className="menu__item">
//             <a
//               className="menu__link"
//               href="#speakers"
//               onClick={scrollToSection}
//             >
//               Speakers
//             </a>
//           </li>
//           {/* <li className="menu__item">
//             <a className="menu__link" href="#news" onClick={scrollToSection}>
//               News
//             </a>
//           </li> */}
//           <li className="menu__item">
//             <a
//               className="menu__link"
//               href="#schedule"
//               onClick={scrollToSection}
//             >
//               Schedule
//             </a>
//           </li>
//           <li className="menu__item">
//             <a
//               className="menu__link"
//               href="#registration"
//               onClick={scrollToSection}
//             >
//               Register
//             </a>
//           </li>
//         </ul>
//         <p>&copy;2024 CyberTEA | All Rights Reserved</p>
//       </footer>
//     </>
//   );
// };

// export default FooterComponent;


// components/FooterComponent.jsx
import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import "./FooterComponent.css";

const FooterComponent = () => {
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

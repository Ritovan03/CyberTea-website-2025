// import React from "react";
// import "./Registration.css";

// function Registration() {
//   return (
//     <div className="Registration_container">
//       <div className="reg_heading_container">
//         <p className="reg_heading">Registration</p>
//       </div>
//       <div className="reg_payment">
//         <p className="payment_heading">Payment Procedure</p>
//       </div>
//       <div className="reg_list">
//         <ul>
//           <li>Pay the registration fee using the below payment methods and amount according to your category.</li>
//           <li>After payment, fill out the <a href="#">Link to the form</a></li>
//         </ul>
//       </div>
//       <div className="reg_fee">
//         <p className="fee_heading">Registration Fee</p>
//       </div>
//       <div className="fee_container">
//         <div className="grid-container">
//           <div className="grid-heading">Participant Type</div>
//           <div className="grid-heading">Indian Participants</div>
//           <div className="grid-heading">Foreign Participants</div>
//           <div className="grid-item">B.Tech with Research</div>
//           <div className="grid-item">Rs. 1000/-</div>
//           <div className="grid-item">$ 50</div>
//           <div className="grid-item">FACULTY</div>
//           <div className="grid-item">Rs. 2000/-</div>
//           <div className="grid-item">$ 70</div>
//           <div className="grid-item">INDUSTRY</div>
//           <div className="grid-item">Rs. 3000/-</div>
//           <div className="grid-item">$ 100</div>
//         </div>
//       </div>
//       <div className="QR_Fee">
//         <p className="QR_heading">Indian Participants Fee Payment (through UPI)</p>
//       </div>
//       <div className="QR_img">
//         <a href="#"><img src="/assets/qr.jpeg" alt="No image available" /></a>
//       </div>
//       <div className="QR_Fee">
//         <p className="QR_heading">Foreign Participants Fee Information</p>
//       </div>
//     </div>
//   );
// }

// export default Registration;


// import React from "react";
// import "./Registration.css";

// function Registration() {
//   return (
//     <div className="registration-page">
//       <div className="registration-card">
//         <h2>Registration</h2>
//         <p className="payment-info">Payment Procedure</p>
//         <ul className="reg-list">
//           <li>Pay the registration fee using the below payment methods according to your category.</li>
//           <li>After payment, fill out the <a href="#">Link to the form</a></li>
//         </ul>

//         <h3>Registration Fee</h3>
//         <div className="fee-grid">
//           <div>Participant Type</div>
//           <div>Indian Participants</div>
//           <div>Foreign Participants</div>
//           <div>B.Tech with Research</div>
//           <div>Rs. 1000/-</div>
//           <div>$ 50</div>
//           <div>FACULTY</div>
//           <div>Rs. 2000/-</div>
//           <div>$ 70</div>
//           <div>INDUSTRY</div>
//           <div>Rs. 3000/-</div>
//           <div>$ 100</div>
//         </div>

//         <h3>Indian Participants Fee Payment (UPI)</h3>
//         <img src="/assets/qr.jpeg" alt="QR Code" className="qr-image" />

//         <h3>Foreign Participants Fee Information</h3>
//         <p>Refer to the email or website link for details.</p>
//       </div>
//     </div>
//   );
// }

// export default Registration;

/*
import React from "react";
import "./Registration.css";

function Registration() {
  return (
    <div className="registration-page">
      <div className="registration-card">
        <h2>Registration</h2>
        <p className="payment-info">Payment Procedure</p>
        <ul className="reg-list">
          <li>Pay the registration fee using the below payment methods according to your category.</li>
          <li>After payment, fill out the <a href="#">Link to the form</a></li>
        </ul>

        <h3>Registration Fee</h3>
        <div className="fee-grid">
          <div>Participant Type</div>
          <div>Indian Participants</div>
          <div>Foreign Participants</div>
          <div>B.Tech with Research</div>
          <div>Rs. 1000/-</div>
          <div>$ 50</div>
          <div>FACULTY</div>
          <div>Rs. 2000/-</div>
          <div>$ 70</div>
          <div>INDUSTRY</div>
          <div>Rs. 3000/-</div>
          <div>$ 100</div>
        </div>

        <h3>Indian Participants Fee Payment (UPI)</h3>
        <img src="/assets/qr.jpeg" alt="QR Code" className="qr-image" />

        <h3>Foreign Participants Fee Information</h3>
        <p>Refer to the email or website link for details.</p>
      </div>
    </div>
  );
}

export default Registration;
*/

// import React from "react";
// import "./Registration.css";

// function Registration() {
//   return (
//     <div className="registration-page">
//       <div className="registration-card">
//         <h2>Registration</h2>

//         <div className="section">
//           <p className="section-title">Payment Procedure</p>
//           <ul className="reg-list">
//             <li>Pay the registration fee using the below payment methods according to your category.</li>
//             <li>After payment, fill out the <a href="#">registration form</a>.</li>
//           </ul>
//         </div>

//         <div className="section">
//           <p className="section-title">Registration Fee</p>
//           <div className="fee-grid">
//             <div>Participant Type</div>
//             <div>Indian Participants</div>
//             <div>Foreign Participants</div>

//             <div>B.Tech with Research</div>
//             <div>₹ 1000/-</div>
//             <div>$ 50</div>

//             <div>Faculty</div>
//             <div>₹ 2000/-</div>
//             <div>$ 70</div>

//             <div>Industry</div>
//             <div>₹ 3000/-</div>
//             <div>$ 100</div>
//           </div>
//         </div>

//         <div className="section">
//           <p className="section-title">Indian Participants (UPI Payment)</p>
//           <img src="/assets/qr.jpeg" alt="QR Code" className="qr-image" />
//         </div>

//         <div className="section">
//           <p className="section-title">Foreign Participants</p>
//           <p>Please refer to the email or website link for payment instructions.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Registration;


import React from "react";
import "./Registration.css";

function Registration() {
  const handleCopyUPI = () => {
    navigator.clipboard.writeText("upi@bank");
    alert("UPI ID copied to clipboard!");
  };

  return (
    <div className="registration-page">
      <div className="registration-card">
        <h2>Registration</h2>

        {/* Payment Steps */}
        <div className="registration-steps">
          <div className="step">
            <span className="step-number">1</span>
            <p>Pay the registration fee according to your category.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p>Fill out the registration form after payment.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p>Save the payment receipt for confirmation.</p>
          </div>
        </div>

        {/* Registration Fee */}
        <div className="section">
          <p className="section-title">Registration Fee</p>
          <div className="fee-grid">
            <div>Participant Type</div>
            <div>Indian Participants</div>
            <div>Foreign Participants</div>

            <div>B.Tech with Research <span className="info">ℹ</span></div>
            <div>₹ 1000/-</div>
            <div>$ 50</div>

            <div>Faculty <span className="info">ℹ</span></div>
            <div>₹ 2000/-</div>
            <div>$ 70</div>

            <div>Industry <span className="info">ℹ</span></div>
            <div>₹ 3000/-</div>
            <div>$ 100</div>
          </div>
        </div>

        {/* QR Payment */}
        <div className="section">
          <p className="section-title">Indian Participants (UPI Payment)</p>
          <div className="qr-section">
            <img src="/assets/qr.jpeg" alt="QR Code" className="qr-image" />
            <button className="copy-btn" onClick={handleCopyUPI}>
              Copy UPI ID
            </button>
          </div>
        </div>

        {/* Foreign Participants Info */}
        <div className="section">
          <p className="section-title">Foreign Participants</p>
          <p>Please refer to the email or website link for payment instructions.</p>
        </div>
      </div>
    </div>
  );
}

export default Registration;

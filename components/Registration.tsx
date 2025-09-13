// import React from "react";
// import "./Registration.css";

// const Registration: React.FC = () => {
//   const handleCopyUPI = () => {
//     navigator.clipboard.writeText("upi@bank");
//     alert("UPI ID copied to clipboard!");
//   };

//   return (
//     <div className="registration-page">
//       <div className="registration-card">
//         <h2>Registration</h2>

//         {/* Payment Steps */}
//         <div className="registration-steps">
//           <div className="step">
//             <span className="step-number">1</span>
//             <p>Pay the registration fee according to your category.</p>
//           </div>
//           <div className="step">
//             <span className="step-number">2</span>
//             <p>Fill out the registration form after payment.</p>
//           </div>
//           <div className="step">
//             <span className="step-number">3</span>
//             <p>Save the payment receipt for confirmation.</p>
//           </div>
//         </div>

//         {/* Registration Fee */}
//         <div className="section">
//           <p className="section-title">Registration Fee</p>
//           <div className="fee-grid">
//             <div>Participant Type</div>
//             <div>Indian Participants</div>
//             <div>Foreign Participants</div>

//             <div>B.Tech with Research <span className="info">ℹ</span></div>
//             <div>₹ 1000/-</div>
//             <div>$ 50</div>

//             <div>Faculty <span className="info">ℹ</span></div>
//             <div>₹ 2000/-</div>
//             <div>$ 70</div>

//             <div>Industry <span className="info">ℹ</span></div>
//             <div>₹ 3000/-</div>
//             <div>$ 100</div>
//           </div>
//         </div>

//         {/* QR Payment */}
//         <div className="section">
//           <p className="section-title">Indian Participants (UPI Payment)</p>
//           <div className="qr-section">
//             <img src="/assets/qr.jpeg" alt="QR Code" className="qr-image" />
//             <button className="copy-btn" onClick={handleCopyUPI}>
//               Copy UPI ID
//             </button>
//           </div>
//         </div>

//         {/* Foreign Participants Info */}
//         <div className="section">
//           <p className="section-title">Foreign Participants</p>
//           <p>Please refer to the email or website link for payment instructions.</p>
//         </div>
//       </div>
//     </div>
//   );
// };
import React from "react";
import "./Registration.css";

const Registration: React.FC = () => {
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  return (
    <div className="registration-page">
      <div className="registration-card">
        <h2>Registration Details</h2>

        {/* Payment Steps */}
        <div className="registration-steps">
          <div className="step">
            <span className="step-number">1</span>
            <p>Pay the registration fee using the bank details below.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p>Fill out the form after payment to confirm your registration.</p>
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
            {/* Header row */}
            <div>Participation Type</div>
            <div style={{ gridColumn: "span 2" }}>Early Registration (till 20 Oct 2025)</div>
            <div style={{ gridColumn: "span 2" }}>Regular Registration</div>

            {/* Sub-header row */}
            <div></div>
            <div>Indian</div>
            <div>Foreign</div>
            <div>Indian</div>
            <div>Foreign</div>

            {/* Rows */}
            <div>B.Tech/MS/M.Tech/PhD</div>
            <div>₹ 500</div>
            <div>$ 50</div>
            <div>₹ 1000</div>
            <div>$ 80</div>

            <div>Faculty</div>
            <div>₹ 1000</div>
            <div>$ 70</div>
            <div>₹ 1500</div>
            <div>$ 100</div>

            <div>Industry Person</div>
            <div>₹ 1500</div>
            <div>$ 100</div>
            <div>₹ 2000</div>
            <div>$ 130</div>
          </div>
        </div>

        {/* QR & Bank Details */}
        <div className="section">
          <p className="section-title">Bank Details</p>
          <div className="qr-section">
            <img src="/qr.jpeg" alt="QR Code" className="qr-image" />
            <div className="bank-details">
              <p><b>Name of Beneficiary:</b> IIIT Sri City Chittoor – Opex Account</p>
              <p>
                <b>Account Number:</b>{" "}
                <span className="clickable" onClick={() => handleCopy("110167505687", "Account Number")}>
                  110167505687 (Click to Copy)
                </span>
              </p>
              <p>
                <b>IFSC Code:</b>{" "}
                <span className="clickable" onClick={() => handleCopy("CNRB0013427", "IFSC Code")}>
                  CNRB0013427 (Click to Copy)
                </span>
              </p>
              <p><b>Bank Name:</b> Canara Bank</p>
              <p><b>Branch:</b> Sri City</p>
            </div>
          </div>
        </div>

        {/* Foreign Participants */}
        <div className="section">
          <p className="section-title">Foreign Participants</p>
          <p>
            Please use SWIFT/International transfer methods. Contact{" "}
            <a href="mailto:neha@iiits.in" className="clickable">neha@iiits.in</a>{" "}
            for assistance.
          </p>
        </div>

        {/* Sponsors */}
        <div className="section">
          <p className="section-title">Sponsors</p>
          <div className="sponsors">
            <img src="/assets/sponsor1.png" alt="Sponsor 1" />
            <img src="/assets/sponsor2.png" alt="Sponsor 2" />
            <img src="/assets/sponsor3.png" alt="Sponsor 3" />
          </div>
        </div>

        <p style={{ fontSize: "0.9rem", opacity: 0.8, textAlign: "center" }}>
          Certificates and workshop material will be provided to registered participants.
        </p>
      </div>
    </div>
  );
};

export default Registration;

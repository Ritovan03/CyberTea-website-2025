
// import React from "react";
// import "./Registration.css";

// const Registration: React.FC = () => {
//   const handleCopy = (text: string, label: string) => {
//     navigator.clipboard.writeText(text);
//     alert(`${label} copied to clipboard!`);
//   };

//   return (
//     <div className="registration-page">
//       <div className="registration-card">
//         <h2>Registration Details</h2>

//         {/* Payment Steps */}
//         <div className="registration-steps">
//           <div className="step">
//             <span className="step-number">1</span>
//             <p>Pay the registration fee using the bank details below.</p>
//           </div>
//           <div className="step">
//             <span className="step-number">2</span>
//             <p>Fill out the form after payment to confirm your registration.</p>
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
//             {/* Header row */}
//             <div>Participation Type</div>
//             <div style={{ gridColumn: "span 2" }}>Early Registration (till 20 Oct 2025)</div>
//             <div style={{ gridColumn: "span 2" }}>Regular Registration</div>

//             {/* Sub-header row */}
//             <div></div>
//             <div>Indian</div>
//             <div>Foreign</div>
//             <div>Indian</div>
//             <div>Foreign</div>

//             {/* Rows */}
//             <div>B.Tech/MS/M.Tech/PhD</div>
//             <div>₹ 500</div>
//             <div>$ 50</div>
//             <div>₹ 1000</div>
//             <div>$ 80</div>

//             <div>Faculty</div>
//             <div>₹ 1000</div>
//             <div>$ 70</div>
//             <div>₹ 1500</div>
//             <div>$ 100</div>

//             <div>Industry Person</div>
//             <div>₹ 1500</div>
//             <div>$ 100</div>
//             <div>₹ 2000</div>
//             <div>$ 130</div>
//           </div>
//         </div>

//         {/* QR & Bank Details */}
//         <div className="section">
//           <p className="section-title">Bank Details</p>
//           <div className="qr-section">
//             <img src="/assets/qr.jpeg" alt="QR Code" className="qr-image" />
//             <div className="bank-details">
//               <p><b>Name of Beneficiary:</b> IIIT Sri City Chittoor – Opex Account</p>
//               <p>
//                 <b>Account Number:</b>{" "}
//                 <span className="clickable" onClick={() => handleCopy("110167505687", "Account Number")}>
//                   110167505687 (Click to Copy)
//                 </span>
//               </p>
//               <p>
//                 <b>IFSC Code:</b>{" "}
//                 <span className="clickable" onClick={() => handleCopy("CNRB0013427", "IFSC Code")}>
//                   CNRB0013427 (Click to Copy)
//                 </span>
//               </p>
//               <p><b>Bank Name:</b> Canara Bank</p>
//               <p><b>Branch:</b> Sri City</p>
//             </div>
//           </div>
//         </div>

//         {/* Foreign Participants */}
//         <div className="section">
//           <p className="section-title">Foreign Participants</p>
//           <p>
//             Please use SWIFT/International transfer methods. Contact{" "}
//             <a href="mailto:neha@iiits.in" className="clickable">neha@iiits.in</a>{" "}
//             for assistance.
//           </p>
//         </div>

//         {/* Sponsors */}
//         <div className="section">
//           <p className="section-title">Sponsors</p>
//           <div className="sponsors">
//             <img src="/assets/sponsor1.png" alt="Sponsor 1" />
//             <img src="/assets/sponsor2.png" alt="Sponsor 2" />
//             <img src="/assets/sponsor3.png" alt="Sponsor 3" />
//           </div>
//         </div>

//         <p style={{ fontSize: "0.9rem", opacity: 0.8, textAlign: "center" }}>
//           Certificates and workshop material will be provided to registered participants.
//         </p>
//       </div>
//     </div>
//   );
// };



import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Registration.css";

const Registration: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "3rem 1rem",
      }}
    >
      <Card
        sx={{
          maxWidth: 950,
          margin: "0 auto",
          backgroundColor: "#121212",
          color: "white",
          padding: "2.5rem",
        }}
      >
        <CardContent sx={{ lineHeight: 1.9 }}>
          <Typography variant="h4" gutterBottom align="center">
            Registration Details
          </Typography>

          {/* Steps */}
          <div style={{ marginBottom: "3rem" }}>
            <Typography variant="h6" gutterBottom>
              How to Register
            </Typography>
            <div style={{ lineHeight: 2 }}>
              <p>
                <b>Step 1:</b> Pay the registration fee using the provided{" "}
                <b>Bank/QR details</b>.
              </p>
              <p>
                <b>Step 2:</b> Complete the{" "}
                <a
                  href="https://forms.gle/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clickable"
                  style={{ color: "#4dabf7" }}
                >
                  Registration Form
                </a>{" "}
                with your payment info.
              </p>
              <p>
                <b>Step 3:</b> Save the payment receipt — this is required for
                confirmation at the event.
              </p>
            </div>
          </div>

          {/* Fee Table */}
          <div style={{ marginBottom: "3rem" }}>
            <Typography variant="h6" gutterBottom>
              Registration Fee
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ background: "#1e1e1e", marginTop: "1rem" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>
                      Participation Type
                    </TableCell>
                    <TableCell sx={{ color: "white" }} colSpan={2}>
                      Early Registration (till 20 Oct 2025)
                    </TableCell>
                    <TableCell sx={{ color: "white" }} colSpan={2}>
                      Regular Registration
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell sx={{ color: "white" }}>Indian</TableCell>
                    <TableCell sx={{ color: "white" }}>Foreign</TableCell>
                    <TableCell sx={{ color: "white" }}>Indian</TableCell>
                    <TableCell sx={{ color: "white" }}>Foreign</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>
                      B.Tech/MS/M.Tech/PhD
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>₹ 500</TableCell>
                    <TableCell sx={{ color: "white" }}>$ 50</TableCell>
                    <TableCell sx={{ color: "white" }}>₹ 1000</TableCell>
                    <TableCell sx={{ color: "white" }}>$ 80</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Faculty</TableCell>
                    <TableCell sx={{ color: "white" }}>₹ 1000</TableCell>
                    <TableCell sx={{ color: "white" }}>$ 70</TableCell>
                    <TableCell sx={{ color: "white" }}>₹ 1500</TableCell>
                    <TableCell sx={{ color: "white" }}>$ 100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>
                      Industry Person
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>₹ 1500</TableCell>
                    <TableCell sx={{ color: "white" }}>$ 100</TableCell>
                    <TableCell sx={{ color: "white" }}>₹ 2000</TableCell>
                    <TableCell sx={{ color: "white" }}>$ 130</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {/* Bank / QR */}
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{
              background: "#1e1e1e",
              color: "white",
              marginBottom: "3rem",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            >
              <Typography>Bank & QR Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  flexWrap: "wrap",
                  paddingTop: "1rem",
                }}
              >
                <img
                  src="/assets/qr.jpeg"
                  alt="QR Code"
                  style={{ width: "200px", borderRadius: "8px" }}
                />
                <div style={{ lineHeight: 2 }}>
                  <p>
                    <b>Name of Beneficiary:</b> IIIT Sri City Chittoor – Opex
                    Account
                  </p>
                  <p>
                    <b>Account Number:</b>{" "}
                    <span
                      className="clickable"
                      onClick={() =>
                        handleCopy("110167505687", "Account Number")
                      }
                    >
                      110167506587 (Click to Copy)
                    </span>
                  </p>
                  <p>
                    <b>IFSC Code:</b>{" "}
                    <span
                      className="clickable"
                      onClick={() =>
                        handleCopy("CNRB0013427", "IFSC Code")
                      }
                    >
                      CNRB0013247 (Click to Copy)
                    </span>
                  </p>
                  <p>
                    <b>Bank Name:</b> Canara Bank
                  </p>
                  <p>
                    <b>Branch:</b> Sri City
                  </p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Foreign Participants */}
          <div style={{ marginBottom: "3rem" }}>
            <Typography variant="h6" gutterBottom>
              Foreign Participants
            </Typography>
            <Typography>
              Please use SWIFT/International transfer methods. Contact{" "}
              <a
                href="mailto:neha@iiits.in"
                className="clickable"
                style={{ color: "#4dabf7" }}
              >
                neha@iiits.in
              </a>{" "}
              for assistance.
            </Typography>
          </div>

          {/* Sponsors */}
          <div style={{ marginBottom: "3rem" }}>
            <Typography variant="h6" gutterBottom>
              Sponsors
            </Typography>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              <img
                src="/assets/mst.png"
                alt="Sponsor 1"
                style={{ height: "70px" }}
              />
              <img
                src="/assets/isea.png"
                alt="Sponsor 2"
                style={{ height: "70px" }}
              />
              <img
                src="/assets/iitm.png"
                alt="Sponsor 3"
                style={{ height: "70px" }}
              />
              <img
                src="/assets/cystar.png"
                alt="Sponsor 4"
                style={{ height: "70px" }}
              />
            </div>
          </div>

          <Typography
            variant="body2"
            align="center"
            sx={{ opacity: 0.7, marginTop: "3rem", lineHeight: 2 }}
          >
            Certificates and workshop material will be provided to registered
            participants.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;

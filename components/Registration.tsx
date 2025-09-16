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
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";

const Registration: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        minHeight: "100vh",
        padding: "3rem 1rem",
      }}
    >
      {/* Title outside the card */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            fontWeight: "bold",
            background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "0.5rem",
          }}
        >
          Registration
        </Typography>
        <Typography variant="h6" sx={{ color: "#888", fontWeight: "300" }}>
          Join CyberTea 2025 - International Conference on Cybersecurity
        </Typography>
      </div>

      <Card
        sx={{
          maxWidth: 950,
          margin: "0 auto",
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: "2.5rem",
        }}
      >
        <CardContent sx={{ lineHeight: 1.9 }}>
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
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc_RpBfMXomoUBskPUemzBSMitZ_-LJKhjHt1rcr59XtvKjfQ/viewform"
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
              sx={{ background: "#262626", marginTop: "1rem" }}
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
                  src="/qr.png"
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
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      110167505687
                      <Tooltip title="Copy Account Number">
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleCopy("110167505687", "Account Number")
                          }
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            padding: "4px",
                            "&:hover": {
                              color: "rgba(255,255,255,0.9)",
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </p>
                  <p>
                    <b>IFSC Code:</b>{" "}
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      CNRB0013427
                      <Tooltip title="Copy IFSC Code">
                        <IconButton
                          size="small"
                          onClick={() => handleCopy("CNRB0013427", "IFSC Code")}
                          sx={{
                            color: "rgba(255,255,255,0.6)",
                            padding: "4px",
                            "&:hover": {
                              color: "rgba(255,255,255,0.9)",
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
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
          <div style={{ marginBottom: "4rem" }}>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              sx={{ marginBottom: "2rem" }}
            >
              Our Sponsors
            </Typography>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "3rem",
                alignItems: "center",
                justifyItems: "center",
                padding: "2rem",
                background: "rgba(255,255,255,0.02)",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <img
                src="/Sponsors/Picture1.png"
                alt="Ministry of Electronics and Information Technology"
                style={{
                  height: "80px",
                  width: "auto",
                  filter: "brightness(1.1)",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.filter = "brightness(1.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "brightness(1.1)";
                }}
              />
              <img
                src="/Sponsors/Picture2.png"
                alt="ISEA"
                style={{
                  height: "80px",
                  width: "auto",
                  filter: "brightness(1.1)",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.filter = "brightness(1.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "brightness(1.1)";
                }}
              />
              <img
                src="/Sponsors/Picture3.png"
                alt="IIT Sponsor"
                style={{
                  height: "80px",
                  width: "auto",
                  filter: "brightness(1.1)",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.filter = "brightness(1.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "brightness(1.1)";
                }}
              />
              <img
                src="/Sponsors/Picture4.png"
                alt="Cystar"
                style={{
                  height: "80px",
                  width: "auto",
                  filter: "brightness(1.1)",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.filter = "brightness(1.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "brightness(1.1)";
                }}
              />
            </div>
          </div>

          {/* Certificate Notice */}
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              marginTop: "2rem",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                opacity: 0.9,
                lineHeight: 1.8,
                fontSize: "1.1rem",
                fontWeight: 500,
                background: "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🎓 Certificates and comprehensive workshop materials will be
              provided to all registered participants
            </Typography>
          </div>
        </CardContent>
      </Card>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Registration;

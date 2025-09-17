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
          Join CyberTea 2025 - A 5-Day Virtual Workshop on Cybersecurity
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
                            handleCopy("110167506587", "Account Number")
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
                          onClick={() => handleCopy("CNRB0013247", "IFSC Code")}
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
              A Huge Thank You to Our Sponsors
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

          {/* Certificate & Benefits Section */}
          {/* <div className="py-24 px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
          {/* <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">
                  What You'll Receive
                </h2>
                <p className="mt-3 text-zinc-500">
                  Everything you need to succeed, included with your
                  registration.
                </p>
              </div>

              {/* Features Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Official Certificate */}
          {/* <div className="group relative bg-zinc-900 border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/80">
                  {/* Subtle glow effect on hover */}
          {/* <div className="absolute -inset-px bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">
                      Official Certificate
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      Digital & physical certificates of participation and
                      completion.
                    </p>
                  </div>
                </div>

                {/* Workshop Materials */}
          {/* <div className="group relative bg-zinc-900 border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/80">
                  {/* Subtle glow effect on hover */}
          {/* <div className="absolute -inset-px bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">
                      Workshop Materials
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      Comprehensive guides, code samples, and reference
                      materials.
                    </p>
                  </div>
                </div>

                {/* Networking Access */}
          {/* <div className="group relative bg-zinc-900 border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/80">
                  {/* Subtle glow effect on hover */}
          {/* <div className="absolute -inset-px bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.25 0m-5.25 0a3.75 3.75 0 00-5.25 0M15 4.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">
                      Networking Access
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      Connect with industry experts and fellow participants.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
          {/* <div className="mt-12 text-center">
                <div className="inline-flex items-center text-sm text-zinc-400 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-2">
                  <span className="mr-2">✨</span>
                  All materials will be available immediately after registration
                  confirmation
                </div>
              </div>
            </div>
          </div> */}
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

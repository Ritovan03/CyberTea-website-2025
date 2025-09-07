// // App.jsx
// import React from "react";
// import FooterComponent from "./components/FooterComponent";
// import Registration from "./components/Registration";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <Registration />
//       <FooterComponent />
//     </div>
//   );
// }

// export default App;

import React from "react";
import Registration from "./components/Registration";
import FooterComponent from "./components/FooterComponent";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <div className="app-content">
        <Registration />
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;


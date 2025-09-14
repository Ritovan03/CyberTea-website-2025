import React from "react";
import Registration from "./components/Registration";
import FooterComponent from "./components/FooterComponent";
import SpeakersPage from "./pages/SpeakersPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <div className="app-content">
        <Registration />
        {/* <SpeakersPage /> */}
      </div>
      <FooterComponent />
    </div>
  );
};

export default App;

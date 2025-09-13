import React from "react";
import SpeakerGallery from "../components/SpeakerGallery";
import { speakersData } from "../data/speakers";

const SpeakersPage: React.FC = () => {
  return (
    <div className="speakers-page">
      <div className="page-header">
        <h1>CyberTea 3.0 Conference</h1>
        <p>Meet Our Distinguished Speakers</p>
      </div>
      <SpeakerGallery speakers={speakersData} />
    </div>
  );
};

export default SpeakersPage;

"use client";

import { InteractiveGridPatternDemo } from "../components/interactive-grid-pattern-demo-2";
import NavbarDemo from "../components/navbar-demo";
import Registration from "@/components/Registration";
import FooterComponent from "@/components/FooterComponent";
import SpeakerGallery from "@/components/SpeakerGallery";
import EventSchedule from "@/components/EventSchedule";
import { speakersData } from "../components/data/speakers";
import Team from "@/components/Team";
import CtfSection from "@/components/CtfSection";
import AboutWorkshop from "@/components/AboutWorkshop/AboutWorkshop";

export default function SyntheticV0PageForDeployment() {
  return (
    <>
      <NavbarDemo />
      <div id="home">
        <InteractiveGridPatternDemo />
      </div>
      <div id="about">
        <AboutWorkshop />
      </div>
      <div id="speakers">
        <SpeakerGallery speakers={speakersData} />
      </div>
      <div id="schedule">
        <EventSchedule />
      </div>
      <div id="ctf">
        <CtfSection />
      </div>
      <div id="registration">
        <Registration />
      </div>
      <div id="team">
        <Team />
      </div>
      <FooterComponent />
    </>
  );
}

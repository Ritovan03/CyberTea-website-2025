"use client";

import { InteractiveGridPatternDemo } from "../components/interactive-grid-pattern-demo-2";
import NavbarDemo from "../components/navbar-demo";
import Registration from "@/components/Registration";
import FooterComponent from "@/components/FooterComponent";
import SpeakerGallery from "@/components/SpeakerGallery";
import EventSchedule from "@/components/EventSchedule";
import { speakersData } from "../components/data/speakers";
import Team from "@/components/Team";

export default function SyntheticV0PageForDeployment() {
  return (
    <>
      <NavbarDemo />
      <div id="home">
        <InteractiveGridPatternDemo />
      </div>
      <div id="schedule">
        <EventSchedule />
      </div>
      <div id="speakers">
        <SpeakerGallery speakers={speakersData} />
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

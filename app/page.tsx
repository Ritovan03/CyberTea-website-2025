"use client";

import { InteractiveGridPatternDemo } from "../components/interactive-grid-pattern-demo-2";
import NavbarDemo from "../components/navbar-demo";
import Registration from "@/components/Registration";
import FooterComponent from "@/components/FooterComponent";
import SpeakerGallery from "@/components/SpeakerGallery";
import EventSchedule from "@/components/EventSchedule";
import { speakersData } from "../components/data/speakers";

export default function SyntheticV0PageForDeployment() {
  return (
    <>
      <NavbarDemo />
      <InteractiveGridPatternDemo />
      <EventSchedule />
      <SpeakerGallery speakers={speakersData} />
      <Registration />
      <FooterComponent />
    </>
  );
}

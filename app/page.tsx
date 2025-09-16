"use client";

import { InteractiveGridPatternDemo } from "../components/interactive-grid-pattern-demo-2";
import NavbarDemo from "../components/navbar-demo";
import Registration from "@/components/Registration";
import FooterComponent from "@/components/FooterComponent";
import SpeakerGallery from "@/components/SpeakerGallery";
import { speakersData } from "../components/data/speakers";

export default function SyntheticV0PageForDeployment() {
  return (
    <>
      <NavbarDemo />
      <InteractiveGridPatternDemo />
      <SpeakerGallery speakers={speakersData} />
      <Registration />
      <FooterComponent />
    </>
  );
}

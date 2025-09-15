"use client"

import { InteractiveGridPatternDemo } from "../components/interactive-grid-pattern-demo-2"
import NavbarDemo from "../components/navbar-demo"
import Registration from "@/components/Registration"
import FooterComponent from "@/components/FooterComponent"
import CircularGallery from "@/components/CircularGallery"
import SpeakerGallery from "@/components/SpeakerGallery"

export default function SyntheticV0PageForDeployment() {
  return (
  <>
  <NavbarDemo />
  <InteractiveGridPatternDemo />
  <CircularGallery/>
  <FooterComponent/>
  </>)
}
"use client"

import { InteractiveGridPatternDemo } from "../components/interactive-grid-pattern-demo-2"
import NavbarDemo from "../components/navbar-demo"
import Registration from "@/components/Registration"
import FooterComponent from "@/components/FooterComponent"

export default function SyntheticV0PageForDeployment() {
  return (
  <>
  <NavbarDemo />
  <InteractiveGridPatternDemo />
  <Registration/>
  <FooterComponent/>
  </>)
}
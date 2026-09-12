import AboutBoard from "~/component/AboutBoard";
import type { Route } from "./+types/about";
import React from "react";
import CompanyOverview from "~/component/CompanyOverview";
import ClaimSection from "~/component/ClaimSection";
import Policy from "~/component/Policy";
import PartnersAndProcess from "~/component/PartnersAndProcess";
import Partner from "~/component/Partner";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us" },
    { name: "description", content: "Learn more about our company, mission, and team" },
  ];
}

export default function About() {
  return (
    <div>
      <AboutBoard></AboutBoard>
      <CompanyOverview></CompanyOverview>
      <ClaimSection></ClaimSection>
      <Policy></Policy>
       <Partner></Partner>
    </div>
  );
}
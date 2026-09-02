import type { Route } from "./+types/health-insurance";
import React from "react";
import { Link } from "react-router";
import Faq from "~/component/Faq";
import HealthPlanFilter from "~/component/HealthInsuranceHeroForm";
import HealthInsuranceHeroForm from "~/component/HealthInsuranceHeroForm";
import PlanBoard from "~/component/PlanBoard";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Health Insurance" },
    { name: "description", content: "Comprehensive Health Insurance Services" },
  ];
}

export default function HealthInsurance() {
  return (
    <div>
        <PlanBoard></PlanBoard>
       <HealthPlanFilter></HealthPlanFilter>
       <Faq></Faq>

    </div>
  );
}
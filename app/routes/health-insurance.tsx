
import type { Route } from "./+types/health-insurance";
import Faq from "~/component/Faq";
import HealthPlanFilter from "~/component/HealthInsuranceHeroForm";
import PlanBoard from "~/component/PlanBoard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Health Insurance | Purabi General Insurance" },
    {
      name: "description",
      content:
        "Explore health insurance plans and coverage options from Purabi General Insurance Co. Ltd.",
    },
  ];
}

export default function HealthInsurance() {
  return (
    <main className="min-h-screen bg-white">
      <PlanBoard />
      <HealthPlanFilter />
      <Faq />
    </main>
  );
}

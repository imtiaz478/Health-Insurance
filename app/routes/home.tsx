import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Hero from "~/component/Hero";
import InsuranceForm from "~/component/InsuranceForm";
import InsuranceCategories from "~/component/InsuranceCategories";
import ClaimSection from "~/component/ClaimSection";
import PartnersAndProcess from "~/component/PartnersAndProcess";
import NewsAndEvents from "~/component/NewsAndEvents";
import MobileAppPromo from "~/component/MobileAppPromo";
import FooterCallToAction from "~/component/FooterCallToAction";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Insurance Company" },
    { name: "description", content: "Welcome to Dazzling Diva!" },
  ];
}

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <InsuranceForm></InsuranceForm>
       <InsuranceCategories></InsuranceCategories>
       <ClaimSection></ClaimSection>
       <PartnersAndProcess></PartnersAndProcess>
       <NewsAndEvents></NewsAndEvents>
       <MobileAppPromo></MobileAppPromo>
       
       
    </div>
  );
}

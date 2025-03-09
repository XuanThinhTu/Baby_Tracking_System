import React from "react";
import CarouselHero from "../../../components/Hero/CarouselHero";
import MembershipPage from "../Membership/MembershipPage";
import BMICalculator from "./BMICalculator";
import DoctorIntro from "./DoctorIntro";
import Testimonial from "./Testimonial";
import FAQ from "./FAQ";

function HomePage() {
  const token = sessionStorage.getItem("token");
  return (
    <>
      <CarouselHero />
      <BMICalculator />
      <DoctorIntro />
      <Testimonial />
      <FAQ />
      {token && <MembershipPage />}
    </>
  );
}

export default HomePage;

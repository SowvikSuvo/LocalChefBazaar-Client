import React from "react";
import AboutHero from "./AboutHero ";
import MissionVision from "./MissionVision ";
import HowItWorks from "./HowItWorks ";
import SuccessStories from "./SuccessStories ";
import Timeline from "./Timeline ";
import FAQ from "./FAQ ";
import Container from "../../components/Shared/Container";
import Team from "./Team ";

const AboutUs = () => {
  return (
    <div className="bg-orange-50 overflow-hidden rounded-2xl">
      <Container>
        <AboutHero></AboutHero>
        <MissionVision></MissionVision>
        <HowItWorks></HowItWorks>
        <SuccessStories></SuccessStories>
        <Timeline></Timeline>
        <Team></Team>
        <FAQ></FAQ>
      </Container>
    </div>
  );
};

export default AboutUs;

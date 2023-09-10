import React from "react";
import AboutUS from "../components/AboutUS";
import HomeSlider from "../components/Slider/HomeSlider/HomeSlider";
import NewsSlider from "../components/Slider/NewsSlider/NewsSlider";
import BusinessField from "../components/BusinessField";

const index = () => {
  return (
    <div className="min-h-screen">
      <HomeSlider />
      <div className="container space-y-8 py-8">
        <AboutUS />
        <BusinessField />
        <NewsSlider />
      </div>
    </div>
  );
};

export default index;

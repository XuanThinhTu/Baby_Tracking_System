import React, { useEffect } from "react";
import BabyDetails from "./Info/BabyDetails";
import BabyGeneralChart from "./BabyChart/BabyGeneralChart";
import WeightChart from "./BabyChart/WeightChart";
import HeightChart from "./BabyChart/HeightChart";
import HeadCirChart from "./BabyChart/HeadCirChart";
import { useParams } from "react-router-dom";

const BabyOverview = () => {
  const { babyId } = useParams();

  return (
    <>
      <BabyDetails babyId={babyId} />
      <BabyGeneralChart />
      <WeightChart />
      <HeightChart />
      <HeadCirChart />
    </>
  );
};

export default BabyOverview;

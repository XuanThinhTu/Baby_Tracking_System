import React from "react";
import BabyDetails from "./Info/BabyDetails";
import BabyGeneralChart from "./BabyChart/BabyGeneralChart";
import WeightChart from "./BabyChart/WeightChart";
import HeightChart from "./BabyChart/HeightChart";
import HeadCirChart from "./BabyChart/HeadCirChart";

const BabyOverview = () => {
    return (
        <>
            <BabyDetails />
            <BabyGeneralChart />
            <WeightChart />
            <HeightChart />
            <HeadCirChart />
        </>
    );
};

export default BabyOverview;

import React from "react";
import BabyDetails from "./BabyDetails";
import BabyGeneralChart from "./BabyGeneralChart";
import WeightChart from "./WeightChart";

const BabyOverview = () => {
    return (
        <>
            <BabyDetails />
            <BabyGeneralChart />
            <WeightChart />
        </>
    );
};

export default BabyOverview;

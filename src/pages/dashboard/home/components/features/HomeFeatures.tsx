import React from "react";
import * as Styled from "./HomeFeatures.styles";
import { useNavigate } from "react-router";

//components
import Heading from "components/heading/Heading";
import HomeMeasurements from "./measurements/HomeMeasurements";
import HomeDiets from "./diets/HomeDiets";
import HomePlan from "./plan/HomePlan";

//icons
import { FaBusinessTime, FaChartLine, FaCubes } from "icons/icons";
import Button from "components/form/button/Button";

const HomeFeatures = () => {
  const navigate = useNavigate();
  return (
    <Styled.HomeFeaturesWrapper>
      <Styled.HomeFeatureItem>
        <Heading title="Obecny plan" icon={<FaBusinessTime />} />
        <HomePlan />
      </Styled.HomeFeatureItem>
      <Styled.HomeFeatureItem>
        <Heading title="Ostatnie pomiary" icon={<FaChartLine />} />
        <HomeMeasurements />
        <Button
          fullWidth
          variant="secondary"
          onClick={() => navigate(`/dashboard/measurements/new`)}
        >
          nowy pomiar
        </Button>
      </Styled.HomeFeatureItem>
      <Styled.HomeFeatureItem>
        <Heading title="Jadłospisy" icon={<FaCubes />} />
        <HomeDiets />
        <Button fullWidth variant="secondary">
          nowy jadłospis
        </Button>
      </Styled.HomeFeatureItem>
      {/* <Styled.HomeFeatureItem>grupy</Styled.HomeFeatureItem> */}
    </Styled.HomeFeaturesWrapper>
  );
};

export default HomeFeatures;

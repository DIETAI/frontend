import React from "react";
import * as Styled from "./HomeFeatures.styles";

//components
import Heading from "components/heading/Heading";

//icons
import { FaBusinessTime, FaChartLine, FaCubes } from "icons/icons";

const HomeFeatures = () => {
  return (
    <Styled.HomeFeaturesWrapper>
      <Styled.HomeFeatureItem>
        <Heading title="Obecny plan" icon={<FaBusinessTime />} />
      </Styled.HomeFeatureItem>
      <Styled.HomeFeatureItem>
        <Heading title="Pomiary" icon={<FaChartLine />} />
      </Styled.HomeFeatureItem>
      <Styled.HomeFeatureItem>
        <Heading title="Jadłospisy" icon={<FaCubes />} />
      </Styled.HomeFeatureItem>
      {/* <Styled.HomeFeatureItem>grupy</Styled.HomeFeatureItem> */}
    </Styled.HomeFeaturesWrapper>
  );
};

export default HomeFeatures;

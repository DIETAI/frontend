import React from "react";

//styles
import * as Styled from "./Home.styles";

//components
import HomeInfo from "./components/info/HomeInfo";
import HomeFeatures from "./components/features/HomeFeatures";
import HomeCalendar from "./components/calendar/HomeCalendar2";

const Home = () => {
  return (
    <Styled.HomeContainer>
      <HomeInfo />
      <HomeFeatures />
      <HomeCalendar />
    </Styled.HomeContainer>
  );
};

export default Home;

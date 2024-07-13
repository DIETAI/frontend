import React from "react";
import * as Styled from "./HomeFeatures.styles";
import { useNavigate } from "react-router";

//images
import AddPatient from "assets/addUser.svg";
import AddMeal from "assets/addMeal.svg";
import AddDiet from "assets/addDiet.svg";

const HomeFeatures = () => {
  const navigate = useNavigate();
  return (
    <Styled.HomeFeaturesWrapper>
      <Styled.HomeFeatureItem
        onClick={() => navigate("/dashboard/clients/new")}
      >
        <img src={AddPatient} />
        <h2>dodaj pacjenta</h2>
      </Styled.HomeFeatureItem>
      <Styled.HomeFeatureItem
        onClick={() => navigate("/dashboard/dinners/new")}
      >
        <img src={AddMeal} />
        <h2>dodaj posiłek</h2>
      </Styled.HomeFeatureItem>
      <Styled.HomeFeatureItem onClick={() => navigate("/dashboard/diets/new")}>
        <img src={AddDiet} />
        <h2>dodaj jadłospis</h2>
      </Styled.HomeFeatureItem>
    </Styled.HomeFeaturesWrapper>
  );
};

export default HomeFeatures;

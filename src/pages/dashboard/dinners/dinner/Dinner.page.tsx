import React from "react";

//styles
import * as Styled from "./DinnerPage.styles";

//icons
import { FaUtensils } from "icons/icons";

//components
import DinnerContent from "./components/content/DinnerContent";
import DinnerSidebar from "./components/sidebar/DinnerSidebar";
import { dinnerSidebarSections } from "./components/sidebar/sections";

const Dinner = () => {
  return (
    <Styled.DinnerContainer>
      <DinnerContent />
      <DinnerSidebar
        title={"Informacje"}
        icon={<FaUtensils />}
        sections={dinnerSidebarSections}
      />
    </Styled.DinnerContainer>
  );
};

export default Dinner;

import React from "react";

//styles
import * as Styled from "./DietEstablishmentPage.styles";

//icons
import { FaUtensils } from "icons/icons";

//components
import DietEstablishmentContent from "./components/content/DietEstablishmentContent";
import DietEstablishmentSidebar from "./components/sidebar/DietEstablishmentSidebar";
import { dietEstablishmentSidebarSections } from "./components/sidebar/sections";

const DietEstablishment = () => {
  return (
    <Styled.DietEstablishmentContainer>
      <DietEstablishmentContent />
      <DietEstablishmentSidebar
        title={"Informacje"}
        icon={<FaUtensils />}
        sections={dietEstablishmentSidebarSections}
      />
    </Styled.DietEstablishmentContainer>
  );
};

export default DietEstablishment;

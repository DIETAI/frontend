import React from "react";
import { useParams } from "react-router";
import { dietEstablishmentsNavLinks } from "../utils/dietEstablishmentLinks";

//styles
import * as Styled from "./DietEstablishmentPage.styles";

//icons
import { FaUtensils } from "icons/icons";

//components
import PageNav from "components/pageNav/PageNav";
import DietEstablishmentContent from "./components/content/DietEstablishmentContent";
import DietEstablishmentSidebar from "./components/sidebar/DietEstablishmentSidebar";
import { dietEstablishmentSidebarSections } from "./components/sidebar/sections";

const DietEstablishment = () => {
  const { dietEstablishmentId } = useParams();
  if (!dietEstablishmentId) return null;
  return (
    <>
      <PageNav
        headingTitle={"Założenia żywieniowe"}
        pageNavLinks={[
          ...dietEstablishmentsNavLinks,
          {
            id: dietEstablishmentsNavLinks.length + 1,
            title: "założenia",
            path: `/dashboard/diet-establishments/${dietEstablishmentId}`,
          },
        ]}
      />
      <Styled.DietEstablishmentContainer>
        <DietEstablishmentContent />
        <DietEstablishmentSidebar
          title={"Informacje"}
          icon={<FaUtensils />}
          sections={dietEstablishmentSidebarSections}
        />
      </Styled.DietEstablishmentContainer>
    </>
  );
};

export default DietEstablishment;

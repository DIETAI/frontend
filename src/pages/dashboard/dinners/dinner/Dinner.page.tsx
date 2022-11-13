import React from "react";
import { useParams } from "react-router";
import { dinnerNavLinks } from "../utils/navLinks";
import { dinnerSidebarSections } from "./components/sidebar/sections";

//styles
import * as Styled from "./DinnerPage.styles";

//icons
import { FaInfoCircle } from "icons/icons";

//components
import DinnerContent from "./components/content/DinnerContent";
import DinnerSidebar from "./components/sidebar/DinnerSidebar";
import PageNav from "components/pageNav/PageNav";

const Dinner = () => {
  const { dinnerId } = useParams();

  return (
    <>
      <PageNav
        headingTitle={"Posiłki"}
        pageNavLinks={[
          ...dinnerNavLinks,
          {
            id: dinnerNavLinks.length + 1,
            title: "posiłek",
            path: `/dashboard/dinners/${dinnerId}`,
          },
        ]}
      />
      <Styled.DinnerContainer>
        <DinnerContent />
        <DinnerSidebar
          title={"Dane posiłku"}
          icon={<FaInfoCircle />}
          sections={dinnerSidebarSections}
        />
      </Styled.DinnerContainer>
    </>
  );
};

export default Dinner;

import React from "react";
import { useParams } from "react-router";
import { dinnerNavLinks } from "../utils/navLinks";
import { dinnerSidebarSections } from "./components/sidebar/sections";
import { getDinner } from "services/getDinners";

//styles
import * as Styled from "./DinnerPage.styles";

//icons
import { FaUtensils } from "icons/icons";

//components
import DinnerContent from "./components/content/DinnerContent";
import DinnerSidebar from "./components/sidebar/DinnerSidebar";
import PageNav from "components/pageNav/PageNav";

const Dinner = () => {
  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;

  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);

  if (dinnerLoading) return <div>dinner loading...</div>;
  if (dinnerError || !dinner) return <div>dinner error</div>;

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
          title={"Informacje"}
          icon={<FaUtensils />}
          sections={dinnerSidebarSections}
        />
      </Styled.DinnerContainer>
    </>
  );
};

export default Dinner;

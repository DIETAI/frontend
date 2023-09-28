import React from "react";

//styles
import * as Styled from "./GeneratedDiet.styles";

//components
import Heading from "components/heading/Heading";
import GeneratedDietNav from "./generatedDietNav/GeneratedDietNav";
import GeneratedDays from "./generatedDays/GeneratedDays";

//icons
import { FaCalendar } from "icons/icons";

const GeneratedDiet = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <Styled.GeneratedDietWrapper>
      <Heading icon={<FaCalendar />} title="Dni" />
      <GeneratedDietNav closeModal={closeModal} />
      <GeneratedDays />
    </Styled.GeneratedDietWrapper>
  );
};

export default GeneratedDiet;

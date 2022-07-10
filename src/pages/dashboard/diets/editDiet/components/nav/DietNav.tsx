import React, { useState } from "react";

import * as Styled from "./DietNav.styles";

//icons
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarPlus,
  FaFileAlt,
} from "icons/icons";

//interfaces
import { DaysView } from "../../EditDiet.page";

//components
import IconButton from "components/iconButton/IconButton";
import Modal from "components/modal/Modal";
import DietGenerateModal from "../dietGenerateModal/DietGenerateModal";

const DietNav = ({
  setView,
  view,
}: {
  setView: (day: DaysView) => void;
  view: DaysView;
}) => {
  const [dietGenerateModalOpen, setDietGenerateModalOpen] = useState(false);

  const openDietEstablishment = () => {
    console.log("openDietEstablishment");
  };
  const openGenerateDietModal = () => {
    console.log("openGenerateDietModal");
    setDietGenerateModalOpen(true);
  };

  const changeOneDayView = () => {
    setView("oneDay");
  };

  const changeManyDaysView = () => {
    setView("manyDays");
  };
  return (
    <Styled.DietNavWrapper>
      <Styled.OptionsWrapper>
        <IconButton
          active={view === "oneDay"}
          icon={<FaCalendarDay />}
          onClick={changeOneDayView}
          modalText="widok jednego dnia"
        />
        <IconButton
          active={view === "manyDays"}
          icon={<FaCalendarWeek />}
          onClick={changeManyDaysView}
          modalText="widok kilku dni"
        />
      </Styled.OptionsWrapper>
      <Styled.OptionsWrapper>
        <IconButton
          icon={<FaFileAlt />}
          onClick={openDietEstablishment}
          modalText="założenia diety"
        />
        <IconButton
          icon={<FaCalendarPlus />}
          onClick={openGenerateDietModal}
          modalText="generuj dietę"
        />
      </Styled.OptionsWrapper>

      <Modal
        onClose={() => setDietGenerateModalOpen(false)}
        open={dietGenerateModalOpen}
      >
        <DietGenerateModal closeModal={() => setDietGenerateModalOpen(false)} />
      </Modal>
    </Styled.DietNavWrapper>
  );
};

export default DietNav;

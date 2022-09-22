import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

//store
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";

import * as Styled from "./DietNav.styles";

import { useNavigate } from "react-router";
import axios from "utils/api";
import { useAlert } from "layout/dashboard/context/alert.context";

//icons
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarPlus,
  FaFileAlt,
  FaTrash,
} from "icons/icons";

//interfaces
import { DaysView } from "../../EditDiet.page";
import { IDietData } from "interfaces/diet/diet.interfaces";

//components
import IconButton from "components/iconButton/IconButton";
import Modal from "components/modal/Modal";
import DietGenerateModal from "../dietGenerateModal/DietGenerateModal";
import DeleteModalContent from "pages/dashboard/components/deleteModal/DeleteModal";
import GeneratedDietModal from "../generatedDietModal/GeneratedDietModal";

const DietNav = ({
  setView,
  view,
  diet,
}: {
  setView: (day: DaysView) => void;
  view: DaysView;
  diet: IDietData;
}) => {
  const { generatedDays, generateDietLoading } = useSelector(
    (state: RootState) => state.dietGenerate
  );

  const [dietGenerateModalOpen, setDietGenerateModalOpen] = useState(false);
  const [generatedDietModalOpen, setGeneratedDietModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { handleAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ generateDietLoading });
    if (generateDietLoading) {
      return setGeneratedDietModalOpen(true);
    }

    return;
  }, [generateDietLoading]);

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

  const deleteDiet = async () => {
    //open delete item popup
    try {
      await axios.delete(`/api/v1/diets/${diet._id}`, {
        withCredentials: true,
      });

      console.log("usunięto dietę");
      handleAlert("success", "Usunięto dietę");
      navigate("/dashboard/diets");
    } catch (e) {
      console.log("nie udało się usunąć diety");
      handleAlert("error", "Usuwanie diety nie powiodło się");
    }
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
        <IconButton
          icon={<FaTrash />}
          onClick={() => setOpenDeleteModal(true)}
          modalText="usuń dietę"
        />
      </Styled.OptionsWrapper>

      <Modal
        onClose={() => setDietGenerateModalOpen(false)}
        open={dietGenerateModalOpen}
      >
        <DietGenerateModal closeModal={() => setDietGenerateModalOpen(false)} />
      </Modal>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DeleteModalContent
          deleteItemName={diet.name}
          deleteAction={deleteDiet}
        />
      </Modal>
      <Modal open={generatedDietModalOpen} width="1536px">
        <GeneratedDietModal />
      </Modal>
    </Styled.DietNavWrapper>
  );
};

export default DietNav;

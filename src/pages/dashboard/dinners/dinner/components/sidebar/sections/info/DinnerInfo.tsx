import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import Button from "components/form/button/Button";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useAlert } from "layout/dashboard/context/alert.context";

import { getDinner } from "services/getDinners";

//styles
import * as Styled from "./DinnerInfo.styles";

//components
import Modal from "components/modal/Modal";
import DeleteModalContent from "./deleteDinnerModal/DeleteDinnerModal";

const DinnerInfo = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;
  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);

  if (dinnerLoading) return <div>dinner loading...</div>;
  if (dinnerError || !dinner) return <div>dinner error</div>;

  const deleteDinner = async () => {
    //open delete item popup
    try {
      await axios.delete(`/api/v1/dinners/${dinner._id}`, {
        withCredentials: true,
      });

      console.log("usunięto posiłek");
      handleAlert("success", "Usunięto posiłek");
      navigate("/dashboard/dinners");
    } catch (e) {
      console.log("nie udało się usunąć posiłku");
      handleAlert("error", "Usuwanie posiłku nie powiodło się");
    }
  };

  return (
    <>
      <Styled.DinnerInfoWrapper>
        <Styled.DinnerInfoItem>
          <h2>{t("formOptions.name")}: </h2>
          <p>{dinner.name}</p>
        </Styled.DinnerInfoItem>
        <Styled.DinnerInfoItem>
          <h2>{t("formOptions.created")}: </h2>{" "}
          <p>
            {format(new Date(dinner.createdAt), "dd.MM.yyyy, hh:mm", {
              locale: pl,
            })}
          </p>
        </Styled.DinnerInfoItem>
        <Styled.DinnerInfoItem>
          <h2>{t("formOptions.lastUpdated")}: </h2>{" "}
          <p>
            {format(new Date(dinner.updatedAt), "dd.MM.yyyy, hh:mm", {
              locale: pl,
            })}
          </p>
        </Styled.DinnerInfoItem>
        <Button
          fullWidth
          onClick={() => navigate(`/dashboard/dinners/edit/${dinner._id}`)}
        >
          {t("formOptions.edit")}
        </Button>
        <Button
          fullWidth
          variant="data-delete-primary"
          onClick={() => setOpenDeleteModal(true)}
        >
          usuń
        </Button>

        <button>pobierz</button>
      </Styled.DinnerInfoWrapper>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DeleteModalContent
          deleteItemName={dinner.name}
          deleteAction={deleteDinner}
        />
      </Modal>
    </>
  );
};

export default DinnerInfo;

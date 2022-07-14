import React, { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useAlert } from "layout/dashboard/context/alert.context";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

import { useDietEstablishment } from "services/useDietEstablishments";

//styles
import * as Styled from "./DietEstablishmentInfo.styles";

//components
import Modal from "components/modal/Modal";
import DeleteModalContent from "pages/dashboard/components/deleteModal/DeleteModal";
import Button from "components/form/button/Button";

const DietEstablishmentInfo = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { handleAlert } = useAlert();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { dietEstablishmentId } = useParams();
  console.log({ dietEstablishmentId });

  if (!dietEstablishmentId) return <div>not found</div>;
  const {
    dietEstablishment,
    dietEstablishmentError,
    dietEstablishmentLoading,
  } = useDietEstablishment(dietEstablishmentId);

  if (dietEstablishmentLoading) return <div>dietEstablishment loading...</div>;
  if (dietEstablishmentError || !dietEstablishment)
    return <div>dietEstablishment error</div>;

  const deleteEstablishment = async () => {
    //open delete item popup
    try {
      await axios.delete(
        `/api/v1/dietEstablishments/${dietEstablishment._id}`,
        {
          withCredentials: true,
        }
      );

      console.log("usunięto założenia");
      handleAlert("success", "Dodano założenia");
      navigate("/dashboard/diet-establishments");
    } catch (e) {
      console.log("nie udało się usunąć założeń");
      handleAlert("error", "Usuwanie założeń nie powiodło się");
    }
  };

  return (
    <>
      <Styled.DietEstablishmentInfoWrapper>
        <Styled.DietEstablishmentInfoItem>
          <h2>{t("formOptions.name")}: </h2>
          <p>{dietEstablishment.name}</p>
        </Styled.DietEstablishmentInfoItem>
        <Styled.DietEstablishmentInfoItem>
          <h2>{t("formOptions.created")}: </h2>{" "}
          <p>
            {format(
              new Date(dietEstablishment.createdAt),
              "dd.MM.yyyy, hh:mm",
              {
                locale: pl,
              }
            )}
          </p>
        </Styled.DietEstablishmentInfoItem>
        <Styled.DietEstablishmentInfoItem>
          <h2>{t("formOptions.lastUpdated")}: </h2>{" "}
          <p>
            {format(
              new Date(dietEstablishment.updatedAt),
              "dd.MM.yyyy, hh:mm",
              {
                locale: pl,
              }
            )}
          </p>
        </Styled.DietEstablishmentInfoItem>
        <Button
          fullWidth
          onClick={() =>
            navigate(
              `/dashboard/diet-establishments/edit/${dietEstablishment._id}`
            )
          }
        >
          {t("formOptions.edit")}
        </Button>

        <button>pobierz</button>
        <Button
          fullWidth
          variant="data-delete-primary"
          onClick={() => setOpenDeleteModal(true)}
        >
          usuń
        </Button>
      </Styled.DietEstablishmentInfoWrapper>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DeleteModalContent
          deleteItemName={dietEstablishment.name}
          deleteAction={deleteEstablishment}
        />
      </Modal>
    </>
  );
};

export default DietEstablishmentInfo;

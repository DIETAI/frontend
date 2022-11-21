import React, { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useAlert } from "layout/dashboard/context/alert.context";
import { AnimatePresence } from "framer-motion";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

import { useDietEstablishment } from "services/useDietEstablishments";

//styles
import * as Styled from "./DietEstablishmentInfo.styles";

//components
import LoadingGrid from "../../../loading/LoadingGrid";
import Modal from "components/modal/Modal";
import DeleteModalContent from "pages/dashboard/components/deleteModal/DeleteModal";
import Button from "components/form/button/Button";

//icons
import { FaEdit, FaTrash } from "react-icons/fa";

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

  if (dietEstablishmentError) return <div>dietEstablishment error</div>;

  const deleteEstablishment = async () => {
    //open delete item popup
    try {
      await axios.delete(`/api/v1/dietEstablishments/${dietEstablishmentId}`, {
        withCredentials: true,
      });

      console.log("usunięto założenia");
      handleAlert("success", "Dodano założenia");
      navigate("/dashboard/diet-establishments");
    } catch (e) {
      console.log("nie udało się usunąć założeń");
      handleAlert("error", "Usuwanie założeń nie powiodło się");
    }
  };

  return (
    <Styled.InfoContainer>
      <AnimatePresence>
        {dietEstablishmentLoading && (
          <Styled.LoadingWrapper
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingGrid columns={2} rows={2} />
          </Styled.LoadingWrapper>
        )}
      </AnimatePresence>
      {dietEstablishment && (
        <>
          <Styled.InfoWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <Styled.InfoItem>
              <h2>Założenia żywieniowe: </h2>
              <p>{dietEstablishment.name}</p>
            </Styled.InfoItem>
            <Styled.InfoItem>
              <h2>{t("formOptions.created")}: </h2>{" "}
              <p>
                {format(
                  new Date(dietEstablishment.createdAt),
                  "dd.MM.yyyy, HH:mm",
                  {
                    locale: pl,
                  }
                )}
              </p>
            </Styled.InfoItem>
            <Styled.InfoItem>
              <h2>{t("formOptions.lastUpdated")}: </h2>{" "}
              <p>
                {format(
                  new Date(dietEstablishment.updatedAt),
                  "dd.MM.yyyy, HH:mm",
                  {
                    locale: pl,
                  }
                )}
              </p>
            </Styled.InfoItem>
            <Styled.InfoOptionsWrapper>
              <Styled.InfoOption
                optionType="edit"
                type="button"
                onClick={() =>
                  navigate(
                    `/dashboard/diet-establishments/edit/${dietEstablishment._id}`
                  )
                }
              >
                <span>
                  <FaEdit />
                </span>
                edytuj
              </Styled.InfoOption>
              {/* <Styled.ProductInfoOption optionType="download" type="button">
            <span>
              <FaDownload />
            </span>
            pobierz
          </Styled.ProductInfoOption> */}
              <Styled.InfoOption
                optionType="delete"
                type="button"
                onClick={() => setOpenDeleteModal(true)}
              >
                <span>
                  <FaTrash />
                </span>
                usuń
              </Styled.InfoOption>
            </Styled.InfoOptionsWrapper>
          </Styled.InfoWrapper>
          <Modal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
          >
            <DeleteModalContent
              deleteItemName={dietEstablishment.name}
              deleteAction={deleteEstablishment}
            />
          </Modal>
        </>
      )}
    </Styled.InfoContainer>
  );
};

export default DietEstablishmentInfo;

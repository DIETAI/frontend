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
import { AnimatePresence } from "framer-motion";

import { getDinner } from "services/getDinners";

//styles
import * as Styled from "./DinnerInfo.styles";

//components
import Modal from "components/modal/Modal";
import DeleteModalContent from "pages/dashboard/components/deleteModal/DeleteModal";

//icons
import { FaDownload, FaTrash, FaEdit } from "icons/icons";

//components
import LoadingGrid from "../../../loading/LoadingGrid";

const DinnerInfo = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;
  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);

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
    <Styled.DinnerInfoContainer>
      <AnimatePresence>
        {dinnerLoading && (
          <Styled.DinnerLoadingWrapper
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingGrid columns={2} rows={2} />
          </Styled.DinnerLoadingWrapper>
        )}
      </AnimatePresence>
      {dinner && (
        <>
          <Styled.DinnerInfoWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <Styled.DinnerInfoItem>
              <h2>{t("formOptions.name")}: </h2>
              <p>{dinner.name}</p>
            </Styled.DinnerInfoItem>
            <Styled.DinnerInfoItem>
              <h2>{t("formOptions.created")}: </h2>{" "}
              <p>
                {format(new Date(dinner.createdAt), "dd.MM.yyyy, HH:mm", {
                  locale: pl,
                })}
              </p>
            </Styled.DinnerInfoItem>
            <Styled.DinnerInfoItem>
              <h2>{t("formOptions.lastUpdated")}: </h2>{" "}
              <p>
                {format(new Date(dinner.updatedAt), "dd.MM.yyyy, HH:mm", {
                  locale: pl,
                })}
              </p>
            </Styled.DinnerInfoItem>
            <Styled.DinnerInfoOptionsWrapper>
              <Styled.DinnerInfoOption
                optionType="edit"
                type="button"
                onClick={() =>
                  navigate(`/dashboard/dinners/edit/${dinner._id}`)
                }
              >
                <span>
                  <FaEdit />
                </span>
                edytuj
              </Styled.DinnerInfoOption>
              {/* <Styled.DinnerInfoOption optionType="download" type="button">
          <span>
            <FaDownload />
          </span>
          pobierz
        </Styled.DinnerInfoOption> */}
              <Styled.DinnerInfoOption
                optionType="delete"
                type="button"
                onClick={() => setOpenDeleteModal(true)}
              >
                <span>
                  <FaTrash />
                </span>
                usuń
              </Styled.DinnerInfoOption>
            </Styled.DinnerInfoOptionsWrapper>
          </Styled.DinnerInfoWrapper>
          <Modal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
          >
            <DeleteModalContent
              deleteItemName={dinner.name}
              deleteAction={deleteDinner}
            />
          </Modal>
        </>
      )}
    </Styled.DinnerInfoContainer>
  );
};

export default DinnerInfo;

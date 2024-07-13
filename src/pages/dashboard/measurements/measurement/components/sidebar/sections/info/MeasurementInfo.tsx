import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { useAlert } from "layout/dashboard/context/alert.context";
import axios from "utils/api";

import { useMeasurement } from "services/measurement.service";

//icons
import { FaEdit, FaTrash } from "icons/icons";

//components
import Button from "components/form/button/Button";
import LoadingGrid from "../../../loading/LoadingGrid";
import Modal from "components/modal/Modal";
import DeleteModalContent from "pages/dashboard/components/deleteModal/DeleteModal";

//styles
import * as Styled from "./MeasurementInfo.styles";

const MeasurementInfo = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { handleAlert } = useAlert();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { measurementId } = useParams();
  console.log({ measurementId });

  if (!measurementId) return <div>not found</div>;
  const { measurement, measurementError, measurementLoading } =
    useMeasurement(measurementId);

  // if (measurementLoading) return <div>measurement loading...</div>;
  if (measurementError) return <div>measurement error</div>;

  const deleteMeasurement = async () => {
    //open delete item popup
    try {
      await axios.delete(`/api/v1/measurements/${measurementId}`, {
        withCredentials: true,
      });

      console.log("usunięto pomiar");
      handleAlert("success", "Usunięto pomiar");
      navigate("/dashboard/measurements");
    } catch (e) {
      console.log("nie udało się usunąć pomiaru");
      handleAlert("error", "Usuwanie pomiaru nie powiodło się");
    }
  };

  return (
    <Styled.InfoContainer>
      <AnimatePresence>
        {measurementLoading && (
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
      {measurement && (
        <>
          <Styled.InfoWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <Styled.InfoItem>
              <h2>Pomiar: </h2>
              <p>{measurement.name}</p>
            </Styled.InfoItem>
            <Styled.InfoItem>
              <h2>{t("formOptions.created")}: </h2>{" "}
              <p>
                {format(new Date(measurement.createdAt), "dd.MM.yyyy, HH:mm", {
                  locale: pl,
                })}
              </p>
            </Styled.InfoItem>
            <Styled.InfoItem>
              <h2>{t("formOptions.lastUpdated")}: </h2>{" "}
              <p>
                {format(new Date(measurement.updatedAt), "dd.MM.yyyy, HH:mm", {
                  locale: pl,
                })}
              </p>
            </Styled.InfoItem>
            <Styled.InfoOptionsWrapper>
              <Styled.InfoOption
                optionType="edit"
                type="button"
                onClick={() =>
                  navigate(`/dashboard/measurements/edit/${measurement._id}`)
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
              deleteItemName={measurement.name}
              deleteAction={deleteMeasurement}
            />
          </Modal>
        </>
      )}
    </Styled.InfoContainer>
  );
};

export default MeasurementInfo;

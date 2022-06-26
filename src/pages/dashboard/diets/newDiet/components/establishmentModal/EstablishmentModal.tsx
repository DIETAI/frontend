import React, { useState } from "react";
import { useDietEstablishments } from "services/useDietEstablishments";

//icons
import { FaUserCog } from "icons/icons";

//components
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";

//styles
import * as Styled from "./EstablishmentModal.styles";

//form
import { useFormContext } from "react-hook-form";

//translation
import { useTranslation } from "react-i18next";

interface IEstablishmentModal {
  closeModal: () => void;
}

const EstablishmentModal = ({ closeModal }: IEstablishmentModal) => {
  const { t } = useTranslation();
  const {
    dietEstablishments,
    dietEstablishmentsError,
    dietEstablishmentsLoading,
  } = useDietEstablishments();

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const currentEstablishment = getValues("establishmentId");

  const [selectedEstablishmentId, setSelectedEstablishmentId] =
    useState(currentEstablishment);

  if (dietEstablishmentsLoading)
    return <div>dietEstablishments loading...</div>;
  if (dietEstablishmentsError) return <div>dietEstablishments error</div>;

  console.log({ dietEstablishments });

  const addEstablishment = (id: string) => {
    setValue("establishmentId", id);
    closeModal();
  };

  return (
    <Styled.EstablishmentModalContainer>
      <Heading
        icon={<FaUserCog />}
        title={t("diets.establishment.modal.title")}
        description={t("diets.establishment.modal.description")}
      />

      <div>
        <p>szukaj</p>
        <Button>stwórz założenia</Button>
      </div>

      {dietEstablishments?.map((establishment) => (
        <li key={establishment._id}>
          <h2>nazwa: {establishment.name}</h2>
          <p>kcal: {establishment.kcal}</p>
          <button onClick={() => addEstablishment(establishment._id)}>
            add
          </button>
        </li>
      ))}
    </Styled.EstablishmentModalContainer>
  );
};

export default EstablishmentModal;

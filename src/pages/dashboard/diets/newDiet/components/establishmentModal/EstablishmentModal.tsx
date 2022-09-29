import React, { useState } from "react";
import { useDietEstablishments } from "services/useDietEstablishments";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

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

//icons
import { FaPlus, FaSearch } from "icons/icons";

interface IEstablishmentModal {
  closeModal: () => void;
}

const EstablishmentModal = ({ closeModal }: IEstablishmentModal) => {
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState("");
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

  const client = getValues("clientId");
  const currentEstablishment = getValues("establishmentId");
  const dietName = getValues("name");
  const daysAmount = getValues("daysAmount");

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

  if (!client) return <div>dodaj pacjenta</div>;

  const clientEstablishments = dietEstablishments?.filter(
    (establishment) => establishment.client === client
  );

  if (!clientEstablishments || clientEstablishments.length < 1)
    return <div>nie znaleziono założeń dla pacjenta</div>;

  const params = { dietName, patientId: client, daysAmount };

  return (
    <Styled.EstablishmentModalContainer>
      <Heading
        icon={<FaUserCog />}
        title={t("diets.establishment.modal.title")}
        description={t("diets.establishment.modal.description")}
      />

      <Styled.EstablishmentModalNav>
        <input
          value={searchContent}
          onChange={(e) => setSearchContent(e.currentTarget.value)}
          placeholder="Szukaj..."
        ></input>
        <Button
          onClick={() =>
            navigate({
              pathname: `/dashboard/diet-establishments/new`,
              search: `?${createSearchParams(params)}`,
            })
          }
        >
          stwórz założenia
        </Button>
      </Styled.EstablishmentModalNav>

      <Styled.EstablishmentList>
        {clientEstablishments.map((establishment) => (
          <Styled.EstablishmentItem
            key={establishment._id}
            activeItem={currentEstablishment === establishment._id}
          >
            <Styled.EstablishmentItemContent>
              <h2>{establishment.name}</h2>
              <Styled.EstablishmentItemMacroList>
                <p>kcal: {establishment.kcal}</p>
                <p>białka (g): {establishment.protein.gram}</p>
                <p>tłuszcze (g): {establishment.fat.gram}</p>
                <p>węglowodany (g): {establishment.carbohydrates.gram}</p>
                <p>błonnik (g): {establishment.fiber.gram}</p>
              </Styled.EstablishmentItemMacroList>
            </Styled.EstablishmentItemContent>

            <Styled.EstablishmentButtonWrapper>
              <Styled.EstablishmentButton
                buttonVariant="view"
                onClick={() =>
                  navigate(
                    `/dashboard/diet-establishments/${establishment._id}`
                  )
                }
              >
                <FaSearch />
              </Styled.EstablishmentButton>
              <Styled.EstablishmentButton
                buttonVariant="add"
                onClick={() => addEstablishment(establishment._id)}
              >
                <FaPlus />
              </Styled.EstablishmentButton>
            </Styled.EstablishmentButtonWrapper>
          </Styled.EstablishmentItem>
        ))}
      </Styled.EstablishmentList>
    </Styled.EstablishmentModalContainer>
  );
};

export default EstablishmentModal;

import React, { useState } from "react";
import { getDietEstablishments } from "services/getDietEstablishments";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";

//icons
import { FaUserCog, FaFileAlt } from "icons/icons";

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
import { FaPlus, FaSearch, FaExclamationCircle } from "icons/icons";

//images
import NoDataImg from "assets/noData.svg";

//animations
import { AnimatePresence } from "framer-motion";

//components
import LoadingGrid from "components/loading/loadingGrid/LoadingGrid";

interface IEstablishmentModal {
  closeModal: () => void;
}

const optionFilter = (
  searchValue: string,
  establishments?: IDietEstablishmentData[]
) => {
  if (!establishments) return [];
  if (
    establishments.find((establishment) => establishment.name === searchValue)
  ) {
    return establishments;
  }

  return establishments.filter((establishment) =>
    establishment.name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

const EstablishmentModal = ({ closeModal }: IEstablishmentModal) => {
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState("");
  const { t } = useTranslation();
  const {
    dietEstablishments,
    dietEstablishmentsError,
    dietEstablishmentsLoading,
  } = getDietEstablishments();

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

  // const [selectedEstablishmentId, setSelectedEstablishmentId] =
  //   useState(currentEstablishment);

  if (dietEstablishmentsError)
    return (
      <Styled.EstablishmentModalContainer>
        <Heading icon={<FaFileAlt />} title="Dodaj założenia" />
        <Styled.ErrorWrapper>
          <FaExclamationCircle />
          <h3>Brak danych</h3>
        </Styled.ErrorWrapper>
      </Styled.EstablishmentModalContainer>
    );

  const addEstablishment = (id: string) => {
    setValue("establishmentId", id);
    closeModal();
  };

  const clientEstablishments = (establishments: IDietEstablishmentData[]) => {
    const renderEstablishments = establishments.filter(
      (establishment) => establishment.client._id === client
    );

    return renderEstablishments;
  };

  const params = { dietName, patientId: client, daysAmount };

  const renderDietEstablishments = (
    clientEstablishments: IDietEstablishmentData[]
  ) => {
    return optionFilter(searchContent, clientEstablishments);
  };

  return (
    <Styled.EstablishmentModalContainer>
      <Heading
        icon={<FaFileAlt />}
        title="Dodaj założenia"
        // title={t("diets.establishment.modal.title")}
        // description={t("diets.establishment.modal.description")}
      />
      <Styled.EstablishmentWrapper>
        <AnimatePresence>
          {dietEstablishmentsLoading && (
            <Styled.EstablishmentLoadingWrapper
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingGrid rows={4} />
            </Styled.EstablishmentLoadingWrapper>
          )}
        </AnimatePresence>

        {dietEstablishments && (
          <>
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

            {!clientEstablishments(dietEstablishments) ||
              (clientEstablishments(dietEstablishments).length < 1 && (
                <Styled.EstablishmentEmptyWrapper>
                  <img src={NoDataImg} />
                  <h2>Brak dostępnych założeń pacjenta, stwórz założenia.</h2>
                </Styled.EstablishmentEmptyWrapper>
              ))}

            {clientEstablishments(dietEstablishments) &&
              clientEstablishments(dietEstablishments).length > 0 && (
                <>
                  {renderDietEstablishments(
                    clientEstablishments(dietEstablishments)
                  ).length < 1 && (
                    <Styled.EstablishmentEmptyWrapper>
                      <img src={NoDataImg} />
                      <h2>Nie znaleziono założeń</h2>
                    </Styled.EstablishmentEmptyWrapper>
                  )}

                  <Styled.EstablishmentList>
                    {renderDietEstablishments(
                      clientEstablishments(dietEstablishments)
                    ).map((establishment) => (
                      <Styled.EstablishmentItem
                        key={establishment._id}
                        activeItem={currentEstablishment === establishment._id}
                      >
                        <Styled.EstablishmentItemContent>
                          <h2>{establishment.name}</h2>
                          <Styled.EstablishmentItemMacroList>
                            <Styled.MacroItem>
                              <h2>kcal: </h2>
                              <p>{establishment.kcal}</p>
                            </Styled.MacroItem>

                            <Styled.MacroItem>
                              <h2>białka (g): </h2>
                              <p>{establishment.protein.gram}</p>
                            </Styled.MacroItem>

                            <Styled.MacroItem>
                              <h2>tłuszcze (g): </h2>
                              <p>{establishment.fat.gram}</p>
                            </Styled.MacroItem>

                            <Styled.MacroItem>
                              <h2>węglowodany (g): </h2>
                              <p>{establishment.carbohydrates.gram}</p>
                            </Styled.MacroItem>

                            <Styled.MacroItem>
                              <h2>błonnik (g): </h2>
                              <p>{establishment.fiber.gram}</p>
                            </Styled.MacroItem>
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
                </>
              )}
          </>
        )}
      </Styled.EstablishmentWrapper>
    </Styled.EstablishmentModalContainer>
  );
};

export default EstablishmentModal;

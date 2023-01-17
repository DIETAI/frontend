import React, { useState } from "react";
import { IDietDinnerQueryData } from "interfaces/diet/dietQuery.interfaces";

//styles
import * as Styled from "./InfoDinnerModalContent.styles";

//components
import Heading from "components/heading/Heading";
import Image from "components/form/images/image/Image";

//icons
import { FaUtensils, FaChevronDown } from "icons/icons";

//assets
import LogoBackground from "assets/logo-icon.svg";
import NoImage from "assets/noImage.svg";
import { IDietDinnerPopulateData } from "interfaces/diet/dietPopulate.interfaces";

const InfoModalContent = ({
  dietDinner,
  closeModal,
}: {
  dietDinner: IDietDinnerPopulateData;
  closeModal: () => void;
}) => {
  const [openAllNutrients, setOpenAllNutrients] = useState(false);
  const handleOpenAllNutrients = () => {
    setOpenAllNutrients(!openAllNutrients);
  };

  const { dinnerPortionId } = dietDinner;
  return (
    <Styled.ModalContentWrapper>
      <Heading
        icon={<FaUtensils />}
        title="Potrawa"
        // description={t("dinner.form.products.modal.description")}
      />
      <Styled.DinnerInfoWrapper>
        <Styled.DinnerInfoImageWrapper>
          <img className="backgroundImg" src={LogoBackground} />

          <img
            className="productImg"
            src={dinnerPortionId.dinnerId.image?.imageURL || NoImage}
          />
        </Styled.DinnerInfoImageWrapper>
        <Styled.DinnerInfoDescriptionWrapper>
          <h2>{dinnerPortionId.dinnerId.name}</h2>

          {/* {dinnerPortionId.dinnerId.recipe && (
            <Styled.DinnerInfoDescriptionItem>
              <Styled.DinnerInfoDescriptionNavItem>
                przepis
              </Styled.DinnerInfoDescriptionNavItem>
              <p>{dinnerPortionId.dinnerId.recipe}</p>
            </Styled.DinnerInfoDescriptionItem>
          )} */}

          <Styled.DinnerInfoDescriptionItem>
            <Styled.DinnerInfoDescriptionNavItem>
              makroskładniki
            </Styled.DinnerInfoDescriptionNavItem>
            <Styled.DinnerInfoMacroWrapper>
              <li>
                kcal: <b>{dinnerPortionId.total.kcal}</b>
              </li>
              <li>
                B (g): <b>{dinnerPortionId.total.protein.gram}</b>
              </li>
              <li>
                T (g): <b>{dinnerPortionId.total.fat.gram}</b>
              </li>
              <li>
                W (g): <b>{dinnerPortionId.total.carbohydrates.gram}</b>
              </li>
              <li>
                Wp (g):{" "}
                <b>{dinnerPortionId.total.digestableCarbohydrates.gram}</b>
              </li>
              <li>
                Bł (g): <b>{dinnerPortionId.total.fiber.gram}</b>
              </li>
            </Styled.DinnerInfoMacroWrapper>
          </Styled.DinnerInfoDescriptionItem>

          <Styled.AllNutrientsButton
            type="button"
            onClick={handleOpenAllNutrients}
            openAllNutrients={openAllNutrients}
          >
            {openAllNutrients
              ? "zwiń do makroskładników"
              : "rozwiń wszystkie składniki"}

            <FaChevronDown />
          </Styled.AllNutrientsButton>

          {openAllNutrients && (
            <>
              <Styled.DinnerInfoDescriptionItem>
                <Styled.DinnerInfoDescriptionNavItem>
                  kwasy tłuszczowe
                </Styled.DinnerInfoDescriptionNavItem>
                <Styled.DinnerInfoMacroWrapper>
                  <li>
                    nasycone kwasy tłuszczowe:{" "}
                    <b>{dinnerPortionId.total.saturatedFattyAcids || "-"}</b>
                  </li>
                  <li>
                    wielonienasycone kwasy tłuszczowe:{" "}
                    <b>
                      {dinnerPortionId.total.pollyunsaturatedFattyAcids || "-"}
                    </b>
                  </li>
                  <li>
                    wielonienasycone kwasy tłuszczowe omega-3:{" "}
                    <b>
                      {dinnerPortionId.total.pollyunsaturatedFattyAcidsOmega3 ||
                        "-"}
                    </b>
                  </li>
                  <li>
                    wielonienasycone kwasy tłuszczowe omega-6:{" "}
                    <b>
                      {dinnerPortionId.total.pollyunsaturatedFattyAcidsOmega6 ||
                        "-"}
                    </b>
                  </li>
                  <li>
                    jednonienasycone kwasy tłuszczowe:{" "}
                    <b>
                      {dinnerPortionId.total.monounsaturatedFattyAcids || "-"}
                    </b>
                  </li>
                </Styled.DinnerInfoMacroWrapper>
              </Styled.DinnerInfoDescriptionItem>

              <Styled.DinnerInfoDescriptionItem>
                <Styled.DinnerInfoDescriptionNavItem>
                  witaminy
                </Styled.DinnerInfoDescriptionNavItem>
                <Styled.DinnerInfoMacroWrapper>
                  <li>
                    witamina A [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminA?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B1 (tiamina) [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminB1?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B2 (ryboflawina) [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminB2?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B3 (niacyna) [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminPP?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B5 (kwas pantotenowy) [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminB5?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B6 (pirydoksyna) [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminB6?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B7 (biotyna) [mg]:{" "}
                    <b>{dinnerPortionId.total.biotin?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B9 (kwas foliowy) [mg]:{" "}
                    <b>{dinnerPortionId.total.folicAcid?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B12 (kobalamina) [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminB12?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina C [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminC?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina D [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminD?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina E [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminE?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina K [mg]:{" "}
                    <b>{dinnerPortionId.total.vitaminK?.amount || "-"}</b>
                  </li>
                </Styled.DinnerInfoMacroWrapper>
              </Styled.DinnerInfoDescriptionItem>
              <Styled.DinnerInfoDescriptionItem>
                <Styled.DinnerInfoDescriptionNavItem>
                  składniki mineralne
                </Styled.DinnerInfoDescriptionNavItem>
                <Styled.DinnerInfoMacroWrapper>
                  <li>
                    cynk [mg]:{" "}
                    <b>{dinnerPortionId.total.zinc?.amount || "-"}</b>
                  </li>
                  <li>
                    fosfor [mg]:{" "}
                    <b>{dinnerPortionId.total.phosphorus?.amount || "-"}</b>
                  </li>
                  <li>
                    magnez [mg]:{" "}
                    <b>{dinnerPortionId.total.magnesium?.amount || "-"}</b>
                  </li>
                  <li>
                    miedź [mg]:{" "}
                    <b>{dinnerPortionId.total.copper?.amount || "-"}</b>
                  </li>
                  <li>
                    potas [mg]:{" "}
                    <b>{dinnerPortionId.total.potassium?.amount || "-"}</b>
                  </li>
                  <li>
                    selen [mg]:{" "}
                    <b>{dinnerPortionId.total.selenium?.amount || "-"}</b>
                  </li>
                  <li>
                    sód [mg]:{" "}
                    <b>{dinnerPortionId.total.sodium?.amount || "-"}</b>
                  </li>
                  <li>
                    wapń [mg]:{" "}
                    <b>{dinnerPortionId.total.calcium?.amount || "-"}</b>
                  </li>
                  <li>
                    żelazo[mg]:{" "}
                    <b>{dinnerPortionId.total.iron?.amount || "-"}</b>
                  </li>
                </Styled.DinnerInfoMacroWrapper>
              </Styled.DinnerInfoDescriptionItem>
            </>
          )}

          <Styled.DinnerInfoDescriptionItem>
            <Styled.DinnerInfoDescriptionNavItem>
              produkty
            </Styled.DinnerInfoDescriptionNavItem>

            <Styled.DinnerItemsWrapper>
              {dinnerPortionId.dinnerProducts.map(
                ({ dinnerProductId, portion, total }, index) => (
                  <Styled.FieldWrapper key={dinnerProductId._id}>
                    <Styled.FieldHeadWrapper>
                      <Styled.FieldImageWrapper>
                        <img className="backgroundImg" src={LogoBackground} />

                        <img
                          className="productImg"
                          src={
                            dinnerProductId.productId.image?.imageURL || NoImage
                          }
                        />
                      </Styled.FieldImageWrapper>
                      <h2>{dinnerProductId.productId.name}</h2>
                    </Styled.FieldHeadWrapper>
                    <Styled.FieldItemsWrapper>
                      <Styled.ProductContentItemItem>
                        <h2>wybrana porcja: </h2>
                        <p>{portion} g</p>
                      </Styled.ProductContentItemItem>

                      <Styled.DinnerInfoDescriptionItem>
                        <Styled.DinnerInfoDescriptionNavItem>
                          makroskładniki
                        </Styled.DinnerInfoDescriptionNavItem>
                        <Styled.DinnerInfoMacroWrapper>
                          <li>
                            kcal: <b>{total.kcal}</b>
                          </li>
                          <li>
                            B (g): <b>{total.protein.gram}</b>
                          </li>
                          <li>
                            T (g): <b>{total.fat.gram}</b>
                          </li>
                          <li>
                            W (g): <b>{total.carbohydrates.gram}</b>
                          </li>
                          <li>
                            Wp (g): <b>{total.digestableCarbohydrates.gram}</b>
                          </li>
                          <li>
                            Bł (g): <b>{total.fiber.gram}</b>
                          </li>
                        </Styled.DinnerInfoMacroWrapper>
                      </Styled.DinnerInfoDescriptionItem>
                    </Styled.FieldItemsWrapper>
                  </Styled.FieldWrapper>
                )
              )}
            </Styled.DinnerItemsWrapper>
          </Styled.DinnerInfoDescriptionItem>
        </Styled.DinnerInfoDescriptionWrapper>
      </Styled.DinnerInfoWrapper>
    </Styled.ModalContentWrapper>
  );
};

export default InfoModalContent;

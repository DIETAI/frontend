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

const InfoModalContent = ({
  dietDinner,
  closeModal,
}: {
  dietDinner: IDietDinnerQueryData;
  closeModal: () => void;
}) => {
  const [openAllNutrients, setOpenAllNutrients] = useState(false);
  const handleOpenAllNutrients = () => {
    setOpenAllNutrients(!openAllNutrients);
  };

  const { dinnerPortion } = dietDinner;
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
            src={dinnerPortion.dinner.imageObj?.imageURL || NoImage}
          />
        </Styled.DinnerInfoImageWrapper>
        <Styled.DinnerInfoDescriptionWrapper>
          <h2>{dinnerPortion.dinner.name}</h2>

          {dinnerPortion.dinner.recipe && (
            <Styled.DinnerInfoDescriptionItem>
              <Styled.DinnerInfoDescriptionNavItem>
                przepis
              </Styled.DinnerInfoDescriptionNavItem>
              <p>{dinnerPortion.dinner.recipe}</p>
            </Styled.DinnerInfoDescriptionItem>
          )}

          <Styled.DinnerInfoDescriptionItem>
            <Styled.DinnerInfoDescriptionNavItem>
              makroskładniki
            </Styled.DinnerInfoDescriptionNavItem>
            <Styled.DinnerInfoMacroWrapper>
              <li>
                kcal: <b>{dinnerPortion.total.kcal}</b>
              </li>
              <li>
                B (g): <b>{dinnerPortion.total.protein.gram}</b>
              </li>
              <li>
                T (g): <b>{dinnerPortion.total.fat.gram}</b>
              </li>
              <li>
                W (g): <b>{dinnerPortion.total.carbohydrates.gram}</b>
              </li>
              <li>
                Wp (g):{" "}
                <b>{dinnerPortion.total.digestableCarbohydrates.gram}</b>
              </li>
              <li>
                Bł (g): <b>{dinnerPortion.total.fiber.gram}</b>
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
                    <b>{dinnerPortion.total.saturatedFattyAcids || "-"}</b>
                  </li>
                  <li>
                    wielonienasycone kwasy tłuszczowe:{" "}
                    <b>
                      {dinnerPortion.total.pollyunsaturatedFattyAcids || "-"}
                    </b>
                  </li>
                  <li>
                    wielonienasycone kwasy tłuszczowe omega-3:{" "}
                    <b>
                      {dinnerPortion.total.pollyunsaturatedFattyAcidsOmega3 ||
                        "-"}
                    </b>
                  </li>
                  <li>
                    wielonienasycone kwasy tłuszczowe omega-6:{" "}
                    <b>
                      {dinnerPortion.total.pollyunsaturatedFattyAcidsOmega6 ||
                        "-"}
                    </b>
                  </li>
                  <li>
                    jednonienasycone kwasy tłuszczowe:{" "}
                    <b>
                      {dinnerPortion.total.monounsaturatedFattyAcids || "-"}
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
                    <b>{dinnerPortion.total.vitaminA?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B1 (tiamina) [mg]:{" "}
                    <b>{dinnerPortion.total.vitaminB1?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B2 (ryboflawina) [mg]:{" "}
                    <b>{dinnerPortion.total.vitaminB2?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B3 (niacyna) [mg]:{" "}
                    <b>{dinnerPortion.total.vitaminPP?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B5 (kwas pantotenowy) [mg]:{" "}
                    <b>{dinnerPortion.total.vitaminB5?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B6 (pirydoksyna) [mg]:{" "}
                    <b>{dinnerPortion.total.vitaminB6?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B7 (biotyna) [mg]:{" "}
                    <b>{dinnerPortion.total.biotin?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B9 (kwas foliowy) [mg]:{" "}
                    <b>{dinnerPortion.total.folicAcid?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina B12 (kobalamina) [mg]:{" "}
                    <b>{dinnerPortion.total.vitaminB12?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina C [mg]:{" "}
                    <b>{dinnerPortion.total.vitaminC?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina D [mg]:{" "}
                    <b>{dinnerPortion.total.vitaminD?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina E [mg]:{" "}
                    <b>{dinnerPortion.total.vitaminE?.amount || "-"}</b>
                  </li>
                  <li>
                    witamina K [mg]:{" "}
                    <b>{dinnerPortion.total.vitaminK?.amount || "-"}</b>
                  </li>
                </Styled.DinnerInfoMacroWrapper>
              </Styled.DinnerInfoDescriptionItem>
              <Styled.DinnerInfoDescriptionItem>
                <Styled.DinnerInfoDescriptionNavItem>
                  składniki mineralne
                </Styled.DinnerInfoDescriptionNavItem>
                <Styled.DinnerInfoMacroWrapper>
                  <li>
                    cynk [mg]: <b>{dinnerPortion.total.zinc?.amount || "-"}</b>
                  </li>
                  <li>
                    fosfor [mg]:{" "}
                    <b>{dinnerPortion.total.phosphorus?.amount || "-"}</b>
                  </li>
                  <li>
                    magnez [mg]:{" "}
                    <b>{dinnerPortion.total.magnesium?.amount || "-"}</b>
                  </li>
                  <li>
                    miedź [mg]:{" "}
                    <b>{dinnerPortion.total.copper?.amount || "-"}</b>
                  </li>
                  <li>
                    potas [mg]:{" "}
                    <b>{dinnerPortion.total.potassium?.amount || "-"}</b>
                  </li>
                  <li>
                    selen [mg]:{" "}
                    <b>{dinnerPortion.total.selenium?.amount || "-"}</b>
                  </li>
                  <li>
                    sód [mg]: <b>{dinnerPortion.total.sodium?.amount || "-"}</b>
                  </li>
                  <li>
                    wapń [mg]:{" "}
                    <b>{dinnerPortion.total.calcium?.amount || "-"}</b>
                  </li>
                  <li>
                    żelazo[mg]: <b>{dinnerPortion.total.iron?.amount || "-"}</b>
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
              {dinnerPortion.dinnerProducts.map(
                ({ dinnerProduct, portion, total }, index) => (
                  <Styled.FieldWrapper key={dinnerProduct._id}>
                    <Styled.FieldHeadWrapper>
                      <Styled.FieldImageWrapper>
                        <img className="backgroundImg" src={LogoBackground} />

                        <img
                          className="productImg"
                          src={dinnerProduct.product.imageURL || NoImage}
                        />
                      </Styled.FieldImageWrapper>
                      <h2>{dinnerProduct.product.name}</h2>
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

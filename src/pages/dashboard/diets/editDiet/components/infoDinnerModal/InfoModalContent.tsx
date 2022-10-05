import React from "react";
import { IDietDinnerQueryData } from "interfaces/diet/dietQuery.interfaces";

//styles
import * as Styled from "./InfoModalContent.styles";

//components
import Heading from "components/heading/Heading";
import Image from "components/form/images/image/Image";

//icons
import { FaUtensils } from "react-icons/fa";

const InfoModalContent = ({
  dietDinner,
  closeModal,
}: {
  dietDinner: IDietDinnerQueryData;
  closeModal: () => void;
}) => {
  const { dinnerPortion } = dietDinner;
  return (
    <Styled.ModalContentWrapper>
      <Heading
        icon={<FaUtensils />}
        title={dietDinner.dinnerPortion.dinner.name}
        // description={t("dinner.form.products.modal.description")}
      />
      <Styled.PortionWrapper>
        <Styled.PortionHeadingWrapper>
          <Styled.PortionHeading>
            <Styled.FieldNumberWrapper>
              <p>1</p>
            </Styled.FieldNumberWrapper>
            <h2>
              {dinnerPortion.type === "default" ? "domyślny" : "własny"} zestaw
            </h2>
          </Styled.PortionHeading>
        </Styled.PortionHeadingWrapper>
        <Styled.PortionTotalWrapper>
          <Styled.PortionTotalFeaturesWrapper>
            <Styled.PortionTotalFeature>
              Kcal: <b>{dinnerPortion.total.kcal}</b>
            </Styled.PortionTotalFeature>
            <Styled.PortionTotalFeature>
              B (g): <b>{dinnerPortion.total.protein.gram}</b>
            </Styled.PortionTotalFeature>
            <Styled.PortionTotalFeature>
              T (g): <b>{dinnerPortion.total.fat.gram}</b>
            </Styled.PortionTotalFeature>
            <Styled.PortionTotalFeature>
              W (g): <b>{dinnerPortion.total.carbohydrates.gram}</b>
            </Styled.PortionTotalFeature>
            <Styled.PortionTotalFeature>
              Wp (g): <b>{dinnerPortion.total.digestableCarbohydrates.gram}</b>
            </Styled.PortionTotalFeature>
            <Styled.PortionTotalFeature>
              Bł (g): <b>{dinnerPortion.total.fiber.gram}</b>
            </Styled.PortionTotalFeature>
          </Styled.PortionTotalFeaturesWrapper>
        </Styled.PortionTotalWrapper>
        <Styled.ProductsWrapper>
          {dinnerPortion.dinnerProducts.map((dinnerPortionProduct) => (
            <Styled.ProductWrapper key={dinnerPortionProduct.dinnerProductId}>
              <Styled.ProductMainWrapper>
                {dinnerPortionProduct.dinnerProduct.product.image && (
                  <div>
                    <Image
                      roundedDataGrid={true}
                      imageId={dinnerPortionProduct.dinnerProduct.product.image}
                    />
                  </div>
                )}

                <Styled.ProductContentWrapper>
                  <h3>{dinnerPortionProduct.dinnerProduct.product.name}</h3>

                  <Styled.ProductTotalFeaturesWrapper>
                    <Styled.ProductTotalFeature>
                      Kcal: <b>{dinnerPortionProduct.total.kcal}</b>
                    </Styled.ProductTotalFeature>
                    <Styled.ProductTotalFeature>
                      B (g): <b>{dinnerPortionProduct.total.protein.gram}</b>
                    </Styled.ProductTotalFeature>
                    <Styled.ProductTotalFeature>
                      T (g): <b>{dinnerPortionProduct.total.fat.gram}</b>
                    </Styled.ProductTotalFeature>
                    <Styled.ProductTotalFeature>
                      W (g):{" "}
                      <b>{dinnerPortionProduct.total.carbohydrates.gram}</b>
                    </Styled.ProductTotalFeature>
                    <Styled.ProductTotalFeature>
                      Wp (g):{" "}
                      <b>
                        {
                          dinnerPortionProduct.total.digestableCarbohydrates
                            .gram
                        }
                      </b>
                    </Styled.ProductTotalFeature>
                    <Styled.ProductTotalFeature>
                      Bł (g): <b>{dinnerPortionProduct.total.fiber.gram}</b>
                    </Styled.ProductTotalFeature>
                  </Styled.ProductTotalFeaturesWrapper>
                </Styled.ProductContentWrapper>
              </Styled.ProductMainWrapper>

              <Styled.ProductPortionItem>
                {dinnerPortionProduct.portion} g
              </Styled.ProductPortionItem>
            </Styled.ProductWrapper>
          ))}
        </Styled.ProductsWrapper>
      </Styled.PortionWrapper>
    </Styled.ModalContentWrapper>
  );
};

export default InfoModalContent;

import React from "react";
import { useFormContext } from "react-hook-form";
import { getDinnerPortionsQuery } from "services/getDinnerPortions";

//styles
import * as Styled from "../../DinnerPortion.styles";

//components
import Image from "components/form/images/image/Image";

const AddedPortions = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();
  const selectedDinnerId = watch("dinnerId") as string;
  const selectedDinnerPortionId = watch("dinnerPortionId") as string;

  const {
    dinnerPortionsQuery,
    dinnerPortionsErrorQuery,
    dinnerPortionsLoadingQuery,
  } = getDinnerPortionsQuery(selectedDinnerId);

  const selectDinnerPortion = (dinnerPortionId: string) => {
    setValue("dinnerPortionId", dinnerPortionId);
    trigger();
  };

  return (
    <div>
      {dinnerPortionsQuery?.map((dinnerPortion, dinnerPortionIndex) => (
        <Styled.PortionWrapper
          key={dinnerPortion._id}
          onClick={() => selectDinnerPortion(dinnerPortion._id)}
          active={selectedDinnerPortionId === dinnerPortion._id}
        >
          <Styled.PortionHeadingWrapper>
            <Styled.PortionHeading>
              <Styled.FieldNumberWrapper>
                <p>{dinnerPortionIndex + 1}</p>
              </Styled.FieldNumberWrapper>
              <h2>
                {dinnerPortion.type === "default" ? "domyślny" : "własny"}{" "}
                zestaw
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
                Wp (g):{" "}
                <b>{dinnerPortion.total.digestableCarbohydrates.gram}</b>
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
                        imageId={
                          dinnerPortionProduct.dinnerProduct.product.image
                        }
                      />
                    </div>
                  )}

                  <Styled.ProductContentWrapper>
                    <h3>{dinnerPortionProduct.dinnerProduct.product.name}</h3>

                    {/* <Styled.ProductTotalFeaturesWrapper>
                        <Styled.ProductTotalFeature>
                          Kcal: <b>{dinnerPortionProduct.total.kcal}</b>
                        </Styled.ProductTotalFeature>
                        <Styled.ProductTotalFeature>
                          B (g):{" "}
                          <b>{dinnerPortionProduct.total.protein.gram}</b>
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
                      </Styled.ProductTotalFeaturesWrapper> */}
                  </Styled.ProductContentWrapper>
                </Styled.ProductMainWrapper>

                <Styled.ProductPortionItem>
                  {dinnerPortionProduct.portion} g
                </Styled.ProductPortionItem>
              </Styled.ProductWrapper>
            ))}
          </Styled.ProductsWrapper>
        </Styled.PortionWrapper>
      ))}
    </div>
  );
};

export default AddedPortions;

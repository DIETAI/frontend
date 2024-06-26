import React, { useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import axios from "utils/api";
import { mutate } from "swr";
import {
  getDinnerPortions,
  getDinnerPortionsQuery,
} from "services/getDinnerPortions";

//components
import Modal from "components/modal/Modal";
import AddDinnerPortionModalContent from "./addDinnerPortionModal/AddDinnerPortionModal";
import DeleteDinnerPortionModalContent from "./deletePortionModal/DeleteDinnerPortionModal";
import DashedSelect from "components/form/dashedSelect/DashedSelect";

//styles
import * as Styled from "./Portions.styles";

//icons
import { FaEdit, FaTrash, FaPlus, FaInfoCircle } from "icons/icons";
import Image from "components/form/images/image/Image";

const Portions = () => {
  const [dinnerPortionModalOpen, setDinnerPortionModalOpen] = useState(false);
  const [deleteDinnerPortionModalOpen, setDeleteDinnerPortionModalOpen] =
    useState({
      open: false,
      dinnerPortionId: "",
    });

  const { t } = useTranslation();
  const { dinnerId } = useParams();
  const { dinnerPortions, dinnerPortionsLoading, dinnerPortionsError } =
    getDinnerPortions(dinnerId as string);

  const deletePortion = async (portionId: string) => {
    try {
      await axios.delete(`/api/v1/dinnerPortions/${portionId}`, {
        withCredentials: true,
      });
      await mutate(`/api/v1/dinnerPortions/dinner/${dinnerId}/query`);

      console.log("usunięto porcje z posiłku");
    } catch (e) {
      console.log(e);
    }
  };

  if (dinnerPortionsLoading) return <div>loading...</div>;
  if (dinnerPortionsError) return <div>error...</div>;

  return (
    <Styled.PortionsWrapper>
      {dinnerPortions &&
        dinnerPortions.length > 0 &&
        dinnerPortions.map((dinnerPortion, dinnerPortionIndex) => (
          <Styled.PortionWrapper key={dinnerPortion._id}>
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

              {dinnerPortion.type === "custom" && (
                <Styled.IconOptionsWrapper>
                  {/* <Styled.IconButtonWrapper
                    iconType="info"
                    type="button"
                    onClick={() => console.log("show portion macro")}
                  >
                    <FaInfoCircle />
                  </Styled.IconButtonWrapper> */}
                  {/* <Styled.IconButtonWrapper
                    iconType="edit"
                    type="button"
                    onClick={() => deletePortion(dinnerPortion._id)}
                  >
                    <FaEdit />
                  </Styled.IconButtonWrapper> */}
                  <Styled.IconButtonWrapper
                    iconType="delete"
                    type="button"
                    onClick={() =>
                      setDeleteDinnerPortionModalOpen({
                        open: true,
                        dinnerPortionId: dinnerPortion._id,
                      })
                    }
                  >
                    <FaTrash />
                  </Styled.IconButtonWrapper>
                </Styled.IconOptionsWrapper>
              )}
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
                <Styled.ProductWrapper
                  key={dinnerPortionProduct.dinnerProductId._id}
                >
                  <Styled.ProductMainWrapper>
                    {dinnerPortionProduct.dinnerProductId.productId.image && (
                      <div>
                        <Image
                          roundedDataGrid={true}
                          imageId={
                            dinnerPortionProduct.dinnerProductId.productId.image
                              ._id
                          }
                        />
                      </div>
                    )}

                    <Styled.ProductContentWrapper>
                      <h3>
                        {dinnerPortionProduct.dinnerProductId.productId.name}
                      </h3>

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

      <DashedSelect
        icon={<FaPlus />}
        // text={t("dinner.form.products.addProduct")}
        text="dodaj zestaw porcji"
        onClick={() => setDinnerPortionModalOpen(true)}
        fullWidth
      />
      <Modal
        open={dinnerPortionModalOpen}
        onClose={() => setDinnerPortionModalOpen(false)}
      >
        <AddDinnerPortionModalContent
          closeModal={() => setDinnerPortionModalOpen(false)}
        />
      </Modal>
      <Modal
        open={deleteDinnerPortionModalOpen.open}
        onClose={() =>
          setDeleteDinnerPortionModalOpen({ open: false, dinnerPortionId: "" })
        }
      >
        <DeleteDinnerPortionModalContent
          dinnerPortionId={deleteDinnerPortionModalOpen.dinnerPortionId}
          closeModal={() =>
            setDeleteDinnerPortionModalOpen({
              open: false,
              dinnerPortionId: "",
            })
          }
        />
      </Modal>
    </Styled.PortionsWrapper>
  );
};

export default Portions;

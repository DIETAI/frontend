import React, { useState } from "react";

import { IDietMealQueryData } from "interfaces/diet/dietQuery.interfaces";

//utils
import { procentClasses } from "pages/dashboard/diets/editDiet/utils/procentClasses";

//icons
import {
  FaEdit,
  FaTrash,
  FaInfoCircle,
  FaPlus,
  FaEllipsisV,
} from "icons/icons";

//styles
import * as Styled from "./Meal.styles";

//components
import Modal from "components/modal/Modal";
import AddDinnerModalContent from "../../../addDinnerModal/AddDinnerModal";
import Image from "components/form/images/image/Image";
import DeleteDinnerModalContent from "../../../deleteDinnerModal/DeleteModalContent";
import EditDinnerModalContent from "../../../editDinnerModal/EditDinnerModal";
import InfoDinnerModalContent from "../../../infoDinnerModal/InfoModalContent";

//services
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";
import { AnimatePresence } from "framer-motion";
import IconModal from "components/iconModal/IconModal";
import { IDietDinnerQueryData } from "interfaces/diet/dietQuery.interfaces";

const Meal = ({
  meal,
  establishment,
}: {
  meal: IDietMealQueryData;
  establishment: IDietEstablishmentData;
}) => {
  const [addDinnerModalOpen, setDinnerModalOpen] = useState(false);

  const mealEstablishment = establishment.meals.find(
    ({ _id }) => _id === meal.establishmentMealId
  );

  return (
    <>
      <Styled.MealWrapper>
        <Styled.Meal>
          <Styled.MealNameWrapper>
            <Styled.MealNameHeading>
              {meal.name}
              <IconModal icon={<FaEllipsisV />}>
                procent: {mealEstablishment?.procent} %
              </IconModal>
            </Styled.MealNameHeading>

            <Styled.AddDinnerButtonWrapper
              onClick={() => setDinnerModalOpen(true)}
            >
              <FaPlus />
              dodaj pozycję
            </Styled.AddDinnerButtonWrapper>
          </Styled.MealNameWrapper>
          <Styled.MealDinnersWrapper>
            {meal.dinners.length < 1 && (
              <Styled.EmptyMealWrapper>
                <Styled.EmptyMealContent
                  onClick={() => setDinnerModalOpen(true)}
                >
                  <FaPlus />
                </Styled.EmptyMealContent>
              </Styled.EmptyMealWrapper>
            )}
            {meal.dinners.length > 0 &&
              meal.dinners.map((dinner, index) => (
                <>
                  <Styled.DinnerWrapper key={dinner._id}>
                    <DinnerNameWrapper dinner={dinner} />
                    <Styled.DinnerProductsWrapper>
                      {dinner.dinnerPortion.dinnerProducts.length > 0 &&
                        dinner.dinnerPortion.dinnerProducts.map(
                          ({
                            dinnerProduct,
                            dinnerProductId,
                            portion,
                            total,
                          }) => (
                            <Styled.DinnerProduct key={dinnerProductId}>
                              <Styled.DinnerProductItem>
                                <span>
                                  {dinnerProduct.product.image && (
                                    <div>
                                      <Image
                                        roundedDataGrid={true}
                                        imageId={dinnerProduct.product.image}
                                      />
                                    </div>
                                  )}

                                  <p>{dinnerProduct.product.name}</p>
                                </span>
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem>
                                {portion}
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem>
                                {total.protein.gram}
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem>
                                {total.fat.gram}
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem>
                                {total.carbohydrates.gram}
                              </Styled.DinnerProductItem>
                              <Styled.DinnerProductItem>
                                {total.kcal}
                              </Styled.DinnerProductItem>
                            </Styled.DinnerProduct>
                          )
                        )}
                      {meal.dinners.length > 1 && (
                        <Styled.SumWrapper>
                          <Styled.SumHeadingWrapper variant="dinnerSum">
                            <b>Razem:</b>
                          </Styled.SumHeadingWrapper>
                          <Styled.SumItem>
                            <b>-</b>
                          </Styled.SumItem>
                          <Styled.SumItem>
                            <b>{dinner.dinnerPortion.total.protein.gram}</b>
                          </Styled.SumItem>
                          <Styled.SumItem>
                            <b>{dinner.dinnerPortion.total.fat.gram}</b>
                          </Styled.SumItem>
                          <Styled.SumItem>
                            <b>
                              {dinner.dinnerPortion.total.carbohydrates.gram}
                            </b>
                          </Styled.SumItem>
                          <Styled.SumItem>
                            <b>{dinner.dinnerPortion.total.kcal}</b>
                          </Styled.SumItem>
                        </Styled.SumWrapper>
                      )}
                    </Styled.DinnerProductsWrapper>
                  </Styled.DinnerWrapper>
                </>
              ))}

            {meal.dinners.length > 0 && (
              <Styled.SumWrapper>
                <Styled.SumHeadingWrapper variant="mealSum">
                  <b>Razem:</b>
                </Styled.SumHeadingWrapper>
                <Styled.SumItem>
                  <b>-</b>
                </Styled.SumItem>
                <Styled.SumItem>
                  <b>{meal.total.protein.gram}</b>
                </Styled.SumItem>
                <Styled.SumItem>
                  <b>{meal.total.fat.gram}</b>
                </Styled.SumItem>
                <Styled.SumItem>
                  <b>{meal.total.carbohydrates.gram}</b>
                </Styled.SumItem>
                <SumModal
                  totalValue={meal.total.kcal || 0}
                  establishmentValue={mealEstablishment?.kcal || 0}
                />
              </Styled.SumWrapper>
            )}
          </Styled.MealDinnersWrapper>
        </Styled.Meal>
      </Styled.MealWrapper>

      <Modal
        onClose={() => setDinnerModalOpen(false)}
        open={addDinnerModalOpen}
      >
        <AddDinnerModalContent
          meal={meal}
          closeModal={() => setDinnerModalOpen(false)}
        />
      </Modal>
    </>
  );
};

const DinnerNameWrapper = ({ dinner }: { dinner: IDietDinnerQueryData }) => {
  const [openDeleteDinnerModal, setOpenDeleteDinnerModal] = useState(false);
  const [openInfoDinnerModal, setOpenInfoDinnerModal] = useState(false);
  const [openEditDinnerModal, setOpenEditDinnerModal] = useState(false);
  const [openDinnerOptions, setOpenDinnerOptions] = useState(false);

  return (
    <>
      <Styled.DinnerNameWrapper
        onMouseEnter={() => setOpenDinnerOptions(true)}
        onMouseLeave={() => setOpenDinnerOptions(false)}
      >
        <span>
          {dinner.dinnerPortion.dinner.image && (
            <div>
              <Image
                roundedDataGrid={true}
                imageId={dinner.dinnerPortion.dinner.image}
              />
            </div>
          )}
          {dinner.dinnerPortion.dinner.name}
        </span>
        <AnimatePresence>
          {openDinnerOptions && (
            <Styled.DietDinnerOptionsWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Styled.OptionWrapper
                optionType="info"
                onClick={() => setOpenInfoDinnerModal(true)}
              >
                <FaInfoCircle />
              </Styled.OptionWrapper>
              <Styled.OptionWrapper
                optionType="edit"
                onClick={() => setOpenEditDinnerModal(true)}
              >
                <FaEdit />
              </Styled.OptionWrapper>
              <Styled.OptionWrapper
                optionType="delete"
                onClick={() => setOpenDeleteDinnerModal(true)}
              >
                <FaTrash />
              </Styled.OptionWrapper>
            </Styled.DietDinnerOptionsWrapper>
          )}
        </AnimatePresence>
      </Styled.DinnerNameWrapper>
      <Modal
        open={openDeleteDinnerModal}
        onClose={() => setOpenDeleteDinnerModal(false)}
      >
        <DeleteDinnerModalContent
          dietDinner={dinner}
          closeModal={() => setOpenDeleteDinnerModal(false)}
        />
      </Modal>
      <Modal
        open={openInfoDinnerModal}
        onClose={() => setOpenInfoDinnerModal(false)}
      >
        <InfoDinnerModalContent
          dietDinner={dinner}
          closeModal={() => setOpenInfoDinnerModal(false)}
        />
      </Modal>
      <Modal
        onClose={() => setOpenEditDinnerModal(false)}
        open={openEditDinnerModal}
      >
        <EditDinnerModalContent
          dietDinner={dinner}
          closeModal={() => setOpenEditDinnerModal(false)}
        />
      </Modal>
    </>
  );
};

const SumModal = ({
  totalValue,
  establishmentValue,
}: {
  totalValue: number;
  establishmentValue: number;
}) => {
  const [sumModalOpen, setSumModalOpen] = useState(false);
  return (
    <Styled.SumItem
      onMouseEnter={() => setSumModalOpen(true)}
      onMouseLeave={() => setSumModalOpen(false)}
      variant={procentClasses({
        establishment: establishmentValue,
        total: totalValue,
      })}
    >
      <b>{totalValue}</b>
      <AnimatePresence>
        {sumModalOpen && (
          <Styled.SumItemModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>
              <b>{totalValue}</b> / {establishmentValue}
            </p>
          </Styled.SumItemModal>
        )}
      </AnimatePresence>
    </Styled.SumItem>
  );
};

export const procentCount = (dietMacro: number, establishmentMacro: number) => {
  const missingMacro = establishmentMacro - dietMacro;
  const procent = (Math.abs(missingMacro) * 100) / establishmentMacro;
  return roundMacro(procent);
};

const roundMacro = (macro: number) => {
  return Math.round(macro * 1e2) / 1e2;
};

export default Meal;

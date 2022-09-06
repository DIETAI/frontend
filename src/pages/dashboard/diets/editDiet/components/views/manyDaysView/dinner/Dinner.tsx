import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

//interfaces
import { IDietDinnerQueryData } from "interfaces/diet/dietQuery.interfaces";

//styles
import * as Styled from "./Dinner.styles";

//components
import Image from "components/form/images/image/Image";
import DeleteDinnerModalContent from "./deleteModal/DeleteModalContent";

//icons
import { FaEdit, FaTrash, FaInfoCircle } from "icons/icons";
import Modal from "components/modal/Modal";

interface IDietDinner {
  dietDinner: IDietDinnerQueryData;
}

const Dinner = ({ dietDinner }: IDietDinner) => {
  const [openDeleteDinnerModal, setOpenDeleteDinnerModal] = useState(false);
  const [openDinnerOptions, setOpenDinnerOptions] = useState(false);
  const { image } = dietDinner.dinnerPortion.dinner;

  return (
    <>
      <Styled.DietDinnerWrapper
        onMouseEnter={() => setOpenDinnerOptions(true)}
        onMouseLeave={() => setOpenDinnerOptions(false)}
      >
        <Styled.DietDinner>
          {image && (
            <div>
              <Image roundedDataGrid={true} imageId={image} />
            </div>
          )}
          <h4>{dietDinner.dinnerPortion.dinner.name}</h4>
        </Styled.DietDinner>
        <Styled.DietDinnerTotalWrapper>
          <p>
            B: <b>{dietDinner.dinnerPortion.total.protein.gram}</b>
          </p>
          <p>
            T: <b>{dietDinner.dinnerPortion.total.fat.gram}</b>
          </p>
          <p>
            W: <b>{dietDinner.dinnerPortion.total.carbohydrates.gram}</b>
          </p>
          <p>
            kcal: <b>{dietDinner.dinnerPortion.total.kcal}</b>
          </p>
        </Styled.DietDinnerTotalWrapper>

        {/* <div>
        produkty:{" "}
        {dietDinner.dinnerPortion.dinnerProducts.map((dinnerPortionProduct) => (
          <div key={dinnerPortionProduct.dinnerProductId}>
            <p>produkt: {dinnerPortionProduct.dinnerProductId}</p>{" "}
            <p>ilość: {dinnerPortionProduct.portion} g</p>
          </div>
        ))}{" "}
      </div> */}
        <AnimatePresence>
          {openDinnerOptions && (
            <Styled.DietDinnerOptionsWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Styled.OptionWrapper optionType="info">
                <FaInfoCircle />
              </Styled.OptionWrapper>
              <Styled.OptionWrapper optionType="edit">
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
      </Styled.DietDinnerWrapper>
      <Modal
        open={openDeleteDinnerModal}
        onClose={() => setOpenDeleteDinnerModal(false)}
      >
        <DeleteDinnerModalContent
          dietDinner={dietDinner}
          closeModal={() => setOpenDeleteDinnerModal(false)}
        />
      </Modal>
    </>
  );
};

export default Dinner;

import React, { useState } from "react";

//animations
import { AnimatePresence } from "framer-motion";

//drag
import { DraggableProvided } from "react-beautiful-dnd";

//interfaces
import { IDietDinnerQueryData } from "interfaces/diet/dietQuery.interfaces";

//styles
import * as Styled from "./Dinner.styles";

//components
import Image from "components/form/images/image/Image";
import DeleteDinnerModalContent from "./deleteModal/DeleteModalContent";
import InfoModalContent from "../../../infoDinnerModal/InfoDinnerModalContent";
import EditDinnerModalContent from "../../../editDinnerModal/EditDinnerModal";
import Modal from "components/modal/Modal";

//icons
import { FaEdit, FaTrash, FaInfoCircle, FaLongArrowAltUp } from "icons/icons";
import { IDietDinnerPopulateData } from "interfaces/diet/dietPopulate.interfaces";

interface IDietDinner {
  dietDinner: IDietDinnerPopulateData;
  provided: DraggableProvided;
}

const Dinner = ({ dietDinner, provided }: IDietDinner) => {
  const [openDeleteDinnerModal, setOpenDeleteDinnerModal] = useState(false);
  const [openInfoDinnerModal, setOpenInfoDinnerModal] = useState(false);
  const [openEditDinnerModal, setOpenEditDinnerModal] = useState(false);
  const [openDinnerOptions, setOpenDinnerOptions] = useState(false);
  const { image } = dietDinner.dinnerPortionId.dinnerId;

  return (
    <>
      <Styled.DietDinnerWrapper
        onMouseEnter={() => setOpenDinnerOptions(true)}
        onMouseLeave={() => setOpenDinnerOptions(false)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <Styled.DietDinner>
          {image && (
            <div>
              <Image roundedDataGrid={true} imageId={image._id} />
            </div>
          )}

          <h4>{dietDinner.dinnerPortionId.dinnerId.name}</h4>
        </Styled.DietDinner>
        <Styled.DietDinnerTotalWrapper>
          <p>
            B: <b>{dietDinner.dinnerPortionId.total.protein.gram}</b>
          </p>
          <p>
            T: <b>{dietDinner.dinnerPortionId.total.fat.gram}</b>
          </p>
          <p>
            W: <b>{dietDinner.dinnerPortionId.total.carbohydrates.gram}</b>
          </p>
          <p>
            kcal: <b>{dietDinner.dinnerPortionId.total.kcal}</b>
          </p>
        </Styled.DietDinnerTotalWrapper>

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
      <Modal
        open={openInfoDinnerModal}
        onClose={() => setOpenInfoDinnerModal(false)}
      >
        <InfoModalContent
          dietDinner={dietDinner}
          closeModal={() => setOpenInfoDinnerModal(false)}
        />
      </Modal>
      <Modal
        onClose={() => setOpenEditDinnerModal(false)}
        open={openEditDinnerModal}
      >
        <EditDinnerModalContent
          dietDinner={dietDinner}
          closeModal={() => setOpenEditDinnerModal(false)}
        />
      </Modal>
    </>
  );
};

export default Dinner;

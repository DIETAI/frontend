import React, { useState } from "react";
import { useParams } from "react-router";
import { getDiet } from "services/getDiets";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "utils/api";
import { useAlert } from "layout/dashboard/context/alert.context";

//components
import Button from "components/form/button/Button";
import Modal from "components/modal/Modal";
import DeleteModalContent from "pages/dashboard/components/deleteModal/DeleteModal";

const Diet = () => {
  const { handleAlert } = useAlert();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { dietId } = useParams();
  console.log({ dietId });

  if (!dietId) return <div>not found</div>;
  const { diet, dietError, dietLoading } = getDiet(dietId);

  if (dietLoading) return <div>diet loading...</div>;
  if (dietError || !diet) return <div>diet error</div>;

  const deleteDiet = async () => {
    //open delete item popup
    try {
      await axios.delete(`/api/v1/diets/${diet._id}`, {
        withCredentials: true,
      });

      console.log("usunięto dietę");
      handleAlert("success", "Usunięto dietę");
      navigate("/dashboard/diets");
    } catch (e) {
      console.log("nie udało się usunąć diety");
      handleAlert("error", "Usuwanie diety nie powiodło się");
    }
  };
  return (
    <div>
      <Button
        fullWidth
        variant="data-delete-primary"
        onClick={() => setOpenDeleteModal(true)}
      >
        usuń
      </Button>
      <p>Diet : {diet.name}</p>
      <Link to={`/dashboard/diets/edit/${dietId}`}>edytuj</Link>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DeleteModalContent
          deleteItemName={diet.name}
          deleteAction={deleteDiet}
        />
      </Modal>
    </div>
  );
};

export default Diet;

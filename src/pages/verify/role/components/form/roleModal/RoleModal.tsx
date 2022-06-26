import React, { useState } from "react";

//interfaces
import { IRoleModalProps } from "./RoleModal.interfaces";

//styles
import * as Styles from "./RoleModal.styles";

//form
import { useFormContext } from "react-hook-form";

//icons
import { FaUserCog } from "icons/icons";

//components
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";

//translation
import { useTranslation } from "react-i18next";

//images
import ClientImg from "assets/role/client.png";
import PersonalImg from "assets/role/personal.png";
import DieticianImg from "assets/role/dietician.png";

export const roles = [
  {
    id: "dasdase12efcvfdsg",
    name: "Osobiste",
    type: "personal",
    status: "available",
    img: PersonalImg,
    order: 1,
    shortDescription:
      "Generuj jadłospisy dla siebie i dla swojej grupy. Dodawaj produkty, posiłki, raporty, modyfikuj codzienną dietę",
  },
  {
    id: "jhdasdase12efasddsg",
    name: "Klient dietetyka",
    type: "client",
    status: "soon",
    img: ClientImg,
    order: 2,
    shortDescription: "Znajdź dietetyka, otrzymuj ankiety, raporty, jadłospisy",
  },
  {
    id: "kidasdase12efcvfdsg",
    name: "Dietetyk",
    type: "dietetic",
    img: DieticianImg,
    order: 3,
    status: "soon",
    shortDescription:
      "Dodawaj pacjentów, generuj jadłospisy. Dodawaj produkty, posiłki, ankiety. Stwórz swoją publiczną wizytówkę, aby dotrzeć do klientów",
  },
];

// i18next.addResourceBundle("en", "namespace1", {
//   key: "hello from namespace 1",
// });

const RoleModal = ({ closeModal }: IRoleModalProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const currentRole = getValues("roleId");
  const [selectedRoleId, setSelectedRoleId] = useState(currentRole);

  const addRole = () => {
    setValue("roleId", selectedRoleId);
    closeModal();
  };

  return (
    <Styles.RoleModalContainer>
      <Heading
        icon={<FaUserCog />}
        title={t("verify.role.modal.title")}
        description={t("verify.role.modal.description")}
      />

      <Styles.RolesWrapper>
        {roles.map((role) => (
          <Styles.RoleItemWrapper
            key={role.id}
            onClick={() => setSelectedRoleId(role.id)}
            selected={selectedRoleId === role.id}
          >
            {selectedRoleId === role.id && <span>wybrane</span>}
            <img src={role.img} /> <h2>{role.name}</h2>{" "}
            <p>{role.shortDescription}</p>{" "}
          </Styles.RoleItemWrapper>
        ))}
      </Styles.RolesWrapper>
      <Styles.ButtonWrapper>
        <Button
          onClick={addRole}
          variant={!selectedRoleId ? "disabled" : "primary"}
        >
          Dodaj rolę
        </Button>
      </Styles.ButtonWrapper>
    </Styles.RoleModalContainer>
  );
};

export default RoleModal;

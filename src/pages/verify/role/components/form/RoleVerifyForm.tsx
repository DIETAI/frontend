import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useForm, FormProvider, FieldValues } from "react-hook-form";

//schema
import { role_verify_schema } from "./RoleVerifyForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";

//interfaces
import { IRoleVerifySchema } from "./RoleVerifyForm.schema";

//components
import Input from "components/form/input/Input";
import Button from "components/form/button/Button";
import ReactLoading from "react-loading";
import DashedSelect from "components/form/dashedSelect/DashedSelect";

//styles
import * as Styled from "./RoleVerifyForm.styles";

//translation
import { useTranslation } from "react-i18next";

import { FaUserCog } from "icons/icons";
import Modal from "components/modal/Modal";
import RoleModalContent from "./roleModal/RoleModal";

//roles
import { roles } from "./roleModal/RoleModal";

const defaultValues = role_verify_schema.cast({});

const getData = (data: FieldValues) => {
  return new Promise<FieldValues>((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

const Form = () => {
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(role_verify_schema),
    shouldUnregister: false,
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    trigger,
    reset,
    setFocus,
    getValues,
    watch,
  } = methods;

  const roleId = getValues("roleId");
  const selectedRole = roles.find((role) => role.id === roleId);

  const onSubmit = async (data: IRoleVerifySchema) => {
    await getData(data);
    reset();
    console.log(data);
  };

  const openAddRolePortal = () => {
    setRoleModalOpen(true);
  };

  return (
    <FormProvider {...methods}>
      <Styled.FormContainer>
        <Styled.FormHeading>
          <h1>{t("verify.role.heading")}</h1>
          <p>{t("verify.role.description")}</p>
        </Styled.FormHeading>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Input
            name="phone"
            label={t("verify.role.form.phone")}
            type="text"
            fullWidth
          />
          <Styled.SelectedRoleWrapper>
            {selectedRole && (
              <Styled.SelectedRole>
                <img src={selectedRole.img} /> <h3>{selectedRole.name}</h3>
              </Styled.SelectedRole>
            )}
            <DashedSelect
              fullWidth
              icon={<FaUserCog />}
              text={
                roleId
                  ? t("verify.role.form.changeRole")
                  : t("verify.role.form.selectRole")
              }
              onClick={openAddRolePortal}
            />
          </Styled.SelectedRoleWrapper>

          <Button
            fullWidth
            type="submit"
            variant={isSubmitting || !isValid ? "disabled" : "primary"}
          >
            {isSubmitting ? (
              <ReactLoading type="spin" width={20} height={20} />
            ) : (
              t("verify.role.verifyButtonText")
            )}
          </Button>
        </form>
      </Styled.FormContainer>

      <Modal onClose={() => setRoleModalOpen(false)} open={roleModalOpen}>
        <RoleModalContent closeModal={() => setRoleModalOpen(false)} />
      </Modal>
    </FormProvider>
  );
};

export default Form;

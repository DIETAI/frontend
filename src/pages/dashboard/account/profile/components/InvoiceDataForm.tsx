import React from "react";

//styles
import * as Styled from "../styles/Form.styles";

//form
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//schema
import { invoiceDataSchema } from "../schema/invoiceData.schema";

//components
import Input from "components/form/textarea/Textarea";
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";

//icons
import { FaFileInvoice } from "icons/icons";

const defaultValues = invoiceDataSchema.cast({});

const InvoiceDataForm = () => {
  const methods = useForm({
    resolver: yupResolver(invoiceDataSchema),
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

  const onInvoiceDataFormSubmit = async (data: FieldValues) => {
    //   return new Promise<FieldValues>((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(data);
    //     }, 300);
    //   });

    console.log("data");
  };

  return (
    <Styled.FormWrapper>
      <Heading icon={<FaFileInvoice />} title="Dane do faktury" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onInvoiceDataFormSubmit)}>
          <Input label="nazwa firmy" name="companyName" fullWidth />
          <Input label="NIP" name="nip" fullWidth />
          <Input label="miasto" name="city" fullWidth />
          <Input label="ulica i numer" name="streetNumber" fullWidth />
          <Button variant="disabled" fullWidth>
            wyślij
          </Button>
        </form>
      </FormProvider>
    </Styled.FormWrapper>
  );
};

export default InvoiceDataForm;

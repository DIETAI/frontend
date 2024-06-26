import React, { useEffect } from "react";
import axios from "utils/api";
//context
import { useAlert } from "layout/dashboard/context/alert.context";

//styles
import * as Styled from "../styles/Form.styles";

//form
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//schema
import { invoiceDataSchema, IInvoiceData } from "../schema/invoiceData.schema";

//components
import Input from "components/form/textarea/Textarea";
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";

//icons
import { FaFileInvoice } from "icons/icons";
import { getInvoice } from "services/getInvoices";

const defaultValues = invoiceDataSchema.cast({});

const InvoiceDataForm = () => {
  const { handleAlert } = useAlert();

  const methods = useForm({
    resolver: yupResolver(invoiceDataSchema),
    shouldUnregister: false,
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    setValue,
  } = methods;

  const { invoice, invoiceLoading } = getInvoice();

  useEffect(() => {
    if (invoice) {
      const invoiceDefaultValues = {
        companyName: invoice.companyName,
        taxpayerIdentificationNumber: invoice.taxpayerIdentificationNumber,
        zipCode: invoice.zipCode,
        city: invoice.city,
        street: invoice.street,
        houseNumber: invoice.houseNumber,
        apartmentNumber: invoice.apartmentNumber,
      };

      for (const [key, value] of Object.entries(invoiceDefaultValues)) {
        setValue(key as any, value);
      }
    }
  }, [invoice]); //trzeba użyć useEffect w porównaniu do usera, ponieważ invoices nie są wcześniej załadowane jak user => ograniczenie, nie można użyć dirty w walidacji

  const onInvoiceDataFormSubmit = async (data: FieldValues) => {
    if (invoice) {
      try {
        const editInvoice = await axios.put(
          `/api/v1/invoices/${invoice._id}`,
          data,
          {
            withCredentials: true,
          }
        );

        console.log({ editInvoice });
        handleAlert("success", "Zmieniono dane do faktury");
      } catch (e) {
        console.log(e);
        handleAlert("error", "Edytowanie danych do faktury nie powiodło się");
      }
      return; //update invoice[0]
    }

    try {
      const newInvoice = await axios.post("/api/v1/invoices", data, {
        withCredentials: true,
      }); //findOrCreate

      console.log({ newInvoice });
      handleAlert("success", "Dodano dane do faktury");
    } catch (e) {
      console.log(e);
      handleAlert("error", "Wysyłanie danych do faktury nie powiodło się");
    }
  };

  return (
    <Styled.FormWrapper>
      <Heading icon={<FaFileInvoice />} title="Dane do faktury" />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onInvoiceDataFormSubmit)}
          autoComplete="off"
        >
          <Input label="nazwa firmy *" name="companyName" fullWidth />
          <Input label="NIP *" name="taxpayerIdentificationNumber" fullWidth />
          <Input label="kod pocztowy *" name="zipCode" fullWidth />
          <Input label="miejscowość *" name="city" fullWidth />
          <Input label="ulica *" name="street" fullWidth />
          <Input label="numer domu *" name="houseNumber" fullWidth />
          <Input label="numer lokalu" name="apartmentNumber" fullWidth />

          <Button
            type="submit"
            variant={
              isSubmitting || !isValid || !isDirty ? "disabled" : "primary"
            }
            fullWidth
          >
            wyślij
          </Button>
        </form>
      </FormProvider>
    </Styled.FormWrapper>
  );
};

export default InvoiceDataForm;

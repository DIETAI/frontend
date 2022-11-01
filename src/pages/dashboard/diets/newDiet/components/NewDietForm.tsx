import React, { useEffect, useState } from "react";
import axios from "utils/api";
import { useNavigate } from "react-router";
import { getClients } from "services/getClients";
import { useSearchParams } from "react-router-dom";

//styles
import * as Styled from "./NewDietForm.styles";

//form
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//schema
import { dietDataSchema } from "../schema/dietData.schema";

//components
import Input from "components/form/textarea/Textarea";
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";
import DashedSelect from "components/form/dashedSelect/DashedSelect";
import Modal from "components/modal/Modal";
import EstablishmentModalContent from "./establishmentModal/EstablishmentModal";
import Autocomplete from "components/form/autocomplete/Autocomplete";
import Calendar from "./calendar/Calendar";
import CheckBoxWrapper from "components/checkbox/CheckboxWrapper";

//icons
import { FaFileInvoice } from "icons/icons";

//context
import { useAlert } from "layout/dashboard/context/alert.context";
import { useDietEstablishment } from "services/useDietEstablishments";

const defaultValues = dietDataSchema.cast({});
type INewDietValues = typeof defaultValues;

type IDateType = "amount" | "date";

const NewDietForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const patientIdParam = searchParams.get("patientId"); //from newDiet
  const establishmentIdParam = searchParams.get("establishmentId"); //from newDiet
  const newDietNameParam = searchParams.get("dietName"); //from newDiet
  const newDietDaysAmountParam = searchParams.get("daysAmount"); //from newDiet

  const { clients, clientsError, clientsLoading } = getClients();
  const [establishmentModal, setEstablishmentModal] = useState(false);
  const navigate = useNavigate();
  const { handleAlert } = useAlert();

  const methods = useForm({
    resolver: yupResolver(dietDataSchema),
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
    setValue,
    watch,
  } = methods;

  useEffect(() => {
    if (establishmentIdParam) {
      setValue("establishmentId", establishmentIdParam);
      setValue("clientId", patientIdParam || "");
      setValue("daysAmount", parseInt(newDietDaysAmountParam || "7"));
      setValue("name", newDietNameParam || "");
    }
  }, [
    patientIdParam,
    establishmentIdParam,
    newDietNameParam,
    newDietDaysAmountParam,
  ]);

  const establishmentId = getValues("establishmentId");
  const daysType = watch("daysType") as IDateType;

  const onDietFormSubmit = async (data: INewDietValues) => {
    console.log("wysyłanie założeń");
    console.log(data);
    try {
      const newDiet = await axios.post("/api/v1/diets", data, {
        withCredentials: true,
      });
      console.log({ newDiet });
      handleAlert("success", "Stworzono dietę");
      navigate(`/dashboard/diets/edit/${newDiet.data._id}`);
    } catch (e) {
      console.log(e);
      handleAlert("error", "Dodawanie diety nie powiodło się");
    }
  };

  const openAddEstablishmentModal = () => {
    setEstablishmentModal(true);
  };

  if (clientsLoading) return <div>clients loading</div>;
  if (clientsError) return <div>clients error</div>;

  const clientsData = clients?.map((client) => ({
    _id: client._id,
    fullName: client.name + " " + client.lastName,
  }));

  const handleChangeDaysOption = (optionType: IDateType) => {
    setValue("dayStart", undefined);
    setValue("dayEnd", undefined);

    setValue("daysType", optionType);
  };

  return (
    <Styled.FormWrapper>
      <Heading icon={<FaFileInvoice />} title="Nowa dieta" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onDietFormSubmit)}>
          {/* {JSON.stringify(watch())} */}
          <Input label="nazwa" name="name" fullWidth />
          <Styled.OptionsWrapper>
            <Styled.Option>
              <CheckBoxWrapper
                onClick={() => handleChangeDaysOption("amount")}
                checked={daysType === "amount"}
              />
              <span>ilość dni</span>
            </Styled.Option>
            <Styled.Option>
              <CheckBoxWrapper
                onClick={() => handleChangeDaysOption("date")}
                checked={daysType === "date"}
              />
              <span>data rozpoczęcia i zakończenia</span>
            </Styled.Option>
          </Styled.OptionsWrapper>
          {daysType === "amount" ? (
            <Input
              label="ilość dni"
              name="daysAmount"
              fullWidth
              type="number"
            />
          ) : (
            <>
              <Calendar label={`data rozpoczęcia`} name="dayStart" fullWidth />
              <Calendar label={`data zakończenia`} name="dayEnd" fullWidth />
            </>
          )}

          {/* <Input label="start diety" name="dayStart" fullWidth />
          <Input label="koniec diety" name="dayEnd" fullWidth /> */}
          <Autocomplete
            name="clientId"
            fullWidth
            label="pacjent"
            options={clientsData as []}
            optionLabel={"fullName"}
            optionRender={"_id"}
          />
          <Styled.EstablishmentWrapper>
            <DashedSelect
              icon={<FaFileInvoice />}
              text={establishmentId ? "zmień założenia" : "dodaj założenia"}
              onClick={openAddEstablishmentModal}
              fullWidth
            />
            {establishmentId && (
              <EstablishmentItem establishmentId={establishmentId} />
            )}
          </Styled.EstablishmentWrapper>

          <Button
            type="submit"
            variant={!isValid || isSubmitting ? "disabled" : "primary"}
            fullWidth
          >
            stwórz dietę
          </Button>
        </form>
        <Modal
          onClose={() => setEstablishmentModal(false)}
          open={establishmentModal}
        >
          <EstablishmentModalContent
            closeModal={() => setEstablishmentModal(false)}
          />
        </Modal>
      </FormProvider>
    </Styled.FormWrapper>
  );
};

const EstablishmentItem = ({
  establishmentId,
}: {
  establishmentId: string;
}) => {
  const {
    dietEstablishment,
    dietEstablishmentLoading,
    dietEstablishmentError,
  } = useDietEstablishment(establishmentId);

  if (dietEstablishmentLoading) return <div>loading..</div>;
  if (dietEstablishmentError) return <div>error..</div>;

  return (
    <Styled.EstablishmentItem>
      <p>{dietEstablishment?.name}</p>
    </Styled.EstablishmentItem>
  );
};

export default NewDietForm;

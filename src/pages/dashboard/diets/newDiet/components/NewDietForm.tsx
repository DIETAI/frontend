import React, { useEffect, useState } from "react";
import axios from "utils/api";
import { useNavigate } from "react-router";
import { getClients } from "services/getClients";
import { useSearchParams } from "react-router-dom";
import { eachDayOfInterval } from "date-fns";

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
import { getDietEstablishment } from "services/getDietEstablishments";
import NoClientsModal from "./noClientsModal/NoClientsModal";

const defaultValues = dietDataSchema.cast({});
type INewDietValues = typeof defaultValues;

type IDateType = "amount" | "date";

interface IDietDay {
  order: number;
  date?: Date;
}

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
  const clientId = getValues("clientId");

  const onDietFormSubmit = async (data: INewDietValues) => {
    console.log("wysyłanie założeń");
    console.log(data);
    try {
      let days: IDietDay[] = [];

      if (data.daysType === "amount") {
        const dietDays = Array.from(Array(data.daysAmount).keys());
        days = dietDays.map((dietDay) => ({
          order: dietDay + 1,
        }));
      } else if (data.daysType === "date" && data.dayStart && data.dayEnd) {
        const dietDays = eachDayOfInterval({
          start: data.dayStart,
          end: data.dayEnd,
        });

        days = dietDays.map((dietDay, index) => ({
          order: index + 1,
          date: dietDay,
        }));
      }

      if (days.length < 1) throw "Brak dni w diecie";

      const newDietData = { ...data, days };

      console.log({ newDietData });

      const newDiet = await axios.post("/api/v1/diets", newDietData, {
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

  console.log({ clientsData });

  const handleChangeDaysOption = (optionType: IDateType) => {
    setValue("dayStart", undefined);
    setValue("dayEnd", undefined);
    setValue("daysAmount", undefined);
    setValue("daysType", optionType);
    trigger();
  };

  return (
    <Styled.FormWrapper>
      <Heading icon={<FaFileInvoice />} title="Nowa dieta" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onDietFormSubmit)} autoComplete="off">
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

          {clientsData && clientsData.length > 0 && (
            <Autocomplete
              name="clientId"
              fullWidth
              label="pacjent"
              options={clientsData as []}
              optionLabel={"fullName"}
              optionRender={"_id"}
            />
          )}

          <Styled.EstablishmentWrapper>
            <DashedSelect
              icon={<FaFileInvoice />}
              text={establishmentId ? "zmień założenia" : "dodaj założenia"}
              onClick={openAddEstablishmentModal}
              fullWidth
              disabled={!clientId}
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
        {clientsData && (
          <Modal open={clientsData.length < 1}>
            <NoClientsModal />
          </Modal>
        )}
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
  } = getDietEstablishment(establishmentId);

  if (dietEstablishmentLoading) return <div>loading..</div>;
  if (dietEstablishmentError) return <div>error..</div>;

  return (
    <Styled.EstablishmentItem>
      <p>{dietEstablishment?.name}</p>
    </Styled.EstablishmentItem>
  );
};

export default NewDietForm;

import React, { useEffect } from "react";
import { useParams } from "react-router";
import format from "date-fns/format";
import { pl } from "date-fns/locale";

//form
import { useFormContext } from "react-hook-form";

//styles
import * as Styled from "./Days.styles";

//icons
import { FaCalendarDay } from "icons/icons";

// //interfaces
import { IDietGenerateDaysSchema } from "../../../schema/dietGenerate.schema";

//components
import CheckBoxWrapper from "components/checkbox/CheckboxWrapper";
import { getDietPopulate } from "services/getDiets";

const dateFormat = (date: Date) => {
  const formatDate = format(new Date(date), "eee dd.MM.yyyy", {
    locale: pl,
  });

  return formatDate;
};

const PlanLength = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const { dietEditId } = useParams();
  console.log({ dietEditId });

  if (!dietEditId) return <div>not found</div>;
  const { diet } = getDietPopulate(dietEditId);

  const dietGenerateDays = watch("days") as IDietGenerateDaysSchema["days"];

  const checkAllDays = () => {
    if (dietGenerateDays.length === diet?.dietDays?.length) {
      setValue("days", []);
      return trigger();
    }

    setValue(
      "days",
      diet?.dietDays?.map((dietDay) => dietDay._id)
    );

    return trigger();
  };

  const changeDays = (dietDayId: string) => {
    if (dietGenerateDays.includes(dietDayId)) {
      setValue(
        "days",
        dietGenerateDays.filter((id) => id !== dietDayId)
      );
      return trigger();
    }
    setValue("days", [...dietGenerateDays, dietDayId]);
    return trigger();
  };

  // if (dietDaysLoading)
  //   return (
  //     <Styled.LoadingWrapper
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       exit={{ opacity: 0 }}
  //     >
  //       <ReactLoading type="spin" color="blue" height={50} width={50} />
  //       <h2>Pobieranie dni</h2>
  //     </Styled.LoadingWrapper>
  //   );
  // if (dietDaysError)
  //   return (
  //     <Styled.EmptyDataWrapper>
  //       <h2>
  //         pobieranie dni nie powiodło się, spróbuj ponownie później wygenerować
  //         dietę
  //       </h2>
  //     </Styled.EmptyDataWrapper>
  //   );

  return (
    <Styled.DietGenerateDaysContainer>
      <Styled.DaysOptions>
        <CheckBoxWrapper
          onClick={checkAllDays}
          checked={dietGenerateDays.length === diet?.dietDays?.length}
        />
        <span>wszystkie dni</span>
      </Styled.DaysOptions>
      <Styled.DaysWrapper>
        {diet?.dietDays?.length &&
          diet.dietDays.map((dietDay) => (
            <Styled.DayItem
              key={dietDay._id}
              onClick={() => changeDays(dietDay._id)}
              selectedDay={dietGenerateDays.includes(dietDay._id)}
            >
              <h2>
                {dietDay.date
                  ? dateFormat(dietDay.date)
                  : `Dzień ${dietDay.order}`}
              </h2>
              <FaCalendarDay />
            </Styled.DayItem>
          ))}
      </Styled.DaysWrapper>
    </Styled.DietGenerateDaysContainer>
  );
};

export default PlanLength;

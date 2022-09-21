import React from "react";

import { IDietGenerateAction } from "../MultistepContainer";
import ReactLoading from "react-loading";

//styles
import * as Styled from "./GeneratedDaysLoading.styles";

const GeneratedDaysLoading = ({
  dietGenerateAction,
  daysToGenerate,
}: {
  dietGenerateAction: IDietGenerateAction;
  daysToGenerate: string[];
}) => {
  return (
    <Styled.DaysContainer>
      {daysToGenerate.map((dayId) => (
        <Styled.DayWrapper key={dayId}>
          {dietGenerateAction.dayId === dayId ? (
            <>
              <ReactLoading type="spin" color="blue" height={50} width={50} />
              <h3>generowanie diety dla dnia {dietGenerateAction.dayId}</h3>
            </>
          ) : (
            <>{dayId}</>
          )}
        </Styled.DayWrapper>
      ))}

      {/* <h3>
        wygenerowane dni : {JSON.stringify(dietGenerateAction.generatedDays)}
      </h3> */}
    </Styled.DaysContainer>
  );
};

export default GeneratedDaysLoading;

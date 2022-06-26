import React from "react";

//styles
import * as Styled from "./Plans.styles";

import DataGrid from "../../components/dataGrid/DataGrid";

const availableColumns = [
  { label: "nazwa planu", key: "name" },
  { label: "status", key: "status" },
  { label: "data rozpoczęcia", key: "proteinGram" },
  { label: "data zakończenia", key: "fatGram" },
  { label: "opis", key: "carbohydratesGram" },
  { label: "cena", key: "carbohydratesGram" },
];

const Plans = () => {
  const plans = [] as any;
  const loadingPlans = false;

  const deletePlans = () => {
    return;
  };

  return (
    <Styled.Container>
      <Styled.EmptyPlanWrapper>
        <h2>Twój plan wygasł</h2>
        <p>Odnów plan aby móc korzystać z aplikacji</p>
      </Styled.EmptyPlanWrapper>
      <DataGrid
        loading={loadingPlans}
        availableColumns={availableColumns}
        dataRows={plans}
        deleteAction={deletePlans}
        linkPage="new"
      />
      {/* <h2>obecny plan</h2>
      <Styled.PlanItemWrapper>
        <h2>Standard</h2>
      </Styled.PlanItemWrapper>
      <h2>wcześniejsze plany</h2> */}
    </Styled.Container>
  );
};

export default Plans;

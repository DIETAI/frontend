import React from "react";
import { useTranslation } from "react-i18next";
import { getDinners } from "services/getDinners";

//date-fns
import format from "date-fns/format";

//components
import DataGrid from "../../components/dataGrid/DataGrid";

const availableColumns = [
  { label: "nazwa", key: "name" },
  { label: "kcal", key: "kcal" },
  { label: "białko (g)", key: "proteinGram" },
  { label: "tłuszcze (g)", key: "fatGram" },
  { label: "węglowodany (g)", key: "carbohydratesGram" },
];

const AllDinners = () => {
  const { t } = useTranslation();
  const { dinners, dinnersError, dinnersLoading } = getDinners();

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (dinnersError || !dinners) return <div>dinners error</div>;

  const dinnersList = () => {
    const modifyDinners = dinners.map((data) => ({
      ...data,
      createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    }));

    return modifyDinners;
  };

  const deleteDinners = () => {
    return;
  };

  return (
    <>
      <DataGrid
        loading={dinnersLoading}
        availableColumns={availableColumns}
        dataRows={dinnersList() as any}
        deleteAction={deleteDinners}
        linkPage="/dashboard/dinners"
      />
    </>
  );
};

export default AllDinners;

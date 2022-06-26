import React from "react";
import { useTranslation } from "react-i18next";
import { getDiets } from "services/getDiets";

//date-fns
import format from "date-fns/format";

//components
import DataGrid from "../../components/dataGrid/DataGrid";

const availableColumns = [
  { label: "nazwa", key: "name" },
  { label: "kcal", key: "kcal" },
  { label: "białko (g)", key: "proteinGram" },
  { label: "tłuszcze (g)", key: "fatGram" },
];

const AllDiets = () => {
  const { t } = useTranslation();

  const { diets, dietsError, dietsLoading } = getDiets();

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (dietsError || !diets) return <div>diets error</div>;

  const dietList = () => {
    const modifyDiets = diets.map((data) => ({
      ...data,
      createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    }));

    return modifyDiets;
  };

  const deleteDiets = () => {
    return;
  };

  return (
    <>
      <DataGrid
        loading={dietsLoading}
        availableColumns={availableColumns}
        dataRows={dietList() as any}
        deleteAction={deleteDiets}
        linkPage="/dashboard/diets"
      />
    </>
  );
};

export default AllDiets;

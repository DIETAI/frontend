import React from "react";
import { useTranslation } from "react-i18next";
import { useDietEstablishments } from "services/useDietEstablishments";
import { Link } from "react-router-dom";

//date-fns
import format from "date-fns/format";

//components
import DataGrid from "../../components/dataGridv2/DataGrid";

//interfaces
import { IColumn } from "pages/dashboard/components/dataGridv2/DataGrid.interfaces";

const columns: IColumn[] = [
  { label: "nazwa", key: "name", type: "text" },
  { label: "data", key: "createdAt", type: "text" },
  { label: "kcal", key: "kcal", type: "text" },
  { label: "białka (%)", key: "proteinProcent", type: "number" },
  { label: "tłuszcze (%)", key: "fatProcent", type: "number" },
  { label: "węglowodany (%)", key: "carbohydratesProcent", type: "number" },
];

const AllDietEstablishments = () => {
  const { t } = useTranslation();
  const {
    dietEstablishments,
    dietEstablishmentsError,
    dietEstablishmentsLoading,
  } = useDietEstablishments();

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (dietEstablishmentsError) return <div>dietEstablishments error popup</div>;

  console.log({ dietEstablishments });

  const dietEstablishmentData = dietEstablishments?.map((data) => ({
    _id: data._id,
    name: data.name,
    createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    kcal: data.kcal,
    proteinProcent: data.protein.procent,
    fatProcent: data.fat.procent,
    carbohydratesProcent: data.carbohydrates.procent,
  }));

  const deleteDietEstablishments = () => {
    return;
  };

  return (
    <>
      <DataGrid
        columns={columns}
        addLink="/dashboard/diet-establishments/new"
        link="/dashboard/diet-establishments"
        exportAction={() => console.log("open export popup")}
        data={dietEstablishmentData}
        loadingData={dietEstablishmentsLoading}
      />
    </>
  );
};

export default AllDietEstablishments;

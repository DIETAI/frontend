import React from "react";
import { useTranslation } from "react-i18next";
import { useDietEstablishments } from "services/useDietEstablishments";
import { Link } from "react-router-dom";

//date-fns
import format from "date-fns/format";

//components
import DataGrid from "../../components/dataGrid/DataGrid";

const availableColumns = [
  { label: "nazwa", key: "name" },
  { label: "data", key: "createdAt" },
  { label: "masa ciała", key: "weight" },
  { label: "wysokość ciała", key: "height" },
  { label: "pal", key: "pal" },
  { label: "bmi", key: "bmi" },
  { label: "ppm (mifflin)", key: "ppmMifflin" },
  { label: "ppm (harris)", key: "ppmHarris" },
  { label: "cpm", key: "cpm" },
];

const AllDietEstablishments = () => {
  const { t } = useTranslation();
  const {
    dietEstablishments,
    dietEstablishmentsError,
    dietEstablishmentsLoading,
  } = useDietEstablishments();

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (dietEstablishmentsError || !dietEstablishments)
    return <div>dietEstablishments error</div>;

  console.log({ dietEstablishments });

  const dietEstablishmentList = () => {
    const modifyDietEstablishments = dietEstablishments.map((data) => ({
      ...data,
      meals: "",
      createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    }));

    return modifyDietEstablishments;
  };

  const deleteDietEstablishments = () => {
    return;
  };

  return (
    <>
      {dietEstablishments.map((dietEstablishment) => (
        <div key={dietEstablishment._id}>
          <Link to={`/dashboard/diet-establishments/${dietEstablishment._id}`}>
            {dietEstablishment.name}
          </Link>
        </div>
      ))}
      {/* <DataGrid
        loading={dietEstablishmentsLoading}
        availableColumns={availableColumns}
        dataRows={dietEstablishmentList as any}
        deleteAction={deleteDietEstablishments}
        linkPage="new"
      /> */}
    </>
  );
};

export default AllDietEstablishments;

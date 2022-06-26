import React from "react";
import { useTranslation } from "react-i18next";
import { useMeasurements } from "services/useMeasurements";

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

const AllMeasurements = () => {
  const { t } = useTranslation();
  const { measurements, measurementsError, measurementsLoading } =
    useMeasurements();

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (measurementsError || !measurements) return <div>measurements error</div>;

  const measurementList = () => {
    const modifyMeasurements = measurements.map((data) => ({
      ...data,
      images: "",
      createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    }));

    return modifyMeasurements;
  };

  const deleteMeasurements = () => {
    return;
  };

  return (
    <>
      <DataGrid
        loading={measurementsLoading}
        availableColumns={availableColumns}
        dataRows={measurementList()}
        deleteAction={deleteMeasurements}
        linkPage="/dashboard/measurements"
      />
    </>
  );
};

export default AllMeasurements;

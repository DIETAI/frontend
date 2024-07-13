import React from "react";
import { useParams } from "react-router";
import { measurementsNavLinks } from "../utlis/navLinks";

//components
import EditMeasurementForm from "./components/EditMeasurementForm";
import PageNav from "components/pageNav/PageNav";

//queries
import { useMeasurement } from "services/measurement.service";

const EditMeasurement = () => {
  const { measurementEditId } = useParams();
  console.log({ measurementEditId });

  if (!measurementEditId) return <div>not found</div>;
  const { measurement, measurementError, measurementLoading } =
    useMeasurement(measurementEditId);

  if (measurementLoading) return <div>measurement loading...</div>;
  if (measurementError || !measurement) return <div>measurement error</div>;
  return (
    <>
      <PageNav
        headingTitle={"Pomiary"}
        pageNavLinks={[
          ...measurementsNavLinks,
          {
            id: measurementsNavLinks.length + 1,
            title: "pomiar",
            path: `/dashboard/measurements/${measurementEditId}`,
          },
          {
            id: measurementsNavLinks.length + 2,
            title: "edytuj pomiar",
            path: `/dashboard/measurements/edit/${measurementEditId}`,
          },
        ]}
      />
      <EditMeasurementForm measurement={measurement} />
    </>
  );
};

export default EditMeasurement;

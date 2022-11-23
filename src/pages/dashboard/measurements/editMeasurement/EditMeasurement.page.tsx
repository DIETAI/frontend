import React from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

//icon
import { FaCarrot, FaUtensils } from "icons/icons";

//components
import EditMeasurementForm from "./components/EditMeasurementForm";
import MultiStepSidebar from "../../components/multiStepForm/multistepSidebar/MultiStepSidebar";
import MultiStepContainer from "../../components/multiStepForm/multiStepContainer/MultiStepContainer";
import MeasurementSidebarSteps from "../components/form/sidebar/steps/MeasurementSidebarSteps";
import PageNav from "components/pageNav/PageNav";

//utils
import { measurementFormSteps } from "../utlis/steps";
import { measurementsNavLinks } from "../utlis/navLinks";

//queries
import { useMeasurement } from "services/useMeasurements";

const measurementSidebarPages = [
  {
    id: 1,
    title: "sekcje",
    component: (
      <MeasurementSidebarSteps measurementFormSteps={measurementFormSteps} />
    ),
  },
  // { id: 2, title: "anatomia", component: <DinnerSidebarEstablishment /> },
];

const EditMeasurement = () => {
  const { t } = useTranslation();
  const { measurementEditId } = useParams();
  console.log({ measurementEditId });

  if (!measurementEditId) return <div>not found</div>;
  const { measurement, measurementError, measurementLoading } =
    useMeasurement(measurementEditId);

  if (measurementLoading) return <div>measurement loading...</div>;
  if (measurementError || !measurement) return <div>measurement error</div>;

  //    const initialFormValues: IInitialValues = {
  //      client: measurement.client,
  //      name: measurement.name,
  //      notes: measurement.notes,
  //      weight: measurement.weight,
  //      height: measurement.height,
  //      pal: measurement.pal,

  //      //circuits
  //      chest_breath: measurement.chest_breath,
  //      chest_exhaust: measurement.chest_exhaust,
  //      shoulder: measurement.shoulder,
  //      shoulder_tonus: measurement.shoulder_tonus,
  //      waist: measurement.waist,
  //      hip: measurement.hip,
  //      forearm: measurement.forearm,
  //      thigh: measurement.thigh,
  //      calf: measurement.calf,
  //    };

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
      <MultiStepContainer>
        <MultiStepSidebar
          icon={<FaUtensils />}
          title={measurement.name}
          pages={measurementSidebarPages}
        />
        <EditMeasurementForm measurement={measurement} />
      </MultiStepContainer>
    </>
    // <div>
    //   EditMeasurement <p>{measurementEditId}</p>
    // </div>
  );
};

export default EditMeasurement;

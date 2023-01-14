import React from "react";
import { getMeasurements } from "services/getMeasurements";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useNavigate } from "react-router";

//styles
import * as Styled from "./HomeMeasurements.styles";

const HomeMeasurements = () => {
  const navigate = useNavigate();
  const { measurements, measurementsLoading, measurementsError } =
    getMeasurements();

  if (measurementsLoading) return <div>loading...</div>;
  if (measurementsError) return <div>error...</div>;

  const selectedMeasurements = measurements?.slice(
    Math.max(measurements.length - 2, 0)
  );

  return (
    <Styled.HomeMeasurementsWrapper>
      {selectedMeasurements?.length &&
        selectedMeasurements.map((measurement, index) => (
          <Styled.HomeMeasurementItem
            key={measurement._id}
            onClick={() =>
              navigate(`/dashboard/measurements/${measurement._id}`)
            }
          >
            {/* <Styled.ItemLength>{index + 1}</Styled.ItemLength> */}
            <Styled.ItemContentWrapper>
              <h2>{measurement.name}</h2>
              <p>
                {format(new Date(measurement.createdAt), "dd.MM.yyyy", {
                  locale: pl,
                })}
              </p>

              <Styled.ItemFeaturesWrapper>
                <Styled.ItemFeature>
                  <span>bmi</span>
                  <p>{measurement.bmi} kg/m2</p>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  <span>cpm</span>
                  <p>{measurement.cpm} kcal</p>
                </Styled.ItemFeature>
                <Styled.ItemFeature>
                  <span>masa ciała</span>
                  <p>{measurement.weight} kg</p>
                </Styled.ItemFeature>
              </Styled.ItemFeaturesWrapper>
            </Styled.ItemContentWrapper>
          </Styled.HomeMeasurementItem>
        ))}
    </Styled.HomeMeasurementsWrapper>
  );
};

export default HomeMeasurements;

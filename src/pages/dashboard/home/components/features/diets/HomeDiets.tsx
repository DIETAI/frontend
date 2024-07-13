import React from "react";
import { getDiets } from "services/getDiets";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useNavigate } from "react-router";

//styles
import * as Styled from "./HomeDiets.styles";

const HomeDiets = () => {
  const navigate = useNavigate();
  const { diets, dietsLoading, dietsError } = getDiets();

  if (dietsLoading) return <div>loading...</div>;
  if (dietsError) return <div>error...</div>;

  const selectedDiets = diets?.slice(Math.max(diets.length - 2, 0));

  return (
    <Styled.HomeMeasurementsWrapper>
      {selectedDiets?.length &&
        selectedDiets.map((diet, index) => (
          <Styled.HomeMeasurementItem
            key={diet._id}
            onClick={() => navigate(`/dashboard/diets/${diet._id}`)}
          >
            <Styled.ItemContentWrapper>
              <h2>{diet.name}</h2>
              <p>
                {format(new Date(diet.createdAt), "dd.MM.yyyy", {
                  locale: pl,
                })}
              </p>

              <Styled.ItemFeaturesWrapper>
                <Styled.ItemFeature>
                  <span>dni</span>
                  <p>{diet.daysAmount}</p>
                </Styled.ItemFeature>
              </Styled.ItemFeaturesWrapper>
            </Styled.ItemContentWrapper>
          </Styled.HomeMeasurementItem>
        ))}
    </Styled.HomeMeasurementsWrapper>
  );
};

export default HomeDiets;

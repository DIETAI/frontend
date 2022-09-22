import React from "react";
import ReactLoading from "react-loading";

//components
import GeneratedDays from "./generatedDays/GeneratedDays";
import Heading from "components/heading/Heading";

//icons
import { FaCarrot } from "icons/icons";

//styles
import * as Styled from "./GeneratedDietModal.styles";

//store
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";

const GeneratedDietModal = () => {
  const { generatedDays, days, generateDietLoading } = useSelector(
    (state: RootState) => state.dietGenerate
  );
  return (
    <Styled.GeneratedDietModalContainer>
      <Heading icon={<FaCarrot />} title="Wygenerowana dieta" />
      {generateDietLoading ? (
        <Styled.DaysContainer>
          <ReactLoading type="spin" color="blue" height={50} width={50} />
          <h3>generowanie diety</h3>
        </Styled.DaysContainer>
      ) : (
        <GeneratedDays />
      )}

      {/* <Styled.DaysContainer>
        {days.map((day) => (
          <Styled.DayWrapper key={day._id}>
            {day.loading && (
              <div>
                <ReactLoading type="spin" color="blue" height={50} width={50} />
                <h3>generowanie diety dla dnia {day._id}</h3>
              </div>
            )}
          </Styled.DayWrapper>
        ))}
      </Styled.DaysContainer> */}
    </Styled.GeneratedDietModalContainer>
  );
};

export default GeneratedDietModal;

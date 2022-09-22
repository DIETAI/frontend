import React from "react";
import ReactLoading from "react-loading";

//components
import GeneratedDays from "./generatedDays/GeneratedDays";
import Heading from "components/heading/Heading";
import Button from "components/form/button/Button";

//icons
import { FaCarrot } from "icons/icons";

//styles
import * as Styled from "./GeneratedDietModal.styles";

//store
import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";
import { removeDietGenerate } from "store/dietGenerate";

const GeneratedDietModal = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useDispatch();

  const { generatedDays, days, generateDietLoading } = useSelector(
    (state: RootState) => state.dietGenerate
  );

  const handleCloseModal = () => {
    dispatch(removeDietGenerate());
    closeModal();
  };

  const addDaysToDiet = () => {
    console.log("add diet dinners and dietDayMeals to diet");
  };

  const handleGenerateDiet = () => {
    console.log("generate diet");
  };

  if (generateDietLoading)
    return (
      <Styled.LoadingWrapper>
        <ReactLoading type="spin" color="blue" height={50} width={50} />
        <h3>generowanie diety</h3>
      </Styled.LoadingWrapper>
    );

  return (
    <Styled.GeneratedDietModalContainer>
      <Heading icon={<FaCarrot />} title="Wygenerowane dni" />
      <Styled.GeneratedDietNavWrapper>
        <h3></h3>
        <Styled.GeneratedDietNavButtonsWrapper>
          {/* <Button
            type="button"
            onClick={handleGenerateDiet as any}
            variant="secondary"
          >
            generuj ponownie dietę
          </Button> */}
          <Button type="button" onClick={addDaysToDiet as any}>
            dodaj wygenerowane dni do diety
          </Button>
          <Button type="button" onClick={handleCloseModal} variant="secondary">
            anuluj
          </Button>
        </Styled.GeneratedDietNavButtonsWrapper>
      </Styled.GeneratedDietNavWrapper>
      <GeneratedDays />
      {/* {generateDietLoading ? (
        <Styled.DaysContainer>
          <ReactLoading type="spin" color="blue" height={50} width={50} />
          <h3>generowanie diety</h3>
        </Styled.DaysContainer>
      ) : (
        <GeneratedDays />
      )} */}

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

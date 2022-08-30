import React from "react";

//styles
import * as Styled from "../Dinner.styles";

//components
import Image from "components/form/images/image/Image";

//form
import { useFormContext } from "react-hook-form";

//services
import { getDinners } from "services/getDinners";
import { IDinnerData } from "interfaces/dinner/dinner.interfaces";

interface IAllDinnersProps {
  changeDinner: (dinnerId: string) => void;
  searchValue: string;
}

const optionFilter = (dinners: IDinnerData[], searchValue: string) => {
  if (dinners.find((dinner) => dinner.name === searchValue)) {
    return dinners;
  }

  return dinners.filter((dinner) =>
    dinner.name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

const AllDinners = ({ changeDinner, searchValue }: IAllDinnersProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();
  const { dinners, dinnersError, dinnersLoading } = getDinners();

  const selectedDinnerId = watch("dinnerId") as string;

  if (dinnersLoading) return <div>dinners loading</div>;
  if (dinnersError || !dinners) return <div>dinners error</div>;

  const renderDinners = optionFilter(dinners, searchValue);

  return (
    <Styled.DinnerList>
      {renderDinners.length > 0 &&
        renderDinners.map((dinner) => (
          <Styled.DinnerItem
            activeItem={selectedDinnerId === dinner._id}
            key={dinner._id}
            onClick={() => changeDinner(dinner._id)}
          >
            {dinner.image && (
              <Image imageId={dinner.image} roundedDataGrid={true} />
            )}
            <h2>{dinner.name}</h2>
          </Styled.DinnerItem>
        ))}
    </Styled.DinnerList>
  );
};

export default AllDinners;

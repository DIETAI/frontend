import React from "react";

//interfaces
import { IDietDinnerQueryData } from "interfaces/diet/dietQuery.interfaces";

//styles
import * as Styled from "./Dinner.styles";

//components
import Image from "components/form/images/image/Image";

interface IDietDinner {
  dietDinner: IDietDinnerQueryData;
}

const Dinner = ({ dietDinner }: IDietDinner) => {
  const { image } = dietDinner.dinnerPortion.dinner;

  return (
    <Styled.DietDinnerWrapper>
      <Styled.DietDinner>
        {image && <Image roundedDataGrid={true} imageId={image} />}
        <h4>{dietDinner.dinnerPortion.dinner.name}</h4>
      </Styled.DietDinner>
      <Styled.DietDinnerTotalWrapper>
        <p>kcal: {dietDinner.dinnerPortion.total.kcal}</p>
      </Styled.DietDinnerTotalWrapper>

      {/* <div>
        produkty:{" "}
        {dietDinner.dinnerPortion.dinnerProducts.map((dinnerPortionProduct) => (
          <div key={dinnerPortionProduct.dinnerProductId}>
            <p>produkt: {dinnerPortionProduct.dinnerProductId}</p>{" "}
            <p>ilość: {dinnerPortionProduct.portion} g</p>
          </div>
        ))}{" "}
      </div> */}
    </Styled.DietDinnerWrapper>
  );
};

export default Dinner;

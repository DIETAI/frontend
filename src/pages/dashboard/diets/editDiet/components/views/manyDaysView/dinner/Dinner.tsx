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
        {image && (
          <div>
            <Image roundedDataGrid={true} imageId={image} />
          </div>
        )}
        <h4>{dietDinner.dinnerPortion.dinner.name}</h4>
      </Styled.DietDinner>
      <Styled.DietDinnerTotalWrapper>
        <p>
          B: <b>{dietDinner.dinnerPortion.total.protein.gram}</b>
        </p>
        <p>
          T: <b>{dietDinner.dinnerPortion.total.fat.gram}</b>
        </p>
        <p>
          W: <b>{dietDinner.dinnerPortion.total.carbohydrates.gram}</b>
        </p>
        <p>
          kcal: <b>{dietDinner.dinnerPortion.total.kcal}</b>
        </p>
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

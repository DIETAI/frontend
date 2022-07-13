import React from "react";
import axios from "utils/api";
import { useParams } from "react-router";

//components
import Button from "components/form/button/Button";

//form
import { useFormContext } from "react-hook-form";

//queries
import { getDinnerPortion } from "services/getDinnerPortions";

//styles
import * as Styled from "./AddDinnerFormContent.styles";

//interfaces
import { IDinnerData } from "interfaces/dinner/dinner.interfaces";
import { IDietDinnerValues } from "../AddDinnerModal";
import { IDietDinner } from "../AddDinnerModel.schema";
import { useSWRConfig } from "swr";
import { getDietDinners } from "services/getDietDinners";
import { getDiet } from "services/getDiets";
import { IDietQueryData } from "interfaces/diet/dietQuery.interfaces";
import { AxiosResponse } from "axios";
import {
  IDietDinnerData,
  IDietDinnerQueryData,
} from "interfaces/diet/dietDinners.interfaces";
import { getDinners } from "services/getDinners";
import { getDietDinnersQuery } from "services/getDietDinners";
import { IDietMealTotal } from "interfaces/diet/dietMeals.interfaces";

//hepers
import { sumDietDinnersTotal } from "../../helpers/mealTotal";
import { getDietDayMeal } from "services/getDietMeals";

const AddDinnerFormContent = ({
  closeModal,
  mealId,
}: {
  closeModal: () => void;
  mealId: string;
}) => {
  const { dietEditId } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
  } = useFormContext();
  const { mutate, cache } = useSWRConfig();

  const dietDinner = getValues() as IDietDinner;
  if (!dietDinner) return <div>dietDinner error</div>;

  const { dietDayMeal } = getDietDayMeal(mealId);

  const { dietDinnersQuery, dietDinnersErrorQuery, dietDinnersLoadingQuery } =
    getDietDinnersQuery(mealId);

  const { dinnerPortion, dinnerPortionLoading, dinnerPortionError } =
    getDinnerPortion(dietDinner.dinnerPortionId);

  if (dinnerPortionLoading) return <div>loading...</div>;
  if (dinnerPortionLoading) return <div>error</div>;
  if (!dietDinnersQuery || !dietDayMeal) return <div>...</div>;

  const onDietDinnerFormSubmit = async (data: IDietDinnerValues) => {
    //zmiana isSubmitting
    //brak zmiany treści alertu
    //przekierowanie do edycji
    console.log("wysyłanie posiłku");
    console.log(data);

    try {
      const newDietDinner: AxiosResponse<IDietDinnerQueryData> =
        await axios.post("/api/v1/dietDinners", data, {
          withCredentials: true,
        });
      console.log({ newDietDinner });

      // //edit meal
      // const editMealTotal = sumDietDinnersTotal({
      //   dietDinners: [...dietDinnersQuery, newDietDinner.data],
      //   dietDayTotalKcal: 2000,
      // }); //zsumować wszystkie dietDinners w diecie = dayTotalKcal

      // const editMealData = {
      //   ...dietDayMeal,
      //   total: editMealTotal,
      // };

      // const editDietMeal = await axios.put(
      //   `/api/v1/dietMeals/${mealId}`,
      //   editMealData,
      //   {
      //     withCredentials: true,
      //   }
      // );

      // console.log({ editDietMeal });

      //mutate dietquery obj
      await mutate(`/api/v1/diets/${dietEditId}/query`); //correct

      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  console.log({ cache });

  //wybrać i dodac wybrany zestaw porcji {portion: 1, total: {kcal: 200}, type: "custom", products:[dinnerProductId: sad, productId: adsada]}

  return (
    <Styled.AddDinnerFormWrapper
      onSubmit={handleSubmit(onDietDinnerFormSubmit as any)}
      autoComplete="off"
    >
      {JSON.stringify(watch())}
      <h2>dinnerId: {dinnerPortion?.dinnerId}</h2>
      <div>
        <h3>Produkty:</h3>
        <ul>
          {dinnerPortion?.dinnerProducts.map((product) => (
            <div key={product.dinnerProductId}>
              {" "}
              <h2>produkt: {product.dinnerProductId}</h2>{" "}
              <h3>ilość: {product.portion} g</h3>{" "}
            </div>
          ))}
          {/* {dinner?.products?.map((dinnerProduct) => (
            <DinnerProduct
              key={dinnerProduct.productId}
              dinnerProduct={dinnerProduct}
            />
          ))} */}
        </ul>
      </div>
      <Button
        fullWidth
        type="submit"
        // variant={isSubmitting || !isValid ? "disabled" : "primary"}
      >
        {isSubmitting ? "loading" : "dodaj danie"}
      </Button>
    </Styled.AddDinnerFormWrapper>
  );
};

export default AddDinnerFormContent;

// interface IDinnerProductProps {
//   dinnerProduct: IDinnerData["products"][0];
// }

// const DinnerProduct = ({ dinnerProduct }: IDinnerProductProps) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting, isValid },
//     setValue,
//     watch,
//     getValues,
//   } = useFormContext();

//   const dietDinner = watch() as IDietDinner;

//   const { product, productLoading, productError } = getProduct(
//     dinnerProduct.productId
//   );

//   if (productLoading) return <div>product loading...</div>;
//   if (productError) return <div>product error...</div>;

//   const getDietDinnerProductSelectedPortion = () => {
//     const product = dietDinner.products?.filter(
//       ({ productId }) => productId === dinnerProduct.productId
//     )[0];
//     const selectedPortion = product?.selectedPortionGram;
//     return selectedPortion;
//   };

//   const selectNewPortion = (portionGram: number) => {
//     const productIndex = dietDinner.products?.findIndex(
//       ({ productId }) => productId === dinnerProduct.productId
//     );
//     setValue(`products.${productIndex}.selectedPortionGram`, portionGram);

//     //setTotalValues
//   };

//   return (
//     <>
//       <h4>{product?.name}</h4>
//       <div>
//         <div>
//           <p>min: {dinnerProduct.minAmount}</p>
//           <p>max: {dinnerProduct.maxAmount}</p>
//         </div>

//         <h4>Dostępne porcje:</h4>
//         <Styled.DinnerProductPortionsWrapper>
//           {createPortions(
//             dinnerProduct.minAmount as number,
//             dinnerProduct.maxAmount as number
//           ).map((portionGram) => (
//             <Styled.DinnerProductPortion
//               onClick={() => selectNewPortion(portionGram)}
//               key={portionGram}
//               selectedPortion={
//                 portionGram === getDietDinnerProductSelectedPortion()
//               }
//             >
//               {portionGram} g
//             </Styled.DinnerProductPortion>
//           ))}
//         </Styled.DinnerProductPortionsWrapper>
//       </div>
//     </>
//   );
// };

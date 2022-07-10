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
import { getDinner } from "services/getDinners";

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

  const { dinnerPortion, dinnerPortionLoading, dinnerPortionError } =
    getDinnerPortion(dietDinner.dinnerPortionId);

  if (dinnerPortionLoading) return <div>loading...</div>;
  if (dinnerPortionLoading) return <div>error</div>;

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

      //mutate dietquery obj
      await mutate(`/api/v1/diets/${dietEditId}/query`); //correct

      ///api/v1/diets/62c947e24fc6f8b2f34df5b4/query in useSWR chache
      // await mutate(
      //   `/api/v1/diets/${dietEditId}/query`,
      //   async (dietData: IDietQueryData) => {
      //     console.log({ mutateData: data });
      //     return {
      //       ...dietData,
      //       days: dietData.days.map((dietDay) => ({
      //         ...dietDay,
      //         meals: dietDay.meals.map((dietMeal) => {
      //           if (dietMeal._id === newDietDinner.data.dietMealId) {
      //             //zwrócić a api dinner z dinnerPortion i dinner obj
      //             // const { dinnerPortion } = getDinnerPortion(
      //             //   newDietDinner.data.dinnerPortionId
      //             // );
      //             // const { dinner } = getDinner(
      //             //   dinnerPortion?.dinnerId as string
      //             // );

      //             // console.log({ dinnerPortion });

      //             return {
      //               ...dietMeal,
      //               dinners: [
      //                 ...dietMeal.dinners,
      //                 {
      //                   ...newDietDinner.data,
      //                   // dinnerPortion: {
      //                   //   ...dinnerPortion,
      //                   //   dinner,
      //                   // },
      //                 },
      //               ],
      //             };
      //           }

      //           return dietMeal;
      //         }),
      //       })),
      //     };
      //   }
      // ); //correct

      // if (dietDinners) {
      //   await mutate(`/api/v1/dietDinners`, [
      //     ...dietDinners,
      //     newDietDinner.data,
      //   ]);
      // }
      // window.location.reload();

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

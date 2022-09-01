import React, { useState, useEffect } from "react";

//styles
import * as Styled from "../Dinner.styles";

//components
import Image from "components/form/images/image/Image";

//form
import { useFormContext } from "react-hook-form";

//services
import { getDinners } from "services/getDinners";
import { getDietDinners } from "services/getDietDinners";

interface IRecommendDinnersProps {
  changeDinner: (dinnerId: string) => void;
}

interface IRecommendDietDinnerArg {
  _id: string;
  userId: string;
  "diet._id": string;
  "diet.name": string;
  "diet.clientId": string;
  "diet.clientPreferencesGroup": number;
  "dinner._id": string;
  "dinner.name": string;
  "dinner.products": string[];
  "dinner.likedProductsPoints": number;
  "meal._id": string;
  "meal.name": string;
  "meal.type": string;
}

interface IRecommendDinnerData {
  distance: number;
  recommend_dinner: string;
  recommend_dinner_id: string;
  mealType: string;
}

interface IRecommendDinnersState {
  data: IRecommendDinnerData[];
  error: boolean;
  loading: boolean;
}

const RecommendDinners = ({ changeDinner }: IRecommendDinnersProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const [recommendDinners, setRecommendDinners] =
    useState<IRecommendDinnersState>({
      data: [],
      loading: false,
      error: false,
    });

  const { dinners, dinnersError, dinnersLoading } = getDinners();
  const selectedDinnerId = watch("dinnerId") as string;

  //getDietDinners
  // const {} = getDietDinners("daqdq"); //przerobić controller

  // useEffect(() => {
  //   if (dinnerProductsQuery && dinnerProductsQuery.length > 0) {
  //     const getRecommendProducts = async () => {
  //       const allDinnerProducts = dinnerProductsQuery.map(
  //         (dinnerProduct) => ({
  //           _id: dinnerProduct._id,
  //           productId: dinnerProduct.product._id,
  //           productName: dinnerProduct.product.name,
  //           dinnerId: dinnerId,
  //           user: dinnerProduct.user,
  //         })
  //       );

  //       console.log({ allDinnerProducts });

  //       try {
  //         setRecommendProducts({ ...recommendProducts, loading: true });

  //         const recommendProductsRes = await axios.post<
  //           IRecommendProductData[]
  //         >(
  //           "https://diet-ai-recommend-server.herokuapp.com/mvp-recommend-products",
  //           allDinnerProducts
  //         );

  //         setRecommendProducts({
  //           ...recommendProducts,
  //           data: recommendProductsRes.data,
  //           loading: false,
  //         });
  //       } catch (e) {
  //         console.log(e);
  //         setRecommendProducts({
  //           ...recommendProducts,
  //           loading: false,
  //           error: true,
  //         });
  //       }
  //     };

  //     getRecommendProducts();
  //   }
  // }, [dinnerProductsQuery]);
  return (
    <Styled.DinnerList>
      {dinners?.map((dinner) => (
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

export default RecommendDinners;

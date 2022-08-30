import React from "react";

//styles
import * as Styled from "../Dinner.styles";

//components
import Image from "components/form/images/image/Image";

//form
import { useFormContext } from "react-hook-form";

//services
import { getDinners } from "services/getDinners";

interface IRecommendDinnersProps {
  changeDinner: (dinnerId: string) => void;
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

  const { dinners, dinnersError, dinnersLoading } = getDinners();
  const selectedDinnerId = watch("dinnerId") as string;

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

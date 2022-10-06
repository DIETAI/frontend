import React from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { useParams } from "react-router";

//styles
import * as Styled from "../Dinner.styles";

//components
import Image from "components/form/images/image/Image";

//form
import { useFormContext } from "react-hook-form";

//icons
import { FaSearch, FaEdit, FaPlus } from "react-icons/fa";

//services
import { getDinners } from "services/getDinners";
import { IDinnerData } from "interfaces/dinner/dinner.interfaces";
import { getDinnerProductsQuery } from "services/getDinnerProducts";

import { IProductData } from "interfaces/product.interfaces";
import { IDietEstablishmentData } from "interfaces/dietEstablishment.interfaces";
import { useDietEstablishment } from "services/useDietEstablishments";
import { getDiet } from "services/getDiets";

const checkDietKindProduct = ({
  product,
  dietEstablishment,
}: {
  product: IProductData;
  dietEstablishment: IDietEstablishmentData;
}) => {
  if (!product.dietKindsExclude || !dietEstablishment.dietKind) {
    return {
      info: "Brak rodzaju diety",
      valid: true,
    };
  }
  if (product.dietKindsExclude.includes(dietEstablishment.dietKind)) {
    return {
      info: "Produkt niedostępny w tym rodzaju diety",
      valid: false,
    };
  }

  return {
    info: "Produkt dostępny w rodzaju diety",
    valid: true,
  };
};

const renderMealType = (mealType: IDinnerData["mealTypes"][0]) => {
  if (mealType === "breakfast") return "Śniadanie";
  if (mealType === "second_breakfast") return "II śniadanie";
  if (mealType === "lunch") return "Obiad";
  if (mealType === "snack") return "Przekąska";
  return "Kolacja";
};

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
          <Dinner
            key={dinner._id}
            dinner={dinner}
            selectDinner={() => changeDinner(dinner._id)}
          />
        ))}
    </Styled.DinnerList>
  );
};

const Dinner = ({
  dinner,
  selectDinner,
}: {
  dinner: IDinnerData;
  selectDinner: (dinnerId: string) => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();
  const { dietEditId } = useParams();
  const navigate = useNavigate();
  const selectedDinnerId = watch("dinnerId") as string;

  if (!dietEditId) return null;
  const { diet } = getDiet(dietEditId);

  if (!diet) return null;

  const { dietEstablishment } = useDietEstablishment(diet.establishmentId);
  const { dinnerProductsQuery } = getDinnerProductsQuery(dinner._id);

  if (!dietEstablishment) return null;

  if (!dinnerProductsQuery) return null;

  const dietDinnerParams = {
    dietId: dietEditId || "",
    editDinnerId: selectedDinnerId || "",
  };

  const checkDinnerProductsDietKind = () => {
    const validProducts = dinnerProductsQuery.map((dinnerProduct) => {
      const validProduct = checkDietKindProduct({
        product: dinnerProduct.product,
        dietEstablishment: dietEstablishment,
      });

      if (!validProduct.valid) {
        return false;
      }

      return true;
    });

    if (validProducts.includes(false)) {
      return false;
    }

    return true;
  };

  return (
    <Styled.DinnerItem
      activeItem={selectedDinnerId === dinner._id}
      key={dinner._id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // dinnerDietKindCheck={checkDinnerProductsDietKind()}
    >
      <Styled.DinnerItemContent>
        <Styled.DinnerItemName>
          {dinner.image && (
            <Image imageId={dinner.image} roundedDataGrid={true} />
          )}

          <h2>{dinner.name}</h2>
        </Styled.DinnerItemName>

        <Styled.DinnerItemOptionsWrapper>
          <Styled.DinnerItemButton
            buttonVariant="add"
            onClick={() => selectDinner(dinner._id)}
            type="button"
            disabled={
              dinnerProductsQuery.length < 1 || selectedDinnerId === dinner._id
            }
            // onClick={() =>
            //   navigate(`/dashboard/diet-establishments/${establishment._id}`)
            // }
          >
            <FaPlus />
          </Styled.DinnerItemButton>
          <Styled.DinnerItemButton
            buttonVariant="view"
            type="button"
            onClick={() =>
              navigate({
                pathname: `/dashboard/dinners/${dinner._id}`,
                search: `?${createSearchParams(dietDinnerParams)}`,
              })
            }
            // onClick={() =>
            //   navigate(`/dashboard/diet-establishments/${establishment._id}`)
            // }
          >
            <FaSearch />
          </Styled.DinnerItemButton>
          <Styled.DinnerItemButton
            buttonVariant="edit"
            type="button"
            onClick={() =>
              navigate({
                pathname: `/dashboard/dinners/edit/${dinner._id}`,
                search: `?${createSearchParams(dietDinnerParams)}`,
              })
            }
            // onClick={() => addEstablishment(establishment._id)}
          >
            <FaEdit />
          </Styled.DinnerItemButton>
        </Styled.DinnerItemOptionsWrapper>
      </Styled.DinnerItemContent>
      <Styled.ErrorWrapper>
        {!checkDinnerProductsDietKind() && (
          <p>Posiłek zawiera produkty niezalecane w tym rodzaju diety</p>
        )}
      </Styled.ErrorWrapper>

      <p>Rodzaj posiłku:</p>
      <Styled.ItemFeaturesWrapper>
        {dinner.mealTypes.map((mealType) => (
          <Styled.ItemFeature key={mealType}>
            {renderMealType(mealType)}
          </Styled.ItemFeature>
        ))}
      </Styled.ItemFeaturesWrapper>
      <p>Produkty:</p>
      <Styled.ItemFeaturesWrapper>
        {dinnerProductsQuery.length > 0 &&
          dinnerProductsQuery.map((dinnerProduct) => (
            <Styled.ProductWrapper
              key={dinnerProduct._id}
              checkDietKindProduct={
                checkDietKindProduct({
                  product: dinnerProduct.product,
                  dietEstablishment: dietEstablishment,
                }).valid
              }
            >
              {dinnerProduct.product.name}
            </Styled.ProductWrapper>
          ))}
        {dinnerProductsQuery.length < 1 && (
          <p>
            Brak produktów w posiłku. Dodaj produkty aby dodać posiłek do diety.
          </p>
        )}
      </Styled.ItemFeaturesWrapper>
    </Styled.DinnerItem>
  );
};

export default AllDinners;

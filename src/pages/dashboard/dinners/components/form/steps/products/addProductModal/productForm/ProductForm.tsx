import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getProduct } from "services/getProducts";

//assets
import NoData from "assets/noData.svg";

//components
import Button from "components/form/button/Button";
import Input from "components/form/input/Input";
import ProductSelect from "../productSelect/ProductSelect";
import Image from "components/form/images/image/Image";

//styles
import * as Styled from "./ProductForm.styles";

//helpers
import { getPortions } from "../helpers/portions.helpers";
import { countMacroPortion } from "../helpers/macro.helper";

//interfaces
import { PortionMacro } from "../helpers/macro.helper";
import { IDinnerProduct } from "../schema/dinnerProduct.schema";

const AddProductFormContent = () => {
  const [selectedPortion, setSelectedPortion] = useState<number>(100);
  const [portionMacrohydrate, setPortionMacrohydrate] =
    useState<PortionMacro>();

  const {
    control,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
    getValues,
  } = useFormContext();

  const selectedProductId = watch("productId") as IDinnerProduct["productId"];
  const defaultAmount = watch("defaultAmount") as number;
  const minAmount = watch("minAmount") as number;
  const maxAmount = watch("maxAmount") as number;
  const portionsGram = watch("portionsGram") as number[];

  console.log({ selectedProductId });

  const { product, productError, productLoading } =
    getProduct(selectedProductId);

  console.log({ product });

  useEffect(() => {
    if (minAmount && maxAmount && defaultAmount) {
      const portions = getPortions({
        minAmount,
        maxAmount,
        defaultAmount,
      });

      return setValue("portionsGram", portions);
    }

    return setValue("portionsGram", []);
  }, [minAmount, maxAmount, defaultAmount]);

  useEffect(() => {
    if (selectedPortion && selectedProductId && product) {
      const portionMacrohydrates = countMacroPortion(selectedPortion, product);
      setPortionMacrohydrate(portionMacrohydrates);
    }
  }, [selectedPortion, selectedProductId, product]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    // const value = !e.currentTarget.value
    //   ? e.currentTarget.value
    //   : parseFloat(parseFloat(e.currentTarget.value).toFixed(1));
    const value = parseFloat(parseFloat(e.currentTarget.value).toFixed(1));
    setValue(e.currentTarget.name, value);
  };

  if (productLoading) return <div>loading</div>;
  if (productError) return <div>error</div>;

  return (
    <Styled.DinnerProductFormWrapper>
      <ProductSelect />
      {!product ? (
        <Styled.EmptyProductWrapper>
          <img src={NoData} />
          <h2>wybierz produkt</h2>
        </Styled.EmptyProductWrapper>
      ) : (
        <Styled.ItemWrapper>
          {product?.image && (
            <Image imageId={product.image} roundedSelect={true} />
          )}

          <Styled.ItemContent>
            <h2>{product?.name}</h2>
            {product?.description && <p> {product.description}</p>}
            <h3>
              Makroskładniki ({selectedPortion ? selectedPortion : "100"}g):
            </h3>
            <Styled.ItemFeaturesWrapper>
              <Styled.ItemFeature>
                B (g): <b>{portionMacrohydrate?.portionProteinGram}</b>
              </Styled.ItemFeature>
              <Styled.ItemFeature>
                T (g): <b>{portionMacrohydrate?.portionFatGram}</b>
              </Styled.ItemFeature>
              <Styled.ItemFeature>
                W (g): <b>{portionMacrohydrate?.portionCarbohydratesGram}</b>
              </Styled.ItemFeature>
              <Styled.ItemFeature>
                Wp (g):
                <b>
                  {portionMacrohydrate?.portionDisgestibleCarbohydratesGram}
                </b>
              </Styled.ItemFeature>
              <Styled.ItemFeature>
                Bł (g): <b>{portionMacrohydrate?.portionFiberGram}</b>
              </Styled.ItemFeature>
              <Styled.ItemFeature>
                Kcal: <b>{portionMacrohydrate?.portionKcal}</b>
              </Styled.ItemFeature>
            </Styled.ItemFeaturesWrapper>
            <h3>Porcje:</h3>
            <Styled.ItemFeaturesWrapper>
              {portionsGram.length > 0 &&
                portionsGram.map((portion) => (
                  <Styled.Portion
                    key={portion}
                    defaultPortion={portion === defaultAmount}
                    selectedPortion={selectedPortion === portion}
                    onClick={() => setSelectedPortion(portion)}
                  >
                    {portion} g
                  </Styled.Portion>
                ))}
            </Styled.ItemFeaturesWrapper>
            <h3>ilość produktu:</h3>
            {/* <Styled.ProductAmountOptionsWrapper>

          </Styled.ProductAmountOptionsWrapper> */}
            <Input
              label="ilość (domyślna)"
              type="number"
              name={`defaultAmount`}
              fullWidth
              controlled
              onChange={handleChange}
            />
            <Input
              label="ilość (min)"
              type="number"
              name={`minAmount`}
              fullWidth
              controlled
              onChange={handleChange}
            />
            <Input
              label="ilość (max)"
              type="number"
              name={`maxAmount`}
              fullWidth
              controlled
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant={!isValid || isSubmitting ? "disabled" : "primary"}
            >
              Dodaj produkt
            </Button>
          </Styled.ItemContent>
        </Styled.ItemWrapper>
      )}
    </Styled.DinnerProductFormWrapper>
  );
};

export default AddProductFormContent;

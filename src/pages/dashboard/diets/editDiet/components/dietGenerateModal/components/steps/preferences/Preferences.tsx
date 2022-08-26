import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { getSubscriptionPlan } from "services/getSubscriptionPlans";

//styles
import * as Styled from "./Preferences.styles";

//components
import CheckBoxWrapper from "components/checkbox/CheckboxWrapper";
import { IDietGeneratePreferencesSchema } from "../../../schema/dietGenerate.schema";
import Input from "components/form/input/Input";
import Autocomplete from "components/form/autocomplete/Autocomplete";
import MultipleAutocomplete from "components/form/multipleAutocomplete/MultipleAutocomplete";
import { getDiet } from "services/getDiets";
import { useParams } from "react-router";
import { getClient } from "services/getClients";
import { getProduct } from "services/getProducts";

const preferencesModalTypeOptions = [
  { id: 1, type: "dinner", name: "potrawy" },
  { id: 2, type: "dinnerGroup", name: "grupa potraw" }, //zupa, napój, danie główne
  { id: 3, type: "product", name: "produkty" },
  { id: 4, type: "productGroup", name: "grupa produktów" },
];
const preferencesActionOptions = [
  { id: 1, type: "always", name: "zawsze" },
  { id: 2, type: "often", name: "często" },
  { id: 3, type: "rarely", name: "rzadko" },
  { id: 4, type: "exclude", name: "wyklucz" },
];

const Preferences = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const { dietEditId } = useParams();

  if (!dietEditId) return null;

  const { diet, dietLoading, dietError } = getDiet(dietEditId);

  if (dietLoading) return <div>loading...</div>;
  if (dietError || !diet) return <div>error...</div>;

  const { client } = getClient(diet.clientId);

  const advancedPreferences = watch(
    "advancedPreferences"
  ) as IDietGeneratePreferencesSchema["advancedPreferences"];

  // const preferencesSettingType = watch(
  //   "preferencesSettingType"
  // ) as IDietGeneratePreferencesSchema["preferencesSettingType"];

  // const checkAllDays = () => {
  //   console.log("all");
  //   setValue("preferencesSettingType", "default");
  // };
  // const openDetailedSettings = () => {
  //   console.log("detail");
  //   setValue("preferencesSettingType", "custom");
  // };

  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
  //   {
  //     control, // control props comes from useForm (optional: if you are using FormContext)
  //     name: `basicPreferences`, // unique name for your Field Array
  //   }
  // );

  // const addBasicPreference = () => {
  //   append({ modelType: "", product: "", action: "", meals: [] });
  // };

  const checkCheapMeals = () => {
    setValue("advancedPreferences.cheapMeals", !advancedPreferences.cheapMeals);
  };
  const checkQuickMeals = () => {
    setValue("advancedPreferences.quickMeals", !advancedPreferences.quickMeals);
  };
  console.log({ diet });

  return (
    <Styled.PreferencesWrapper>
      {/* <p>
        wyklucz posiłki, grupy posiłków i produkty! (bardzo lubię, lubię, nie
        lubię, wyklucz)
      </p> */}
      {/* <Styled.OptionsWrapper> */}
      <h3>rodzaj diety</h3>
      <div>
        lubiane produkty:{" "}
        {client?.likedProducts?.map((productId) => (
          <Product key={productId} productId={productId} />
        ))}
      </div>
      <div>
        nielubiane produkty:{" "}
        {client?.dislikedProducts?.map((productId) => (
          <Product key={productId} productId={productId} />
        ))}
      </div>
      (wukluczyć nieodpowiednie produkty, zwiększyć możliwość losowania jeśli
      produkt występuje częściej lub jest lubiany)
      <h4>częstotliwość występowania produktów w diecie</h4>
      <Styled.Option>
        <CheckBoxWrapper
          onClick={checkCheapMeals}
          checked={advancedPreferences.cheapMeals}
        />
        <span>tanie posiłki</span>
      </Styled.Option>
      <Styled.Option>
        <CheckBoxWrapper
          onClick={checkQuickMeals}
          checked={advancedPreferences.quickMeals}
        />
        <span>szybkie posiłki</span>
      </Styled.Option>
      {/* </Styled.OptionsWrapper> */}
      {/* <button type="button" onClick={addBasicPreference}>
        dodaj własną preferencję
      </button>
      <button type="button">dodaj przykładowe preferencje</button> */}
      {/* {fields.map((field, index) => (
        <div key={field.id}>
          <Autocomplete
            options={preferencesModalTypeOptions}
            optionLabel="name"
            optionRender="type"
            name={`basicPreferences.${index}.modelType`}
            label="typ"
          />
          <Input
            name={`basicPreferences.${index}.product`}
            label="produkt/potrawa/grupa"
          />
          <Autocomplete
            options={preferencesActionOptions}
            optionLabel="name"
            optionRender="type"
            name={`basicPreferences.${index}.action`}
            label="akcja"
          />
          <Input name={`basicPreferences.${index}.meals`} label="posiłki" />
        </div>
      ))} */}
      {/* <Styled.OptionsWrapper>
        <Styled.Option>
          <CheckBoxWrapper
            onClick={checkAllDays}
            checked={preferencesSettingType === "default"}
          />
          <span>zastosuj dla wszystkich dni</span>
        </Styled.Option>
        <Styled.Option>
          <CheckBoxWrapper
            onClick={openDetailedSettings}
            checked={preferencesSettingType === "custom"}
          />
          <span>szczegółowe ustawienia</span>
        </Styled.Option>
      </Styled.OptionsWrapper> */}
      {/* <div>
        <button>pobierz dane z ankiety</button>
        <button>wybierz z dodanych preferencji</button>
        <h1>1. Posiłki</h1>
        <Styled.BoxWrapper>
          <Styled.BoxContentWrapper>
            <p>uwzględnione posiłki</p>
            <Styled.Box>
              <Styled.BoxItem>
                wszystkie posiłki zalecane w danym rodzaju diety
              </Styled.BoxItem>
            </Styled.Box>
          </Styled.BoxContentWrapper>
          <Styled.BoxContentWrapper>
            <p>wykluczone posiłki</p>
            <Styled.Box>
              <Styled.BoxItem>posiłki bogate w tłuszcz</Styled.BoxItem>
            </Styled.Box>
          </Styled.BoxContentWrapper>
        </Styled.BoxWrapper>
        <p>wszystkie posiłki zalecane w danym rodzaju diety</p>
        <p>wyklucz posiłki</p>
        <p>wyklucz posiłki z danym produktem</p>
        <p>generuj dietę z wybranej grupy posiłków</p>
        <p>
          generuj dietę z danych posiłków (jeśli posiłków będzie za mało,
          uzupełnij z innych) - zupa pomidorowa
        </p>
      </div> */}
      {/* <div>
        <h1>2. Płyny</h1>
        <p>kawa 2 razy w ciągu dnia</p>
        <p>herbata 2 razy w ciągu dnia</p>
        <p>woda - średniozmineralizowana</p>
        <p>
          generuj dietę z danych posiłków (jeśli posiłków będzie za mało,
          uzupełnij z innych)
        </p>
      </div>
      <div>
        <h1>3. Suplementacja</h1>
        <p>dodaj suplement/ ilość suplementu</p>
        <p>dodaj lek / ilość leku</p>
        <p>woda - średniozmineralizowana</p>
        <p>
          generuj dietę z danych posiłków (jeśli posiłków będzie za mało,
          uzupełnij z innych)
        </p>
      </div>
      <div>
        <h1>4. Treningi</h1>
        <p>uwzględnij treningi</p>
        <p>posiłki i płyny okołotreningowe</p>
        <p>woda - średniozmineralizowana</p>
        <p>
          generuj dietę z danych posiłków (jeśli posiłków będzie za mało,
          uzupełnij z innych)
        </p>
      </div>
      <div>
        <h1>5. Dodatkowe preferencje</h1>
        <p>szybkie posiłki</p>
        <p>tanie posiłki</p>
        <p>desery</p>
        <p>napoje alkoholowe</p>
        <p>fast foody</p>
      </div> */}
    </Styled.PreferencesWrapper>
  );
};

const Product = ({ productId }: { productId: string }) => {
  const { product, productLoading, productError } = getProduct(productId);

  if (productLoading) return <div>loading...</div>;
  if (productError) return <div>error...</div>;

  return <Styled.ProductWrapper>{product?.name}</Styled.ProductWrapper>;
};

export default Preferences;

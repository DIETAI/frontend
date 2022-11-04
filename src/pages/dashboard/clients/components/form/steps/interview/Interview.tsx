import React from "react";

//components
import Autocomplete from "components/form/autocomplete/Autocomplete";
import { getProducts } from "services/getProducts";
import MultipleAutocomplete from "components/form/multipleAutocomplete/MultipleAutocomplete";

const palOptions = [
  { id: 1, value: 1.3, type: "niska", description: "niska aktywność fizyczna" },
  { id: 2, value: 1.4, type: "niska", description: "niska aktywność fizyczna" },
  {
    id: 3,
    value: 1.5,
    type: "średnia",
    description: "średnia aktywność fizyczna",
  },
  {
    id: 4,
    value: 1.6,
    type: "średnia",
    description: "średnia aktywność fizyczna",
  },
  {
    id: 5,
    value: 1.7,
    type: "średnia",
    description: "średnia aktywność fizyczna",
  },
  {
    id: 6,
    value: 1.8,
    type: "wysoka",
    description: "wysoka aktywność fizyczna",
  },
  {
    id: 7,
    value: 1.9,
    type: "wysoka",
    description: "wysoka aktywność fizyczna",
  },
  {
    id: 8,
    value: 2.0,
    type: "wysoka",
    description: "wysoka aktywność fizyczna",
  },
  {
    id: 9,
    value: 2.1,
    type: "wysoka",
    description: "wysoka aktywność fizyczna",
  },
  {
    id: 10,
    value: 2.2,
    type: "wysoka",
    description: "wysoka aktywność fizyczna",
  },
];

const mealsInDiet = [
  { id: 1, amount: "mniej" },
  { id: 2, amount: "3" },
  { id: 3, amount: "4-5" },
  { id: 4, amount: "więcej" },
];

const animalProteinInDiet = [
  { id: 1, amount: "we wszystkich posiłkach" },
  { id: 2, amount: "75% posiłków" },
  { id: 3, amount: "50% posiłków" },
  { id: 4, amount: "w mniejszej ilości posiłków" },
];

const vegetablesFruitInDiet = [
  { id: 1, amount: "codziennie w paru posiłkach" },
  { id: 2, amount: "codziennie" },
  { id: 3, amount: "minimum 5 razy w tygodniu" },
  { id: 4, amount: "rzadziej" },
];

const milkInDiet = [
  { id: 1, amount: "codziennie" },
  { id: 2, amount: "75% dni" },
  { id: 3, amount: "50% dni" },
  { id: 4, amount: "rzadziej" },
];

const Interview = () => {
  const { products, productsLoading, productsError } = getProducts();

  if (productsLoading) return <div>loading...</div>;
  if (productsError) return <div>error...</div>;
  return (
    <>
      <Autocomplete
        name="pal"
        fullWidth
        label={`pal *`}
        options={palOptions}
        optionLabel={"value"}
        optionRender={"value"}
      />
      <MultipleAutocomplete
        name="likedProducts"
        fullWidth
        label={`lubiane produkty`}
        options={products as []}
        optionLabel={"name"}
        optionRender={"_id"}
      />
      <MultipleAutocomplete
        name="dislikedProducts"
        fullWidth
        label={`nielubiane produkty`}
        options={products as []}
        optionLabel={"name"}
        optionRender={"_id"}
      />

      <div>
        {/* <h3>jakościowa ocena jadłospisu</h3>
        <Autocomplete
          name="mealsInDiet"
          fullWidth
          label={`liczba posiłków w ciągu dnia`}
          options={mealsInDiet}
          optionLabel={"amount"}
          optionRender={"amount"}
        />
        <Autocomplete
          name="milkInDiet"
          fullWidth
          label={`Częstość występowania mleka lub serów`}
          options={milkInDiet}
          optionLabel={"amount"}
          optionRender={"amount"}
        />
        <Autocomplete
          name="milkInDiet"
          fullWidth
          label={`Częstość występowania mleka lub serów`}
          options={milkInDiet}
          optionLabel={"amount"}
          optionRender={"amount"}
        />
        <Autocomplete
          name="animalProteinInDiet"
          fullWidth
          label={`Liczba posiłków w których występują produkty dostarczające białka zwierzęcego`}
          options={animalProteinInDiet}
          optionLabel={"amount"}
          optionRender={"amount"}
        />
        <Autocomplete
          name="vegetablesFruitInDiet"
          fullWidth
          label={`Częstotliwość występowania warzyw lub owoców`}
          options={vegetablesFruitInDiet}
          optionLabel={"amount"}
          optionRender={"amount"}
        /> */}
        {/* <h3>pytania o styl życia</h3> */}

        {/* <p>- dyscyplina sportu</p>
        <p>- ile treningów w ciągu dnia (tygodnia) i rodzaj treningu</p>
        <p>- liczba posiłków w ciągu dnia</p>
        <p>- liczba posiłków w których występuje białko zwierzęce</p>
        <p>- częstotliwość występowania mleka lub serów</p>
        <p>- częstotliwość występowania warzyw i owoców</p>
        <p>- ocena wyglądu</p>
        <p>- pytania o rodzinę</p>
        <p>- umiejętności kulinarne</p>
        <p>- ile wydaje na jedzenie</p>
        <p>- czy je słodycze</p>
        <p>- czy palisz paperosy</p>
        <p>- jak dużo pijesz alkoholu</p>
        <p>- ile czasu spędza w pracy, o której wstaje i zasypia</p> */}
      </div>
    </>
  );
};

export default Interview;

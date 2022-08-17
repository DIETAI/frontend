import React from "react";

//components
import Autocomplete from "components/form/autocomplete/Autocomplete";

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

const Interview = () => {
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
      <p>lubiane produkty</p>
      <p>nielubiane produkty</p>
      <div>
        <h3>jakościowa ocena jadłospisu</h3>
        <p>- dyscyplina sportu</p>
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
        <p>- ile czasu spędza w pracy, o której wstaje i zasypia</p>
      </div>
    </>
  );
};

export default Interview;

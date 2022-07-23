import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getSubscriptionPlan } from "services/getSubscriptionPlans";

//styles
import * as Styled from "./Preferences.styles";

//components
import CheckBoxWrapper from "components/checkbox/CheckboxWrapper";
import { IDietGeneratePreferencesSchema } from "../../../schema/dietGenerate.schema";

const Preferences = () => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    trigger,
  } = useFormContext();

  const preferencesSettingType = watch(
    "preferencesSettingType"
  ) as IDietGeneratePreferencesSchema["preferencesSettingType"];

  const checkAllDays = () => {
    console.log("all");
    setValue("preferencesSettingType", "default");
  };
  const openDetailedSettings = () => {
    console.log("detail");
    setValue("preferencesSettingType", "custom");
  };

  return (
    <Styled.PreferencesWrapper>
      <Styled.OptionsWrapper>
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
      </Styled.OptionsWrapper>
      <div>
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
      </div>
      <div>
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
      </div>
    </Styled.PreferencesWrapper>
  );
};

export default Preferences;

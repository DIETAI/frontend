import React, { useState } from "react";
import { useParams } from "react-router";
import { getDiet, getDietPopulate, getDietQuery } from "services/getDiets";
import ReactLoading from "react-loading";
import { dietsNavLinks } from "../utils/navLinks";

//components
import DietNav from "./components/nav/DietNav";
import DietContent from "./components/content/DietContent";
import ManyDaysView from "./components/views/manyDaysView/days/Days";
import OneDayView from "./components/views/oneDayView/OneDayView";
import PageNav from "components/pageNav/PageNav";

//styles
import * as Styled from "./EditDietPage.styles";

export type DaysView = "oneDay" | "manyDays";

const EditDiet = () => {
  const [view, setView] = useState<DaysView>("manyDays");
  const { dietEditId } = useParams();

  if (!dietEditId) return <div>not found</div>;

  // const { diet, dietError, dietLoading } = getDiet(dietEditId);
  const { diet, dietLoading, dietError } = getDietPopulate(dietEditId);

  if (dietLoading)
    return (
      <Styled.LoadingWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ReactLoading type="spin" color="blue" height={50} width={50} />
        <h2>Pobieranie diety</h2>
      </Styled.LoadingWrapper>
    );

  if (dietError || !diet)
    return (
      <Styled.EmptyDataWrapper>
        <h2>pobieranie danych diety nie powiodło się</h2>
      </Styled.EmptyDataWrapper>
    );

  return (
    <>
      <PageNav
        headingTitle={"Jadłospisy"}
        pageNavLinks={[
          ...dietsNavLinks,
          // {
          //   id: dietsNavLinks.length + 1,
          //   title: diet.name || "jadłospis",
          //   path: `/dashboard/diets/edit/${dietEditId}`,
          // },
        ]}
      />
      <DietNav
        setView={setView}
        view={view}
        dietId={diet._id}
        dietName={diet.name}
      />
      <DietContent>
        {view === "oneDay" ? <OneDayView /> : <ManyDaysView />}
      </DietContent>
    </>
  );
};

export default EditDiet;

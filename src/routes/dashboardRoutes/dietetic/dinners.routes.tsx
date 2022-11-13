import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";
import {
  AllDinners,
  NewDinner,
  EditDinner,
  Dinner,
} from "pages/dashboard/dinners";

//components
import PageNav from "components/pageNav/PageNav";

const dinnerNavLinks = [
  { id: 1, title: "wszystkie posiłki", path: "/dashboard/dinners" },
  { id: 2, title: "nowy posiłek", path: "/dashboard/dinners/new" },
  // { id: 3, title: "grupy posiłków", path: "/dashboard/dinners/groups" },
];

const DinnerRoutes = () => {
  return (
    <>
      {/* <PageNav headingTitle={"Posiłki"} pageNavLinks={dinnerNavLinks} /> */}
      <Routes>
        <Route path="/" element={<AllDinners />} />
        <Route path="/new" element={<NewDinner />} />
        <Route path="/edit/:dinnerId" element={<EditDinner />} />
        <Route path="/:dinnerId" element={<Dinner />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default DinnerRoutes;

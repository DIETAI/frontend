import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "pages/information/notFound/notFound.page";
import {
  AllClients,
  NewClient,
  EditClient,
  Client,
} from "pages/dashboard/clients";

//components
import PageNav from "components/pageNav/PageNav";

const clientNavLinks = [
  { id: 1, title: "wszyscy klienci", path: "/dashboard/clients" },
  { id: 2, title: "grupy klientów", path: "/dashboard/clients/groups" },
  { id: 3, title: "nowy klient", path: "/dashboard/clients/new" },
];

const ClientRoutes = () => {
  //useSwr check userRole
  return (
    //add page heading and nav
    <>
      <PageNav headingTitle={"Klienci"} pageNavLinks={clientNavLinks} />
      <Routes>
        <Route path="/" element={<AllClients />} />
        <Route path="/new" element={<NewClient />} />
        <Route path="/edit/:clientId" element={<EditClient />} />
        <Route path="/:clientId" element={<Client />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ClientRoutes;

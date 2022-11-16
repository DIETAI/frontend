import React from "react";
import { useParams } from "react-router";
import { getClient } from "services/getClients";
import { Link } from "react-router-dom";
import { clientNavLinks } from "../utils/navLinks";

//styles
import * as Styled from "./ClientPage.styles";

//icons
import { FaInfoCircle } from "react-icons/fa";

//components
import PageNav from "components/pageNav/PageNav";
import ClientContent from "./components/content/ClientContent";
import ClientSidebar from "./components/sidebar/ClientSidebar";
import { clientSidebarSections } from "./components/sidebar/sections";

const Client = () => {
  const { clientId } = useParams();
  if (!clientId) return null;

  const { client, clientError, clientLoading } = getClient(clientId);

  return (
    <>
      <PageNav
        headingTitle={"Pacjenci"}
        pageNavLinks={[
          ...clientNavLinks,
          {
            id: clientNavLinks.length + 1,
            title: "pacjent",
            path: `/dashboard/clients/${clientId}`,
          },
        ]}
      />
      <Styled.ClientContainer>
        <ClientContent />
        <ClientSidebar
          title={"Dane pacjenta"}
          icon={<FaInfoCircle />}
          sections={clientSidebarSections}
        />
      </Styled.ClientContainer>
    </>
  );
};

export default Client;

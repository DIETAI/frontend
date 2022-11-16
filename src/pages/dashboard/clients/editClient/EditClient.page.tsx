import React from "react";
import { useParams } from "react-router";
import { clientNavLinks } from "../utils/navLinks";

//components
import EditClientForm from "./components/EditClientForm";
import PageNav from "components/pageNav/PageNav";

//services
import { getClient } from "services/getClients";

const EditClient = () => {
  const { clientId } = useParams();
  console.log({ clientId });

  if (!clientId) return <div>not found</div>;

  const { client, clientError, clientLoading } = getClient(clientId);

  if (clientLoading) return <div>client loading...</div>;
  if (clientError || !client) return <div>client error</div>;

  console.log({ client });
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
          {
            id: clientNavLinks.length + 2,
            title: "edytuj pacjenta",
            path: `/dashboard/clients/edit/${clientId}`,
          },
        ]}
      />
      <EditClientForm client={client} />
    </>
  );
};

export default EditClient;

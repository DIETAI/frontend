import React from "react";
import { useParams } from "react-router";

//components
import EditClientForm from "./components/EditClientForm";

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
  return <EditClientForm client={client} />;
};

export default EditClient;

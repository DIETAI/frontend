import React from "react";
import { useParams } from "react-router";
import { getClient } from "services/getClients";
import { Link } from "react-router-dom";

const Client = () => {
  const { clientId } = useParams();

  if (!clientId) return null;

  const { client, clientError, clientLoading } = getClient(clientId);

  return (
    <div>
      <h2>
        {client?.name} {client?.lastName}
      </h2>
      <Link to={`/dashboard/clients/edit/${clientId}`}>edytuj</Link>
    </div>
  );
};

export default Client;

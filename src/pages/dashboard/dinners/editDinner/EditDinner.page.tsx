import React from "react";
import { useParams, useNavigate } from "react-router";
import { getDinner } from "services/getDinners";
import { dinnerNavLinks } from "../utils/navLinks";

//components
import EditDinnerForm from "./components/EditDinnerForm";
import PageNav from "components/pageNav/PageNav";

const EditDinner = () => {
  const { dinnerId } = useParams();
  console.log({ dinnerId });

  if (!dinnerId) return <div>not found</div>;

  const { dinner, dinnerError, dinnerLoading } = getDinner(dinnerId);

  if (dinnerLoading) return <div>dinner loading...</div>;
  if (dinnerError || !dinner) return <div>dinner error</div>;

  console.log({ dinner });

  return (
    <>
      <PageNav
        headingTitle={"Posiłki"}
        pageNavLinks={[
          ...dinnerNavLinks,
          {
            id: dinnerNavLinks.length + 1,
            title: "posiłek",
            path: `/dashboard/dinners/${dinnerId}`,
          },
          {
            id: dinnerNavLinks.length + 2,
            title: "edytuj posiłek",
            path: `/dashboard/dinners/edit/${dinnerId}`,
          },
        ]}
      />
      <EditDinnerForm dinner={dinner} />
    </>
  );
};

export default EditDinner;

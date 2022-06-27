import React from "react";
import { useTranslation } from "react-i18next";
import { getSubscriptionPlans } from "services/getSubscriptionPlans";

//date-fns
import format from "date-fns/format";

//components
import DataGrid from "../../components/dataGrid/DataGrid";

const availableColumns = [
  { label: "nazwa", key: "name" },
  { label: "data", key: "createdAt" },
  { label: "cena", key: "price" },
  { label: "krótki opis", key: "shortDescription" },
  { label: "opis", key: "description" },
];

const AllSubscriptionPlans = () => {
  const { t } = useTranslation();
  const {
    subscriptionPlans,
    subscriptionPlansError,
    subscriptionPlansLoading,
  } = getSubscriptionPlans();

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (subscriptionPlansError || !subscriptionPlans)
    return <div>subscriptionPlans error</div>;

  const subscriptionPlanList = () => {
    const modifySubscriptionPlans = subscriptionPlans.map((data) => ({
      ...data,
      image: "",
      createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    }));

    return modifySubscriptionPlans;
  };

  const deleteSubscriptionPlans = () => {
    return;
  };

  return (
    <>
      <DataGrid
        loading={subscriptionPlansLoading}
        availableColumns={availableColumns}
        dataRows={subscriptionPlanList() as any}
        deleteAction={deleteSubscriptionPlans}
        linkPage="/dashboard/admin/subscriptionPlans"
      />
    </>
  );
};

export default AllSubscriptionPlans;

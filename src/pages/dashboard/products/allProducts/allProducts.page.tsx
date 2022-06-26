import React from "react";
import { useTranslation } from "react-i18next";
import { getProducts } from "services/getProducts";

//date-fns
import format from "date-fns/format";

//components
import PageHeading from "pages/dashboard/components/pageHeading/PageHeading";
import DataGrid from "../../components/dataGrid/DataGrid";
import Section from "../components/section/Section";

const availableColumns = [
  { label: "nazwa", key: "name" },
  { label: "kcal", key: "kcal" },
  { label: "białko (g)", key: "proteinGram" },
  { label: "tłuszcze (g)", key: "fatGram" },
];

const AllProducts = () => {
  const { t } = useTranslation();
  const { products, productsError, productsLoading } = getProducts();

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (productsError || !products) return <div>products error</div>;

  const productsList = () => {
    const modifyProducts = products.map((data) => ({
      ...data,
      createdAt: format(new Date(data.createdAt), "dd.MM.yyyy"),
    }));

    return modifyProducts;
  };

  const deleteProducts = () => {
    return;
  };

  return (
    <>
      <DataGrid
        loading={productsLoading}
        availableColumns={availableColumns}
        dataRows={productsList() as any}
        deleteAction={deleteProducts}
        linkPage="/dashboard/products"
      />
    </>
  );
};

export default AllProducts;

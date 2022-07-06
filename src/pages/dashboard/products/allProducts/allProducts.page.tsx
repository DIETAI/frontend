import React from "react";
import { useTranslation } from "react-i18next";
import { getProducts } from "services/getProducts";

//date-fns
import format from "date-fns/format";

//components
import PageHeading from "pages/dashboard/components/pageHeading/PageHeading";
import DataGrid from "../../components/dataGridv2/DataGrid";
import Section from "../components/section/Section";

//interfaces
import { IColumn } from "pages/dashboard/components/dataGridv2/DataGrid.interfaces";

const columns: IColumn[] = [
  { label: "zdjęcie", key: "image", type: "image" },
  { label: "nazwa", key: "name", type: "text" },
  { label: "kcal", key: "kcal", type: "number" },
  { label: "białka (g)", key: "proteinGram", type: "number" },
  { label: "tłuszcze (g)", key: "fatGram", type: "number" },
  { label: "węglowodany (g)", key: "carbohydratesGram", type: "number" },
  { label: "błonnik (g)", key: "fiberGram", type: "number" },
  {
    label: "węglowodany przyswajalne (g)",
    key: "digestableCarbohydratesGram",
    type: "number",
  },
];

const AllProducts = () => {
  const { t } = useTranslation();
  const { products, productsError, productsLoading } = getProducts();

  // if (measurementsLoading) return <div>measurements loading...</div>;
  if (productsError || !products) return <div>products error</div>;

  const productsData = products?.map((data) => ({
    _id: data._id,
    image: data.image,
    name: data.name,
    kcal: data.kcal,
    proteinGram: data.protein.gram,
    fatGram: data.fat.gram,
    carbohydratesGram: data.carbohydrates.gram,
    fiberGram: data.fiber.gram,
    digestableCarbohydratesGram: data.digestableCarbohydrates.gram,
  }));

  const deleteProducts = () => {
    return;
  };

  return (
    <>
      <DataGrid
        columns={columns}
        addLink="/dashboard/products/new"
        link="/dashboard/products"
        exportAction={() => console.log("open export popup")}
        data={productsData}
        loadingData={productsLoading}
      />
    </>
  );
};

export default AllProducts;

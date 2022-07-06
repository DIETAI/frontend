import React, { useState } from "react";
import { useNavigate } from "react-router";

//icons
import { FaCog } from "icons/icons";

//components
import ListNav from "../listNav/ListNav";
import CheckBoxWrapper from "components/checkbox/CheckboxWrapper";
import IconButton from "components/iconButton/IconButton";
import IconModal from "components/iconModal/IconModal";
import Image from "components/form/images/image/Image";

//interfaces
import { IDataGridProps } from "../../DataGrid.interfaces";

//styles
import * as Styled from "./DataGridLineView.styles";

interface IDataGridLineViewProps {
  columns: IDataGridProps["columns"];
  data: any[];
  linkPage: string;
}

interface IRenderContent {
  type: "text" | "number" | "image" | "images";
  key: string;
  row: any;
}

const DataGridLineView = ({
  columns,
  data,
  linkPage,
}: IDataGridLineViewProps) => {
  const navigate = useNavigate();
  const [displayColumns, setDisplayColumns] = useState(columns.slice(0, 6));

  const changeDisplayColumns = (columns: any) => {
    setDisplayColumns(columns);
  };

  const renderContent = ({ type, key, row }: IRenderContent) => {
    if (type === "image") {
      return <Image imageId={row[key]} roundedDataGrid={true} />;
    }

    return <p>{row[key]}</p>;
  };

  //establishment["protein"]["gram"] keys=["protein", "gram"]
  return (
    <>
      <ListNav
        columns={columns}
        displayColumns={displayColumns}
        changeDisplayColumns={changeDisplayColumns}
      />
      <Styled.RowsWrapper>
        {data.map((row) => (
          <Styled.Row
            key={row._id}
            onClick={() => {
              navigate(`${linkPage}/${row._id}`);
            }}
          >
            <Styled.ListConfig>
              <CheckBoxWrapper
                // onClick={(e: React.ChangeEvent<HTMLButtonElement>) => {
                //   e.stopPropagation();
                //   e.preventDefault();
                //   handleCheckedRows(row);
                // }}
                // checked={checkedRows.includes(row)}
                onClick={() => console.log("hello")}
                checked={false}
              />
            </Styled.ListConfig>
            {displayColumns.map((column) => (
              <Styled.RowItem key={column.key}>
                {renderContent({
                  type: column.type,
                  key: column.key,
                  row,
                })}
              </Styled.RowItem>
            ))}

            <Styled.ListConfig>
              <IconModal
                icon={<FaCog />}
                // onClick={() => navigate(`${linkPage}/edit/${row._id}`)}
              >
                <li>zobacz</li>
                <li>edytuj</li>
                <li>usuń</li>
              </IconModal>
            </Styled.ListConfig>
          </Styled.Row>
        ))}
      </Styled.RowsWrapper>
    </>
  );
};

export default DataGridLineView;

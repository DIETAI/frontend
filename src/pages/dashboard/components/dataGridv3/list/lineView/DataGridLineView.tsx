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
import NoImage from "assets/noImage.svg";

//interfaces
import { IDataGridListProps } from "../DataGridList.interfaces";

//styles
import * as Styled from "./DataGridLineView.styles";

//context
import { useDataGridSelect } from "../../context/DataGridSelect.context";

interface IDataGridLineViewProps {
  columns: IDataGridListProps["columns"];
  data: any[];
  linkPage: string;
  initialDataLength: number;
  editLink: string;
  deleteAction: () => void;
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
  editLink,
  deleteAction,
  initialDataLength,
}: IDataGridLineViewProps) => {
  const { selectedItems, checkItem, unCheckItem } = useDataGridSelect();
  const navigate = useNavigate();
  const [displayColumns, setDisplayColumns] = useState(columns.slice(0, 6));

  const changeDisplayColumns = (columns: any) => {
    setDisplayColumns(columns);
  };

  const renderContent = ({ type, key, row }: IRenderContent) => {
    if (type === "image") {
      const imageURL = row[key];
      // return <Image imageId={row[key]} roundedDataGrid={true} />;
      return (
        <Styled.RowItemImageWrapper>
          <img src={imageURL || NoImage} />
        </Styled.RowItemImageWrapper>
      );
    }

    return <p>{row[key]}</p>;
  };

  const handleSelectItem = (
    e: React.ChangeEvent<HTMLButtonElement>,
    itemId: string
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (selectedItems.includes(itemId)) {
      return unCheckItem(itemId);
    }

    return checkItem(itemId);
  };

  //establishment["protein"]["gram"] keys=["protein", "gram"]
  return (
    <>
      <ListNav
        data={data}
        columns={columns}
        displayColumns={displayColumns}
        changeDisplayColumns={changeDisplayColumns}
        initialDataLength={initialDataLength}
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
                onClick={(e) => handleSelectItem(e, row._id)}
                checked={selectedItems.includes(row._id)}
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
                <Styled.ListConfigModalItem
                  onClick={() => {
                    navigate(`${linkPage}/${row._id}`);
                  }}
                >
                  zobacz
                </Styled.ListConfigModalItem>
                <Styled.ListConfigModalItem
                  onClick={() => {
                    navigate(`${editLink}/${row._id}`);
                  }}
                >
                  edytuj
                </Styled.ListConfigModalItem>
                <Styled.ListConfigModalItem onClick={deleteAction}>
                  usuń
                </Styled.ListConfigModalItem>
              </IconModal>
            </Styled.ListConfig>
          </Styled.Row>
        ))}
      </Styled.RowsWrapper>
    </>
  );
};

export default DataGridLineView;

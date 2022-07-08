import React from "react";

//styles
import * as Styled from "./ListNav.styles";

//icons
import { FaCog } from "icons/icons";

//components
import CheckBoxWrapper from "components/checkbox/CheckboxWrapper";
import IconModal from "components/iconModal/IconModal";
import ColumnsModal from "./columnsModal/ColumnsModal";

//interfaces
import { IDataGridListProps } from "../DataGridList.interfaces";

//context
import { useDataGridSelect } from "../../context/DataGridSelect.context";

interface IListNavProps {
  columns: IDataGridListProps["columns"];
  changeDisplayColumns: (columns: any) => void;
  displayColumns: any[];
  data: any[];
}

const ListNav = ({
  columns,
  changeDisplayColumns,
  displayColumns,
  data,
}: IListNavProps) => {
  const { checkAllItems, unCheckAllItems, selectedItems } = useDataGridSelect();

  const handleCheckedRows = () => {
    if (selectedItems.length === data.length) {
      return unCheckAllItems();
    }
    return checkAllItems(data.map((item) => item._id));
  };
  return (
    <Styled.ListNavWrapper>
      <Styled.ListNavConfig>
        <CheckBoxWrapper
          onClick={handleCheckedRows}
          checked={selectedItems.length === data.length}
        />
      </Styled.ListNavConfig>

      <>
        {displayColumns.map((heading) => (
          <Styled.ListNavItem key={heading.key}>
            <p> {heading.label}</p>
          </Styled.ListNavItem>
        ))}

        <Styled.ListNavConfig>
          <IconModal icon={<FaCog />}>
            <ColumnsModal
              columns={columns}
              displayColumns={displayColumns}
              changeDisplayColumns={changeDisplayColumns}
            />
          </IconModal>
        </Styled.ListNavConfig>
      </>
    </Styled.ListNavWrapper>
  );
};

export default ListNav;

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
import { IDataGridProps } from "../../DataGrid.interfaces";

interface IListNavProps {
  columns: IDataGridProps["columns"];
  changeDisplayColumns: (columns: any) => void;
  displayColumns: any[];
}

const ListNav = ({
  columns,
  changeDisplayColumns,
  displayColumns,
}: IListNavProps) => {
  const handleCheckedRows = () => {
    console.log("checked");
  };
  return (
    <Styled.ListNavWrapper>
      <Styled.ListNavConfig>
        <CheckBoxWrapper
          onClick={handleCheckedRows}
          checked={false}
          //   checked={checkedRows.length === dataRows.length}
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

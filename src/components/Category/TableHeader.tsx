import React from "react";
import { manipulationString  } from "../../utils/helper";
import {TableHeaderContainer, TableHeaderCell} from '@src/styles/TableHeaderStyles';
interface TableHeaderProps {
  headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <TableHeaderContainer>
      <tr>
        {headers.map((header) => (
          <TableHeaderCell key={header}>
            {manipulationString('capitalizeChar',(manipulationString('formatAttributeName',header))  as string)}
          </TableHeaderCell>
        ))}
        <TableHeaderCell>Actions</TableHeaderCell>
      </tr>
    </TableHeaderContainer>
  );
};

export default TableHeader;
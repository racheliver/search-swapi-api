import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Form from "./Form/Form";
import { useCategory } from "../../hooks/useCategory";
import {
  TableContainer,
  ListHeader,
  ListTitle,
  AddButton,
  EntityTable,
  LoadingContainer,
  GoToStartButton,
  StyledSwitch,
} from "@src/styles/CategoryStyles";
import CircularProgress from "@mui/material/CircularProgress";
import { Tooltip } from "@mui/material";
import restartIcon from "../../assets/restart.png";
import { IItem } from "../../types/itemTypes";

const Category: React.FC = () => {
  const {
    entityDefinition,
    items,
    loading,
    formState,
    setFormState,
    removeItemById,
    handleAddItem,
    handleRefreshClick,
  } = useCategory();

  const [showTable, setShowTable] = useState(false);
  const { title = "", name = "", attributes = [] } = entityDefinition || {};

  useEffect(() => {
    if (name === "people") {
      setShowTable(true);
    }
  }, [name]);

  const handleToggleTable = () => {
    if (name !== "people") {
      setShowTable((prevShowTable) => !prevShowTable);
    }
  };

  return (
    <TableContainer>
      <ListHeader>
        <ListTitle className="list-title">{title}</ListTitle>
        <div>
          {showTable && (
            <>
              <AddButton onClick={() => setFormState(true)}>Create</AddButton>
              <Tooltip title="Let's start over... Restart Tables" arrow>
                <GoToStartButton onClick={handleRefreshClick}>
                  <img src={restartIcon} alt="Restart Icon" />
                </GoToStartButton>
              </Tooltip>
            </>
          )}
          {name !== "people" && (
            <Tooltip title="Show/Hide Table" arrow>
              <StyledSwitch
                checked={showTable}
                onChange={handleToggleTable}
                inputProps={{ "aria-label": "Show or Hide Table" }}
              />
            </Tooltip>
          )}
        </div>
      </ListHeader>

      {loading && showTable ? (
        <LoadingContainer>
          <div>
            <CircularProgress color="inherit" />
            <div>Loading...</div>
          </div>
        </LoadingContainer>
      ) : (
        showTable && (
          <EntityTable>
            <TableHeader headers={attributes} />
            <tbody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  entityListData={item}
                  attributes={attributes}
                  removeItemById={() => removeItemById(item.id)}
                  category={name}
                />
              ))}
            </tbody>
          </EntityTable>
        )
      )}

      {formState && (
        <Form
          type="add"
          open={formState}
          close={() => setFormState(false)}
          attributes={attributes}
          entityListData={{} as IItem}
          handleAddItem={handleAddItem}
        />
      )}
    </TableContainer>
  );
};

export default Category;

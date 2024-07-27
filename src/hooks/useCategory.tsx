import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useItemContext } from "../context/ItemContext";
import {
  fetchEntityDataAndSetState,
  ENTITY_DEFINITIONS,
} from "../utils/StarWarsAPI";
import { IItem } from '../types/itemTypes';

export const useCategory = () => {
  const { category } = useParams<{ category?: string }>();
  const entityDefinition = category ? ENTITY_DEFINITIONS[category] : null;
  const { state, dispatch } = useItemContext();
  const [formState, setFormState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (entityDefinition) {
      setLoading(true);
      dispatch({ type: 'SET_CURRENT_CATEGORY', payload: entityDefinition.name });
      if (state.cachedData[entityDefinition.name]) {
        setLoading(false);
      } else {
        fetchEntityDataAndSetState(entityDefinition.name, (data) => {
          dispatch({ type: 'SET_CATEGORY_DATA', payload: { category: entityDefinition.name, data } });
          setLoading(false);
        });
      }
    }
  }, [entityDefinition, dispatch, state.cachedData]);

  const removeItemById = (id: string) => {
    if (entityDefinition) {
      dispatch({
        type: "DELETE_ITEM",
        payload: { id, category: entityDefinition.name },
      });
    }
  };

  const handleAddItem = (newItem: IItem) => {
    if (entityDefinition) {
      dispatch({
        type: "ADD_ITEM",
        payload: { ...newItem, category: entityDefinition.name },
      });
      setFormState(false);
    }
  };

  const handleRefreshClick = () => {
    navigate(0);
  };

  const items = entityDefinition ? state.cachedData[entityDefinition.name] || [] : [];

  return {
    entityDefinition,
    items,
    loading,
    formState,
    setFormState,
    removeItemById,
    handleAddItem,
    handleRefreshClick,
  };
};
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { State, Action } from '../types/itemTypes';
import { v4 as uuid } from 'uuid';

const initialState: State = {
  cachedData: {},
  currentCategory: null,
};

const itemReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM':
       const newItem = action.payload.id ? action.payload : { ...action.payload, id: uuid() };
      return {
        ...state,
        cachedData: {
          ...state.cachedData,
          [action.payload.category]: [...(state.cachedData[action.payload.category] || []), newItem]
        }
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        cachedData: {
          ...state.cachedData,
          [action.payload.category]: state.cachedData[action.payload.category].map((item) =>
            item.id === action.payload.id ? action.payload : item
          )
        }
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        cachedData: {
          ...state.cachedData,
          [action.payload.category]: state.cachedData[action.payload.category].filter((item) => item.id !== action.payload.id)
        }
      };
    case 'SET_CATEGORY_DATA':
      return {
        ...state,
        cachedData: {
          ...state.cachedData,
          [action.payload.category]: action.payload.data
        }
      };
    case 'SET_CURRENT_CATEGORY':
      return {
        ...state,
        currentCategory: action.payload
      };
    default:
      return state;
  }
};

const ItemContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, initialState);

  return (
    <ItemContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
};
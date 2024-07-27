import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { ItemProvider, useItemContext } from '@src/context/ItemContext';

describe('ItemContext', () => {
  it('provides the correct initial state', () => {
    const TestComponent = () => {
      const { state } = useItemContext();
      return <div data-testid="state">{JSON.stringify(state)}</div>;
    };

    const { getByTestId } = render(
      <ItemProvider>
        <TestComponent />
      </ItemProvider>
    );

    const stateElement = getByTestId('state');
    expect(JSON.parse(stateElement.textContent || '{}')).toEqual({
      cachedData: {},
      currentCategory: null,
    });
  });

  describe('ItemContext', () => {
    it('edits state correctly when dispatching actions', async () => {
      const TestComponent = () => {
        const { state, dispatch } = useItemContext();
        React.useEffect(() => {
          dispatch({
            type: 'ADD_ITEM',
            payload: { category: 'people', name: 'Luke Skywalker', height: '172', mass: '77', id: '1' },
          });
          dispatch({
            type: 'EDIT_ITEM',
            payload: { category: 'people', id: '1', name: 'Luke Skywalker Updated', height: '174', mass: '80' },
          });
        }, [dispatch]);
  
        return <div data-testid="state">{JSON.stringify(state)}</div>;
      };
  
      const { getByTestId } = render(
        <ItemProvider>
          <TestComponent />
        </ItemProvider>
      );
  
      await waitFor(() => {
        const stateElement = getByTestId('state');
        const updatedState = JSON.parse(stateElement.textContent || '{}');
        expect(updatedState.cachedData.people).toBeDefined();
        const editedItem = updatedState.cachedData.people.find((item: { id: string; }) => item.id === '1');
        expect(editedItem).toBeDefined();
        expect(editedItem?.name).toBe('Luke Skywalker Updated');
        expect(editedItem?.height).toBe('174');
        expect(editedItem?.mass).toBe('80');
      });
    });
  
    it('deletes an item correctly when dispatching a delete action', async () => {
      const TestComponent = () => {
        const { state, dispatch } = useItemContext();
        React.useEffect(() => {
          dispatch({
            type: 'ADD_ITEM',
            payload: { category: 'people', name: 'Obi-Wan Kenobi', height: '182', mass: '77', id: '2' },
          });
          dispatch({
            type: 'DELETE_ITEM',
            payload: { category: 'people', id: '2' },
          });
        }, [dispatch]);
  
        return <div data-testid="state">{JSON.stringify(state)}</div>;
      };
  
      const { getByTestId } = render(
        <ItemProvider>
          <TestComponent />
        </ItemProvider>
      );
  
      await waitFor(() => {
        const stateElement = getByTestId('state');
        const updatedState = JSON.parse(stateElement.textContent || '{}');
        expect(updatedState.cachedData.people).toBeDefined();
        const deletedItem = updatedState.cachedData.people.find((item: { id: string; }) => item.id === '2');
        expect(deletedItem).toBeUndefined();
      });
    });
  });
});

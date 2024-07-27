import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../../components/Category/Form/Form';
import { IItem } from '@src/types/itemTypes';

const mockEntityListData: IItem = {
  id: '1',
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  category: 'people',
};

describe('Form component', () => {
  const mockProps = {
    type: 'add' as const,
    attributes: ['name', 'height', 'mass'],
    entityListData: mockEntityListData,
    open: true,
    close: vi.fn(),
    handleAddItem: vi.fn(),
    handleEditItem: vi.fn(),
    handleDeleteItem: vi.fn(),
    id: '1',
  };

  it('renders the form fields', () => {
    render(<Form {...mockProps} />);
    expect(screen.getByLabelText('Name')).toBeDefined();
    expect(screen.getByLabelText('Height')).toBeDefined();
    expect(screen.getByLabelText('Mass')).toBeDefined();
  });

  it('calls handleAddItem when submitting add form', () => {
    render(<Form {...mockProps} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Luke Skywalker' } });
    fireEvent.click(screen.getByText('Add'));
    expect(mockProps.handleAddItem).toHaveBeenCalled();
  });

  it('calls handleEditItem when submitting update form', () => {
    render(<Form {...mockProps} type="update" />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Luke Skywalker' } });
    fireEvent.click(screen.getByText('Update'));
    expect(mockProps.handleEditItem).toHaveBeenCalled();
  });

  it('calls handleDeleteItem when submitting delete form', () => {
    render(<Form {...mockProps} type="delete" />);
    fireEvent.click(screen.getByText('Delete'));
    expect(mockProps.handleDeleteItem).toHaveBeenCalled();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TableRow from '@src/components/Category/TableRow';
import { ItemProvider } from '@src/context/ItemContext';
import { IItem } from '@src/types/itemTypes';

type MockFormProps = {
  open: boolean;
  close: () => void;
};

vi.mock('@src/components/Category/Form/Form', () => ({
  default: ({ open, close }: MockFormProps) =>
    open ? <div data-testid="mock-form">Mock Form <button onClick={close}>Close</button></div> : null
}));

describe('TableRow', () => {
  const mockEntityListData: IItem = {
    id: '1',
    name: 'John Doe',
    age: '30',
    city: 'New York',
    category: 'people'
  };
  const mockAttributes = ['name', 'age', 'city'];
  const mockRemoveItemById = vi.fn();
  const mockCategory = 'people';

  it('renders row data correctly', () => {
    render(
      <ItemProvider>
        <table>
          <tbody>
            <TableRow
              entityListData={mockEntityListData}
              attributes={mockAttributes}
              removeItemById={mockRemoveItemById}
              category={mockCategory}
            />
          </tbody>
        </table>
      </ItemProvider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('opens edit form when Edit button is clicked', () => {
    render(
      <ItemProvider>
        <table>
          <tbody>
            <TableRow
              entityListData={mockEntityListData}
              attributes={mockAttributes}
              removeItemById={mockRemoveItemById}
              category={mockCategory}
            />
          </tbody>
        </table>
      </ItemProvider>
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByTestId('mock-form')).toBeInTheDocument();
  });

  it('opens delete form when Delete button is clicked', () => {
    render(
      <ItemProvider>
        <table>
          <tbody>
            <TableRow
              entityListData={mockEntityListData}
              attributes={mockAttributes}
              removeItemById={mockRemoveItemById}
              category={mockCategory}
            />
          </tbody>
        </table>
      </ItemProvider>
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByTestId('mock-form')).toBeInTheDocument();
  });

  it('closes form when Close button is clicked', () => {
    render(
      <ItemProvider>
        <table>
          <tbody>
            <TableRow
              entityListData={mockEntityListData}
              attributes={mockAttributes}
              removeItemById={mockRemoveItemById}
              category={mockCategory}
            />
          </tbody>
        </table>
      </ItemProvider>
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByTestId('mock-form')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('mock-form')).not.toBeInTheDocument();
  });
});

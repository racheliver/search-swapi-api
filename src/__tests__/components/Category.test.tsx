import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ItemProvider } from '@src/context/ItemContext';
import Category from '@src/components/Category/Category';
import * as useCategoryHook from '@src/hooks/useCategory';

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as Record<string, unknown>;
  return {
    ...actual,
    useParams: () => ({ category: 'people' }),
    useNavigate: () => vi.fn(),
  };
});

vi.mock('@src/hooks/useCategory', () => ({
  useCategory: vi.fn(),
}));

describe('Category component', () => {
  beforeEach(() => {
    vi.mocked(useCategoryHook.useCategory).mockReturnValue({
      entityDefinition: { name: 'people', title: 'People', attributes: ['name', 'height', 'mass'] },
      items: [{
        id: '1', name: 'Luke Skywalker', height: '172', mass: '77',
        category: ''
      }],
      loading: false,
      formState: false,
      setFormState: vi.fn(),
      removeItemById: vi.fn(),
      handleAddItem: vi.fn(),
      handleRefreshClick: vi.fn(),
    });
  });

  it('renders the category title correctly', () => {
    render(
      <BrowserRouter>
        <ItemProvider>
          <Category />
        </ItemProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('People')).toBeDefined();
  });

  it('renders the table with correct headers: Name, Height, Mass, Actions', () => {
    render(
      <BrowserRouter>
        <ItemProvider>
          <Category />
        </ItemProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Name')).toBeDefined();
    expect(screen.getByText('Height')).toBeDefined();
    expect(screen.getByText('Mass')).toBeDefined();
    expect(screen.getByText('Actions')).toBeDefined();
  });

  it('renders items in the table with correct values', () => {
    render(
      <BrowserRouter>
        <ItemProvider>
          <Category />
        </ItemProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Luke Skywalker')).toBeDefined();
    expect(screen.getByText('172')).toBeDefined();
    expect(screen.getByText('77')).toBeDefined();
  });

  it('opens the form when the Create button is clicked', async () => {
    const setFormStateMock = vi.fn();
    vi.mocked(useCategoryHook.useCategory).mockReturnValue({
      ...vi.mocked(useCategoryHook.useCategory)(),
      setFormState: setFormStateMock,
    });

    render(
      <BrowserRouter>
        <ItemProvider>
          <Category />
        </ItemProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Create'));
    expect(setFormStateMock).toHaveBeenCalledWith(true);
  });
});

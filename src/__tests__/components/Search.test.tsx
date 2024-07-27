
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ItemProvider } from '@src/context/ItemContext';
import Search from '@src/components/Search/Search';
import * as useSearchHook from '@src/hooks/useSearch';


vi.mock('@src/hooks/useSearch', () => ({
  useSearch: vi.fn(),
}));

describe('Search component', () => {
  beforeEach(() => {
    vi.mocked(useSearchHook.useSearch).mockReturnValue({
      queryResults: {},
      loading: false,
      errorOpen: false,
      handleCloseSnackbar: vi.fn(),
    });
  });

  it('renders the search input', () => {
    render(
      <BrowserRouter>
        <ItemProvider>
          <Search />
        </ItemProvider>
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Discover Star Wars characters, planets, and more...')).toBeDefined();
  });

  it('updates query on input change', async () => {
    render(
      <BrowserRouter>
        <ItemProvider>
          <Search />
        </ItemProvider>
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText('Discover Star Wars characters, planets, and more...');
    fireEvent.change(input, { target: { value: 'Luke' } });
    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe('Luke');
    });
  });

  it('displays loading indicator when searching', async () => {
    vi.mocked(useSearchHook.useSearch).mockReturnValue({
      queryResults: {},
      loading: true,
      errorOpen: false,
      handleCloseSnackbar: vi.fn(),
    });

    render(
      <BrowserRouter>
        <ItemProvider>
          <Search />
        </ItemProvider>
      </BrowserRouter>
    );

    const loadingIndicator = screen.getByRole('progressbar');
    expect(loadingIndicator).toBeDefined();
  });

  it('displays error snackbar when API fails', async () => {
    vi.mocked(useSearchHook.useSearch).mockReturnValue({
      queryResults: {},
      loading: false,
      errorOpen: true,
      handleCloseSnackbar: vi.fn(),
    });

    render(
      <BrowserRouter>
        <ItemProvider>
          <Search />
        </ItemProvider>
      </BrowserRouter>
    );

    const errorMessage = await screen.findByText('Sorry, there was a problem with the API. Please try again.');
    expect(errorMessage).toBeDefined();
  });
});
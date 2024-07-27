import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@src/components/Header/Header';
import { BrowserRouter } from 'react-router-dom';

// Mock the useNavigate hook from react-router-dom
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as any;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Header Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    mockNavigate.mockClear();
  });

  it('renders header with logo and buttons', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Check that the logo and buttons are rendered correctly
    expect(screen.getByAltText('Star Wars Logo')).toBeInTheDocument();
    expect(screen.getByText('STAR WARS HOME')).toBeInTheDocument();
  });

  it('navigates to home page when "STAR WARS HOME" button is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Simulate button click and check navigation
    fireEvent.click(screen.getByText('STAR WARS HOME'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

});

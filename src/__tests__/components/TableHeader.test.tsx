import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TableHeader from '@src/components/Category/TableHeader';

describe('TableHeader', () => {
  it('renders headers correctly', () => {
    const headers = ['name', 'age', 'city'];
    render(
      <table>
        <TableHeader headers={headers} />
      </table>
    );

    headers.forEach(header => {
      const formattedHeader = header.charAt(0).toUpperCase() + header.slice(1);
      expect(screen.getByText(formattedHeader)).toBeInTheDocument();
    });

    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('formats headers with underscores correctly', () => {
    const headers = ['first_name', 'last_name'];
    render(
      <table>
        <TableHeader headers={headers} />
      </table>
    );

    expect(screen.getByText('First name')).toBeInTheDocument();
    expect(screen.getByText('Last name')).toBeInTheDocument();
  });
});
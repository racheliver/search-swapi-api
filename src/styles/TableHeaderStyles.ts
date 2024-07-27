import { styled } from '@mui/material/styles';

export const TableHeaderContainer = styled('thead')({
  backgroundColor: 'var(--table-header-bg)',
  color: 'var(--table-header-color)',
});

export const TableHeaderCell = styled('th')({
  padding: 'var(--table-cell-padding)',
  textAlign: 'left',
  borderBottom: 'var(--table-border)',
  fontSize: 'var(--font-size-medium)',
  fontWeight: 'bold',
  '&:last-child': {
    borderRight: 'none',
    paddingLeft: '25px'
  },
});

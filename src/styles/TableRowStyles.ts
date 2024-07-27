import { styled } from '@mui/material/styles';

export const TableRowContainer = styled('tr')({
  backgroundColor: 'var(--table-row-bg)',
  color: 'var(--text-color)',
  '&:hover': {
    backgroundColor: 'var(--table-row-hover-bg)',
  },
});
  
  export const TableCell = styled('td')({
    padding: 'var(--table-cell-padding)',
    borderBottom: 'var(--table-border)',
    textAlign: 'left',
    fontSize: 'var(--font-size-small)',
    color: 'var(--text-color)',
  });
  
  export const ActionButton = styled('button')({
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--accent-color)',
    cursor: 'pointer',
    margin: '0 var(--spacing-small)',
    '&:hover': {
      color: 'var(--text-color)',
    },
  });
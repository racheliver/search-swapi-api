import { styled, keyframes } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const TableContainer = styled('div')({
  backgroundColor: 'var(--table-container-bg)',
  padding: 'var(--spacing-medium)',
  borderRadius: 'var(--border-radius)',
  marginTop: 'var(--spacing-medium)',
  boxShadow: 'var(--box-shadow)',
});

export const ListHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: 'var(--border-accent)',
  paddingBottom: 'var(--spacing-small)',
  marginBottom: 'var(--spacing-medium)',
  color: 'var(--text-color)',
});

export const ListTitle = styled('h4')({
  fontSize: 'var(--font-size-large)',
  fontWeight: 'bold',
  color: 'var(--accent-color)',
});

export const AddButton = styled('button')({
  backgroundColor: 'var(--button-bg)',
  color: 'var(--button-text)',
  border: 'none',
  padding: 'var(--button-padding)',
  borderRadius: 'var(--border-radius)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-medium)',
  '&:hover': {
    backgroundColor: 'var(--button-hover-bg)',
  },
});

export const GoToStartButton = styled(Button)({
  background: 'transparent',
  padding: '0',
  minWidth: 'auto',
  height: 'auto',
  width: 'auto',
  cursor: 'pointer',
  marginLeft: '1rem',
  animation: `${pulse} 1.5s infinite`,
  '&:hover': {
    background: 'none',
  },
  '& img': {
    width: '40px',
    height: '40px',
    display: 'block',
    background: 'transparent',
    marginBottom: '7px',
  },
});

export const EntityTable = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  color: 'var(--text-color)',
  '& th, td': {
    padding: 'var(--table-cell-padding)',
    textAlign: 'left',
    borderBottom: 'var(--table-border)',
  },
  '& th': {
    backgroundColor: 'var(--table-header-bg)',
  },
  '& tr:hover': {
    backgroundColor: 'var(--table-row-hover-bg)',
  },
});

export const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  color: 'var(--text-color)',
  textAlign: 'center',
  fontSize: 'var(--font-size-medium)',
});

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  color: 'var(--button-bg)',
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: 'var(--button-selected-bg)',
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: theme.palette.grey[500],
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: 'var(--button-bg)',
  },
}));

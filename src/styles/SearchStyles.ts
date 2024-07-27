import { styled } from '@mui/material/styles';
import { Snackbar as MuiSnackbar, Alert as MuiAlert } from '@mui/material';

const fadeOutKeyframes = `
  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(50px);
    }
  }
`;


const injectKeyframes = () => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = fadeOutKeyframes;
  document.head.appendChild(style);
};

injectKeyframes();

export const Snackbar = styled(MuiSnackbar)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  left: '50%',
  transform: 'translateX(-50%)',
  animation: `fadeOut 6000ms ${theme.transitions.easing.easeOut}`,
  '& .MuiSnackbarContent-root': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
  },
  '& .MuiIconButton-root': {
    color: theme.palette.common.white,
  },
}));

export const Alert = styled(MuiAlert)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
}));

export const SearchContainer = styled('div')({
  padding: 'var(--spacing-medium)',
  background: 'var(--search-background)',
  borderRadius: 'var(--border-radius)',
  marginBottom: 'var(--spacing-medium)',
  color: 'var(--text-color)',
  boxShadow: 'var(--box-shadow)',
  position: 'relative',
});

export const SearchBar = styled('div')({
  position: 'relative',
});

export const SearchInput = styled('input')({
  width: '100%',
  padding: '0.75rem',
  borderRadius: 'var(--border-radius)',
  border: '1px solid var(--search-input-border)',
  backgroundColor: 'var(--search-input-background)',
  color: 'var(--search-input-color)',
  '&::placeholder': {
    color: 'var(--search-placeholder-color)',
  },
});

export const SearchPopup = styled('div')({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: 'var(--search-popup-background)',
  borderRadius: 'var(--border-radius)',
  marginTop: 'var(--spacing-small)',
  zIndex: 1,
  boxShadow: '0 2px 4px var(--search-popup-shadow)',
  color: 'var(--text-color)',
});

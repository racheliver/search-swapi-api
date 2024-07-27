import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const HeaderBox = styled(Box)({
  background: 'var(--header-background-gradient)',
  padding: '1rem',
  borderBottom: '3px solid var(--border-color)',
  color: 'var(--text-color)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  height: '400px',
  fontFamily: 'var(--font-primary)',
});

export const HeaderTop = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: '1rem',
  zIndex: 1,
});

export const StyledButton = styled(Button)({
  border: '1px solid var(--button-border-color)',
  color: 'var(--button-color)',
  fontFamily: 'var(--font-secondary)',
  fontSize: 'var(--font-size-medium)',
  '&:hover': {
    backgroundColor: 'var(--button-hover-bg)',
    color: 'var(--button-hover-color)',
  },
});



export const Logo = styled('img')({
  height: '50px',
});

export const ImageContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

export const Image = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0,
  transition: 'opacity 1s ease-in-out',
});

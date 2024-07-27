import { styled } from '@mui/material/styles';

export const DialogOverlay = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--overlay-bg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  });
  
  export const Dialog = styled('div')({
    backgroundColor: 'var(--dialog-bg)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--spacing-large)',
    width: '400px',
    maxWidth: '90%',
    color: 'var(--accent-color)',
    boxShadow: 'var(--box-shadow)',
  });
  
  export const DialogHeader = styled('div')({
    borderBottom: 'var(--border-subtle)',
    paddingBottom: 'var(--spacing-medium)',
    marginBottom: 'var(--spacing-medium)',
  });
  
  export const DialogContent = styled('div')({
    marginBottom: 'var(--spacing-medium)',
  });
  
  export const FormField = styled('div')({
    marginBottom: 'var(--spacing-medium)',
  });
  
  export const Label = styled('label')({
    display: 'block',
    marginBottom: 'var(--spacing-small)',
    color: 'var(--accent-color)',
  });
  
  export const Input = styled('input')({
    width: '100%',
    padding: 'var(--input-padding)',
    borderRadius: 'var(--border-radius)',
    border: 'var(--input-border)',
    backgroundColor: 'var(--input-bg)',
    color: 'var(--input-text)',
    '&:focus': {
      borderColor: 'var(--accent-color)',
      outline: 'none',
    },
  });
  
  export const Button = styled('button')({
    padding: 'var(--button-padding)',
    border: 'none',
    borderRadius: 'var(--border-radius)',
    color: 'var(--button-text)',
    cursor: 'pointer',
    marginRight: 'var(--spacing-medium)',
    '&:hover': {
      opacity: 0.8,
    },
  });
  export const SubmitButton = styled(Button)({
    backgroundColor: "var(--button-primary-bg)",
  });
  
  export const CancelButton = styled(Button)({
    backgroundColor: "var(--button-secondary-bg)",
  });
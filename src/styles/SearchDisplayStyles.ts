import { styled } from '@mui/material/styles';

export const ResultsContainer = styled('div')({
    backgroundColor: 'var(--results-background)',
    borderRadius: 'var(--border-radius)',
    padding: 'var(--spacing-medium)',
    marginTop: 'var(--spacing-medium)',
    boxShadow: 'var(--box-shadow)',
    border: '1px solid var(--results-border)',
  });
  
export const ResultsHeader = styled('div')({
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 'var(--spacing-small)',
color: 'var(--results-text-color)',
});

export const ResultsTitle = styled('div')({
fontWeight: 'bold',
fontSize: 'var(--font-size-large)',
color: 'var(--results-title-color)',
});

export const ResultsList = styled('ul')({
listStyle: 'none',
padding: 0,
margin: 0,
});

export const ResultsItem = styled('li')({
padding: 'var(--spacing-small)',
color: 'var(--results-text-color)',
borderBottom: '1px solid var(--results-item-border)',
'&:last-child': {
    borderBottom: 'none',
},
'&:hover': {
    backgroundColor: 'var(--results-item-hover)',
},
});

export const ViewAllButton = styled('button')({
backgroundColor: '#000',
color: '#fff',
padding: 'var(--button-padding)',
border: 'none',
borderRadius: 'var(--border-radius)',
cursor: 'pointer',
'&:hover': {
    backgroundColor: '#333',
},
});
  
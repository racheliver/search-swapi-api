import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Category from './components/Category/Category';
import { ItemProvider } from './context/ItemContext';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <ItemProvider>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header />
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/category/:category" element={<Category />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ItemProvider>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Encrypt from './pages/encrypt';
import Decrypt from './pages/decrypt';
import KeyGen from './pages/keygen';
import Docs from './pages/docs';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container component="main" maxWidth="md" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Docs />} />
            <Route path="/encrypt" element={<Encrypt />} />
            <Route path="/decrypt" element={<Decrypt />} />
            <Route path="/keygen" element={<KeyGen />} />
          </Routes>
        </Container>
        <Footer className="Footer" sx={{ marginTop: 'auto' }} />
      </Box>
    </React.Fragment>
  );
}

export default App;

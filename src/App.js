// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material'; // CssBaseline ve Container'ı @mui/material'den import edin
import Header from './components/Header';
import Footer from './components/Footer';
import Encrypt from './pages/encrypt';
import Decrypt from './pages/decrypt';
import KeyGen from './pages/keygen';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<h2>Anasayfa İçeriği</h2>} />
          <Route path="/encrypt" element={<Encrypt />} />
          <Route path="/decrypt" element={<Decrypt />} />
          <Route path="/keygen" element={<KeyGen />} />
        </Routes>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;

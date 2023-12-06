// src/components/Header.js

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleKeyGenClick = () => {
    navigate('/keygen');
  };

  const handleEncryptClick = () => {
    navigate('/encrypt');
  };

  const handleDecryptClick = () => {
    navigate('/decrypt');
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
        }}
      >
        <IconButton edge="start" color="inherit" onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 0, padding: '0 16px' }}>
            ECC
        </Typography>
        <Typography
          variant="body1"
          onClick={handleKeyGenClick}
          sx={{
            cursor: 'pointer',
            marginRight: '16px', // Boşluk eklenen kısım
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Darker background color
            padding: '8px',
            borderRadius: '8px', // Rounded corners
            transition: 'background-color 0.3s, font-size 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)', // Darker background color on hover
              fontSize: '1.1em',
            },
          }}
        >
          KeyGen
        </Typography>
        <Typography
            variant="body1"
            onClick={handleEncryptClick}
            sx={{
                cursor: 'pointer',
                marginRight: '16px', // Boşluk eklenen kısım
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                padding: '8px',
                borderRadius: '8px',
                transition: 'background-color 0.3s, font-size 0.3s',
                '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                fontSize: '1.1em',
                },
            }}
            >
            Encrypt
        </Typography>
        <Typography
          variant="body1"
          onClick={handleDecryptClick}
          sx={{
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Darker background color
            padding: '8px',
            borderRadius: '8px', // Rounded corners
            transition: 'background-color 0.3s, font-size 0.3s',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)', // Darker background color on hover
              fontSize: '1.1em',
            },
          }}
        >
          Decrypt
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

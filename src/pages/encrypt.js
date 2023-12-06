// src/pages/Encrypt.js

import React, { useState } from 'react';
import { Container, Typography, TextField, Box, Button } from '@mui/material';

const Encrypt = () => {
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const isButtonDisabled = inputText.trim() === '' || password.trim() === '';

  const handleEncryptClick = () => {
    // ... (same code as before)
  };

  const validatePassword = (password) => {
    // ... (same code as before)
  };

  const encryptFunction = (text, password) => {
    // ... (same code as before)
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '16px',
        }}
      >
        <Typography variant="h5">Text to Encrypt</Typography>
        <TextField
          multiline
          rows={8}
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="Metni buraya girin..."
          onChange={(e) => setInputText(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '16px',
        }}
      >
        <Typography variant="h5">Public Key</Typography>
        <TextField
        //   type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="Şifreyi buraya girin..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '16px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleEncryptClick}
          disabled={isButtonDisabled}
        >
          Encrypt
        </Button>
        {errorMessage && (
          <Typography variant="body1" sx={{ marginTop: '8px', color: 'red' }}>
            {errorMessage}
          </Typography>
        )}
        <Typography variant="body1" sx={{ marginTop: '8px' }}>
          {encryptedText}
        </Typography>
      </Box>
    </Container>
  );
};

export default Encrypt;

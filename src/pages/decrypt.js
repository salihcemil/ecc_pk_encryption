// src/pages/Decrypt.js

import React, { useState } from 'react';
import { Container, Typography, TextField, Box, Button } from '@mui/material';
import { decrypt } from 'ecies-wasm';
import init, * as ecies from "ecies-wasm";
import CryptoJS from 'crypto-js';

const Decrypt = () => {
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isButtonDisabled = inputText.trim() === '' || password.trim() === '';

  const handleDecryptClick = () => {
    decryptFunction(inputText, password);
  };

  const validatePassword = (password) => {
    // ... (same code as before)
  };

  const fromHexString = (hexString) =>
    Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

  const decryptFunction = async(text, password) => {
    try{
      //generate sk form password
      const EC = require('elliptic').ec;
      const ec = new EC('secp256k1');
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
      let keyPair = ec.keyFromPrivate(hashedPassword);

      const sk = fromHexString(keyPair.getPrivate('hex'));

      await init(); // Initialize the WASM module
      
      const data = fromHexString(text); //data from hex to byteArray
      const decrypted = ecies.decrypt(sk, data); //sk: bytearray(uint8array), encrypted: byteArray(uint8array)
      const decryptedText = new TextDecoder().decode(decrypted); //conver from byteArray to string

      setDecryptedText(decryptedText);
    }
    catch(error){
      alert(error);
    }
    
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
        <Typography variant="h5">Encrypted Text</Typography>
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
        <Typography variant="h5">Password</Typography>
        <TextField
          type="password"
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
          onClick={handleDecryptClick}
          disabled={isButtonDisabled}
        >
          Decrypt
        </Button>
        {errorMessage && (
          <Typography variant="body1" sx={{ marginTop: '8px', color: 'red' }}>
            {errorMessage}
          </Typography>
        )}
        <Typography variant="body1" sx={{ marginTop: '8px' }}>
          {decryptedText}
        </Typography>
      </Box>
    </Container>
  );
};

export default Decrypt;

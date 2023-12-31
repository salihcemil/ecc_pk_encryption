// src/pages/Encrypt.js

import React, { useState } from 'react';
import { Container, Typography, TextField, Box, Button } from '@mui/material';
import init, * as ecies from "ecies-wasm";

const Encrypt = () => {
  const [inputText, setInputText] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const isButtonDisabled = inputText.trim() === '' || publicKey.trim() === '';

  const handleEncryptClick = () => {
    encryptFunction(publicKey, inputText);
  };

  const fromHexString = (hexString) =>
    Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  
  //byteArray(uint8array) to hex
  function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }


  const encryptFunction = async (key, input) => {
    try {
      await init(); // Initialize the WASM module
      const pk = fromHexString(key); //from hex to byte array(uint8array)

      const utf8EncodeText = new TextEncoder();
      const messsage = input;// 'hello'; //string
      const data = utf8EncodeText.encode(messsage); //from string to byteArray(uint8array)

      // const [sk, pk] = ecies.generateKeypair(); //generate ecdh key pair for ecies pk encryption

      const encrypted = ecies.encrypt(pk, data); //pk: bytearray(uint8array), data: byteArray(uint8array)

      setEncryptedText(toHexString(encrypted));
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
        <Typography variant="h5">Text to Encrypt</Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="Message entry..."
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
          multiline
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="Public key input..."
          onChange={(e) => setPublicKey(e.target.value)}
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
          sx={{ borderRadius: '8px' }}
        >
          Encrypt
        </Button>
        {errorMessage && (
          <Typography variant="body1" sx={{ marginTop: '8px', color: 'red' }}>
            {errorMessage}
          </Typography>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          value={encryptedText}
          disabled
          fullWidth
          multiline
          rows={3}
          placeholder="Encrypted message"
          InputProps={{
            sx: { borderRadius: '8px' },
          }}
        />
        <br />
        <br />
        <br />
        <br />
      </Box>
    </Container>
  );
};

export default Encrypt;

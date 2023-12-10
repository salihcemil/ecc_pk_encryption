import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import 'fast-text-encoding';
import CryptoJS from 'crypto-js';

const KeyGen = () => {
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const handleGenerateClick = async () => {
    generateKeys(password);
  };

  const generateKeys = (password) => {
    try {
      const EC = require('elliptic').ec;
      const ec = new EC('secp256k1');
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
      let keyPair = ec.keyFromPrivate(hashedPassword);

      const uncompressedPublicKeyHex = keyPair.getPublic().encode('hex');
      const x = uncompressedPublicKeyHex.slice(2, 66);

      // Y koordinatının işaretini belirle
      const yIsEven = parseInt(uncompressedPublicKeyHex.slice(-2), 16) % 2 === 0;
      const signByte = yIsEven ? '02' : '03';

      // Compressed public key'i oluştur
      const compressedPublicKeyHex = signByte + x;

      setPrivateKey(keyPair.getPrivate('hex'));
      setPublicKey(compressedPublicKeyHex);
    } catch (error) {
      alert(error);
    }
  };

  const isButtonDisabled = password === '';

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '16px', // Yeni eklenen satır
      }}
    >
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '16px',
          marginBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h5">Key Generator</Typography>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ borderRadius: '8px', marginBottom: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateClick}
          disabled={isButtonDisabled}
          sx={{ borderRadius: '8px', marginBottom: '1rem' }}
        >
          Generate
        </Button>
      </Box>

      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '16px',
          marginBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="subtitle1">Private Key:</Typography>
        <TextField
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={privateKey}
          InputProps={{
            readOnly: true,
            sx: { borderRadius: '8px' },
          }}
          sx={{ marginBottom: '1rem' }}
        />
      </Box>

      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '16px',
          marginBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="subtitle1">Public Key:</Typography>
        <TextField
          variant="outlined"
          multiline
          fullWidth
          margin="normal"
          value={publicKey}
          InputProps={{
            readOnly: true,
            sx: { borderRadius: '8px' },
          }}
        />
      </Box>
    </Container>
  );
};

export default KeyGen;

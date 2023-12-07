import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
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
    const EC = require('elliptic').ec;
    const ec = new EC('secp256k1');
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    let keyPair = ec.keyFromPrivate(hashedPassword);
    
    const uncompressedPublicKeyHex = keyPair.getPublic().encode('hex');
    const x = uncompressedPublicKeyHex.slice(2, 66);

    // Y koordinatının işaretini belirle
    const yIsEven = parseInt(uncompressedPublicKeyHex.slice(-2), 16) % 2 === 0;
    const signByte = yIsEven ? "02" : "03";

    // Compressed public key'i oluştur
    const compressedPublicKeyHex = signByte + x;

    console.log('private key: ',keyPair.getPrivate('hex'));
    console.log('public key: ', compressedPublicKeyHex);

    setPrivateKey(keyPair.getPrivate('hex'));
    setPublicKey(compressedPublicKeyHex);
  }

  const isButtonDisabled = password === '';

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Key Generator
      </Typography>
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateClick}
        disabled={isButtonDisabled}
      >
        Generate
      </Button>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1">Private Key:</Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          value={privateKey}
          InputProps={{ readOnly: true }}
        />
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Public Key:
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          value={publicKey}
          InputProps={{ readOnly: true }}
        />
      </Box>
    </Box>
  );
};

export default KeyGen;

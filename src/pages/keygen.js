import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import 'fast-text-encoding';

const KeyGen = () => {
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const handleGenerateClick = async () => {
    try {
        const textEncoder = new TextEncoder();
        const encodedPassword = await crypto.subtle.digest('SHA-256', textEncoder.encode(password));
        const derivedKey = await crypto.subtle.importKey('raw', encodedPassword, 'PBKDF2', false, ['deriveBits']);

        const keyMaterial = await crypto.subtle.deriveBits(
          { name: 'PBKDF2', salt: new Uint8Array(16), iterations: 1000000, hash: 'SHA-256' },
          derivedKey,
          256
        );

        const key = await crypto.subtle.importKey('raw', keyMaterial, 'AES-CTR', true, ['encrypt', 'decrypt']);
        const publicKey = await crypto.subtle.exportKey('jwk', key);
        setPublicKey(publicKey.k);

        } catch (error) {
          console.error('Encryption error:', error);
        }
  };

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

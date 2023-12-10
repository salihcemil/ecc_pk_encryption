import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import 'fast-text-encoding';
import CryptoJS from 'crypto-js';

const KeyGen = () => {
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [passwordLengthError, setPasswordLengthError] = useState(false);

  const handleGenerateClick = async () => {
    if (password.length >= 12 && hasRequiredComplexity(password)) {
      setPasswordLengthError(false);
      generateKeys(password);
    } else {
      setPasswordLengthError(true);
      alert(
        "Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
    }
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

  const isButtonDisabled = password === '' || password.length < 12;

  const hasRequiredComplexity = (password) => {
    // Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      digitRegex.test(password) &&
      specialCharacterRegex.test(password)
    );
  };

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
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordLengthError(false); // Reset password length error on input change
          }}
          sx={{ borderRadius: '8px', marginBottom: '1rem' }}
        />
        {passwordLengthError && (
          <Typography variant="body2" color="error">
            Password must be at least 12 characters long and meet complexity requirements.
          </Typography>
        )}
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

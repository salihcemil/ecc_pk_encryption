import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const KeyGen = () => {
  const [password, setPassword] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const handleGenerateClick = () => {
    // Burada şifre oluşturma ve anahtarları hesaplama işlemlerini gerçekleştirebilirsiniz.
    // Örnek olarak şu an sadece konsola yazdırıyorum.
    console.log('Generated Password:', password);

    // Örnek olarak şifre ile anahtarları aynı yapacağım.
    setPrivateKey(password);
    setPublicKey(password);
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

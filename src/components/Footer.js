import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', bottom: 0, width: '100%' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="body2" color="inherit">
            © 2023 ECC PK Encryption via User Password
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;

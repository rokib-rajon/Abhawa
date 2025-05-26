import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import Logo from '../../assets/logo.png';

const Footer = () => (
  <Box component="footer" sx={{
    width: '100%',
    background: '#222b36',
    color: '#fff',
    textAlign: 'center',
    py: 2,
    mt: 4,
    fontFamily: 'Poppins',
  }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
      <a href="/">
        <img src={Logo} alt="Abhawa Logo" style={{ height: 100 }} />
      </a>
    </Box>
    <Typography variant="body2" sx={{ fontSize: '14px', mb: 1 }}>
      © {new Date().getFullYear()} আবহাওয়া |
      বাংলাদেশের সবচেয়ে নির্ভরযোগ্য আবহাওয়া ওয়েবসাইট । 
    </Typography>
    <Box>
      <Link href="/about" color="inherit" underline="hover" sx={{ mx: 1 }}>About</Link>
      <Link href="/contact" color="inherit" underline="hover" sx={{ mx: 1 }}>Contact</Link>
      <Link href="/privacy" color="inherit" underline="hover" sx={{ mx: 1 }}>Privacy Policy</Link>
    </Box>
  </Box>
);

export default Footer;
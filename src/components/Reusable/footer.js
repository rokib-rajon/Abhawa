import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import Logo from '../../assets/logo.svg';

const Footer = () => (
  <Box component="footer" sx={{
    width: '100%',
    background: '#222b36',
    color: '#fff',
    textAlign: 'center',
    py: 2,
    mt: 4,
    fontFamily: "'Noto Serif Bengali', serif, sans-serif",
  }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
      <a href="/">
        <img src={Logo} alt="Abhawa Logo" style={{ height: 100 }} width="300" height="100" />
      </a>
    </Box>
    <Typography variant="body1" sx={{
                  fontFamily: "'Noto Serif Bengali', serif",
                  color: 'white',
                  fontSize: { xs: '15px', sm: '17px' },
                  textAlign: 'center',
                  mt:2,
                  mb: 2,
                  maxWidth: '700px',
                  mx: 'auto'
                }}>
                  বাংলাদেশের আবহাওয়া সম্পর্কে বিস্তারিতে তথ্য, পূর্বাভাস, এবং সতর্কবার্তা পেতে আবহাওয়া ডট কম ব্যবহার করুন। বাংলাদেশের প্রতিটি জেলার আবহাওয়ার আপডেট, সপ্তাহব্যাপী পূর্বাভাস, এবং তথ্য জানতে নিয়মিত ভিজিট করুন। আমাদের লক্ষ্য হচ্ছে আপনাকে সবচেয়ে নির্ভরযোগ্য ও দ্রুততম সময়ে আবহাওয়া তথ্য প্রদান করা।
                </Typography>
    <Box>
      <Link href="/about" color="inherit" underline="hover" sx={{ mx: 1 }}>About</Link>
      <Link href="/contact" color="inherit" underline="hover" sx={{ mx: 1 }}>Contact</Link>
      <Link href="/privacy" color="inherit" underline="hover" sx={{ mx: 1 }}>Privacy Policy</Link>
    </Box>
    <Typography variant="body2" sx={{ fontSize: '14px', mb: 1,fontFamily: "'Noto Serif Bengali', serif", }}>
      © {new Date().getFullYear()} আবহাওয়া |
      বাংলাদেশের আবহাওয়া ওয়েবসাইট । 
    </Typography>
  </Box>
);

export default Footer;
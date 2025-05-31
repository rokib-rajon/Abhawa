import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontFamily: "'Hind Siliguri', 'Noto Serif Bengali', serif, sans-serif", color: '#0099ff', fontWeight: 700, fontSize: { xs: '36px', sm: '48px' }, mb: 2 }}>
        ৪০৪
      </Typography>
      <Typography variant="h2" sx={{ fontFamily: "'Hind Siliguri', 'Noto Serif Bengali', serif, sans-serif", color: '#222', fontWeight: 600, fontSize: { xs: '20px', sm: '28px' }, mb: 2 }}>
        পৃষ্ঠা খুঁজে পাওয়া যায়নি
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif, sans-serif", color: '#333', fontSize: { xs: '15px', sm: '17px' }, mb: 3 }}>
        দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা এখানে নেই।
      </Typography>
      <Button variant="contained" color="primary" sx={{ fontFamily: "'Hind Siliguri', 'Noto Serif Bengali', serif, sans-serif", fontWeight: 600, fontSize: 16 }} onClick={() => navigate('/')}>হোমে ফিরে যান</Button>
    </Box>
  );
};

export default NotFound;
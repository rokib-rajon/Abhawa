import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Helmet } from 'react-helmet';

const About = () => (
  <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 700, mx: 'auto' }}>
    <Helmet>
      <title>আমাদের সম্পর্কে | আবহাওয়া</title>
      <meta name="description" content="Abhawa is Bangladesh's most reliable weather website, providing real-time weather updates, weekly forecasts, and more in Bengali." />
      <meta name="keywords" content="About, Abhawa, Weather, Bangladesh, Bengali" />
      <link rel="canonical" href="https://abhawa.com/about" />
    </Helmet>
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, background: '#f7fafc' }}>
      <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Poppins', color: '#0099ff', textAlign: 'center' }}>আমাদের সম্পর্কে</Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#222', textAlign: 'justify', fontSize: { xs: '15px', sm: '17px' } }}>
        Abhawa (আবহাওয়া) বাংলাদেশের সবচেয়ে নির্ভরযোগ্য আবহাওয়া ওয়েবসাইট। এখানে আপনি পাবেন সর্বশেষ আবহাওয়ার আপডেট, সপ্তাহব্যাপী পূর্বাভাস, এবং আরও অনেক কিছু, সম্পূর্ণ বাংলায়। আমাদের লক্ষ্য হলো দেশের প্রতিটি মানুষের কাছে সহজ ও নির্ভরযোগ্য আবহাওয়ার তথ্য পৌঁছে দেয়া।
      </Typography>
    </Paper>
  </Box>
);

export default About;
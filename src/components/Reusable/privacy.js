import React from 'react';
import { Box, Typography, Paper, Link } from '@mui/material';
import { Helmet } from 'react-helmet';

const Privacy = () => (
  <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 700, mx: 'auto' }}>
    <Helmet>
      <title>গোপনীয়তা নীতি | আবহাওয়া</title>
      <meta name="description" content="Abhawa respects your privacy. We do not collect personal data. Weather data is provided by trusted third-party sources. For privacy concerns, contact us at support@abhawa.com." />
      <meta name="keywords" content="Privacy, Policy, Abhawa, Weather, Bangladesh" />
      <link rel="canonical" href="https://abhawa.com/privacy" />
    </Helmet>
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, background: '#f7fafc' }}>
      <Typography variant="h2" component="h2" sx={{ mb: 2, fontFamily: "'Hind Siliguri', serif, sans-serif", color: '#0099ff', textAlign: 'center' }}>গোপনীয়তা নীতি</Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#222', textAlign: 'justify', fontSize: { xs: '15px', sm: '17px' } }}>
        আমরা আপনার গোপনীয়তাকে সম্মান করি। Abhawa ব্যবহারকারীদের কাছ থেকে কোনো ব্যক্তিগত তথ্য সংগ্রহ করে না। আবহাওয়ার তথ্য বিশ্বস্ত তৃতীয় পক্ষের উৎস থেকে সরবরাহ করা হয়। গোপনীয়তা সংক্রান্ত কোনো প্রশ্ন থাকলে আমাদের <Link href="mailto:support@abhawa.com" color="primary">support@abhawa.com</Link> এ যোগাযোগ করুন।
      </Typography>
    </Paper>
  </Box>
);

export default Privacy;
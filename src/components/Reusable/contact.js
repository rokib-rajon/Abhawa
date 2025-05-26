import React from 'react';
import { Box, Typography, Link, Paper } from '@mui/material';
import { Helmet } from 'react-helmet';

const Contact = () => (
  <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 700, mx: 'auto' }}>
    <Helmet>
      <title>যোগাযোগ | আবহাওয়া</title>
      <meta name="description" content="Contact Abhawa for feedback, partnership, or support. Reach out to us via email for any queries regarding Bangladesh weather updates." />
      <meta name="keywords" content="Contact, Abhawa, Weather, Bangladesh, Support" />
      <link rel="canonical" href="https://abhawa.com/contact" />
    </Helmet>
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, background: '#f7fafc' }}>
      <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Poppins', color: '#0099ff', textAlign: 'center' }}>যোগাযোগ</Typography>
      <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#222', textAlign: 'justify', fontSize: { xs: '15px', sm: '17px' } }}>
        মতামত, পার্টনারশিপ বা সহায়তার জন্য আমাদের ইমেইল করুন: <Link href="mailto:support@abhawa.com" color="primary">support@abhawa.com</Link>
      </Typography>
    </Paper>
  </Box>
);

export default Contact;
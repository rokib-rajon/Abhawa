import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Contact = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Poppins' }}>Contact</Typography>
    <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
      For feedback, partnership, or support, please email us at <Link href="mailto:support@abhawa.com" color="primary">support@abhawa.com</Link>.
    </Typography>
  </Box>
);

export default Contact;
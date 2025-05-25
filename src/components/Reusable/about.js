import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Poppins' }}>About</Typography>
    <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
      Abhawa is Bangladesh's most reliable weather website, providing real-time weather updates, weekly forecasts, and more in Bengali.
    </Typography>
  </Box>
);

export default About;
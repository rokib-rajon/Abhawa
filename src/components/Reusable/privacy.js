import React from 'react';
import { Box, Typography } from '@mui/material';

const Privacy = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Poppins' }}>Privacy Policy</Typography>
    <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
      We respect your privacy. Abhawa does not collect personal data from users. Weather data is provided by trusted third-party sources. For any privacy concerns, contact us at support@abhawa.com.
    </Typography>
  </Box>
);

export default Privacy;
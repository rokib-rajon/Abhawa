import { Typography } from '@mui/material';
import React from 'react';

const SectionHeader = ({ title, mb }) => {
  return (
    <Typography
      variant="h2"
      component="h2"
      sx={{
        fontSize: { xs: '18px', sm: '22px', md: '26px' },
        color: '#0099ff',
        fontWeight: '700',
        lineHeight: 1.2,
        textAlign: 'center',
        fontFamily: "'Hind Siliguri', sans-serif",
        marginBottom: mb ? mb : '1rem',
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;

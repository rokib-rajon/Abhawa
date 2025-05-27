import { Box, Typography } from '@mui/material';
import React from 'react';

const CityDateDetail = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        background: 'linear-gradient(90deg, rgba(0,153,255,0.12) 0%, rgba(0,212,255,0.08) 100%)',
        borderRadius: '16px',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
        padding: { xs: '10px 16px', sm: '8px 24px' },
        marginBottom: { xs: '10px', sm: '16px' },
        gap: { xs: '4px', sm: '12px' },
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif, sans-serif",
          fontWeight: '700',
          fontSize: { xs: '15px', sm: '17px', md: '19px' },
          color: '#fff',
          textTransform: 'uppercase',
          lineHeight: 1.1,
          letterSpacing: '1.5px',
          marginBottom: { xs: '2px', sm: '0' },
          textShadow: '0 1px 2px rgba(0,0,0,0.12)',
        }}
      >
        {props.city}
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '13px', sm: '15px', md: '16px' },
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.1,
          letterSpacing: '1.2px',
          fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif, sans-serif",
          fontWeight: 500,
          background: 'rgba(255,255,255,0.10)',
          borderRadius: '8px',
          padding: { xs: '2px 8px', sm: '2px 12px' },
          boxShadow: '0 1px 4px 0 rgba(0,0,0,0.06)',
        }}
      >
        আজ {props.date}
      </Typography>
    </Box>
  );
};

export default CityDateDetail;

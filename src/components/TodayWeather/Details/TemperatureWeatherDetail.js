import { Box, Typography } from '@mui/material';
import React from 'react';
import { toBengaliNumber, formatDateToBengali, formatTimeToBengali, translateWeatherDescriptionBn } from '../../../utilities/DataUtils';

const TemperatureWeatherDetail = (props) => {
  // Parse date if provided as string
  const dateObj = props.date ? new Date(props.date) : null;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '600',
          fontSize: { xs: '14px', sm: '16px', md: '18px' },
          color: 'white',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: '8px',
          fontFamily: 'Poppins',
        }}
      >
        {toBengaliNumber(Math.round(props.temperature))} °C
      </Typography>
      {dateObj && (
        <Typography
          variant="body2"
          sx={{ color: 'rgba(255,255,255, .7)', fontFamily: 'Roboto Condensed', fontSize: { xs: '10px', sm: '12px', md: '14px' } }}
        >
          {formatDateToBengali(dateObj)} | {formatTimeToBengali(dateObj)}
        </Typography>
      )}
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '14px', sm: '14px', md: '16px' },
          color: 'rgba(255,255,255, .7)',
          lineHeight: 1,
          letterSpacing: { xs: '1px', sm: '0' },
          fontFamily: 'Roboto Condensed',
        }}
      >
        {translateWeatherDescriptionBn(props.description)}
      </Typography>
    </Box>
  );
};

export default TemperatureWeatherDetail;

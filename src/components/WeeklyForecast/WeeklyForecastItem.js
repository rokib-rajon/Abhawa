import React from 'react';
import { Box, SvgIcon, Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { ReactComponent as HumidityIcon } from '../../assets/humidity.svg';
import { toBengaliNumber } from '../../utilities/DataUtils';

const WeeklyForecastItem = ({ value, type }) => {
  let iconContent;

  if (type === 'temperature')
    iconContent = (
      <ThermostatIcon
        sx={{ fontSize: { xs: '15px', sm: '16px', md: '18px' } }}
      />
    );
  else if (type === 'wind')
    iconContent = (
      <AirIcon sx={{ fontSize: { xs: '15px', sm: '16px', md: '18px' } }} />
    );
  else if (type === 'clouds')
    iconContent = (
      <FilterDramaIcon
        sx={{ fontSize: { xs: '15px', sm: '16px', md: '18px' } }}
      />
    );
  else if (type === 'humidity')
    iconContent = (
      <SvgIcon
        component={HumidityIcon}
        inheritViewBox
        sx={{
          fontSize: { xs: '15px', sm: '16px', md: '18px' },
        }}
      />
    );
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50px',
        color: 'rgba(243, 243, 243, 0.97)',
        gap: { xs: '4px', sm: '6px', md: '8px' },
        width: '100%',
        fontFamily: "'Hind Siliguri', serif, sans-serif"
      }}
    >
      {iconContent}
      <Typography
        variant="p"
        component="p"
        sx={{
          fontSize: { xs: '14px', sm: '15px' },
          fontWeight: { xs: '500', sm: '600' },
          color: 'rgba(255,255,255,0.96)',
          fontFamily: "'Noto Serif Bengali', serif, sans-serif",
          lineHeight: 1,
          textShadow: '0 1px 2px rgba(0,0,0,0.16)',
        }}
      >
        {toBengaliNumber(value)}
      </Typography>
    </Box>
  );
};

export default WeeklyForecastItem;

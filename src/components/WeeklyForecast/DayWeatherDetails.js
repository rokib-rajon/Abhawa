import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { translateWeatherDescriptionBn } from '../../utilities/DataUtils';

const DayWeatherDetails = (props) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: { xs: '12px', sm: '20px', md: '32px' },
      }}
    >
      <Typography
        xs={12}
        sx={{
          fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif, sans-serif",
          fontWeight: { xs: '400', sm: '600' },
          fontSize: { xs: '14px', sm: '16px', md: '18px' },
          color: 'white',
          lineHeight: 1,
          height: '31px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {props.day}
      </Typography>
      <Box
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '31px',
        }}
      >
        <Box
          component="img"
          sx={{
            width: { xs: '32px', sm: '36px', md: '40px' },
            height: 'auto',
            marginRight: '6px',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
            transition: 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)',
            animation: props.animated ? 'weatherIconBounce 1.2s infinite alternate' : 'none',
          }}
          alt="weather"
          src={props.src}
        />
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: { xs: '14px', md: '16px' },
            color: 'rgba(255,255,255, .92)',
            lineHeight: 1,
            fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif, sans-serif",
            textShadow: '0 1px 2px rgba(0,0,0,0.18)',
          }}
        >
          {translateWeatherDescriptionBn(props.description)}
        </Typography>
      </Box>
    </Grid>
  );
};

export default DayWeatherDetails;

// Add keyframes for icon bounce animation
<style jsx global>{`
@keyframes weatherIconBounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px) scale(1.08); }
}`}</style>

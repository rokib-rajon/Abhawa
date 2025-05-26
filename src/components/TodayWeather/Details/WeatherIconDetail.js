import { Box } from '@mui/material';
import React from 'react';

const WeatherIconDetail = (props) => {
  return (
    <Box
      component="img"
      sx={{
        width: { xs: '60px', sm: '72px' },
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: '0 auto',
        padding: '0',
        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
        transition: 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)',
        animation: 'weatherIconBounce 1.2s infinite alternate',
      }}
      alt="weather"
      src={props.src}
    />
  );
};

export default WeatherIconDetail;

// Add keyframes for icon bounce animation
<style jsx global>{`
@keyframes weatherIconBounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px) scale(1.08); }
}`}</style>

import { Box, Typography } from '@mui/material';
import React from 'react';
import { toBengaliNumber } from '../../../utilities/DataUtils';

// Helper to convert HH:mm to 12-hour Bengali format with AM/PM
function formatTimeToBengali12Hour(timeStr) {
  if (!timeStr) return '';
  const [hourStr, minuteStr] = timeStr.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const isPM = hour >= 12;
  let displayHour = hour % 12;
  if (displayHour === 0) displayHour = 12;
  const bnHour = toBengaliNumber(displayHour);
  const bnMinute = toBengaliNumber(minute.toString().padStart(2, '0'));
  const period = isPM ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
  return `${bnHour}:${bnMinute} ${period}`;
}

const DailyForecastItem = (props) => {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
        borderRadius: '8px',
        boxShadow:
          'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        textAlign: 'center',
        padding: '4px 0',
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '400',
          fontSize: { xs: '14px', sm: '16px' },
          color: 'white',
          lineHeight: 1,
          padding: '4px',
          fontFamily: 'Poppins',
          textShadow: '0 1px 2px rgba(0,0,0,0.16)',
        }}
      >
        {formatTimeToBengali12Hour(props.item.time)}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          padding: '4px',
        }}
      >
        <Box
          component="img"
          sx={{
            width: { xs: '38px', sm: '46px' },
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            margin: '0 auto',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
            transition: 'transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)',
            animation: 'weatherIconBounce 1.2s infinite alternate',
          }}
          alt="weather"
          src={require(`../../../assets/weather/${props.item.icon}.svg`)}
        />
      </Box>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '600',
          fontSize: { xs: '14px', sm: '16px' },
          color: 'white',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: { xs: '8px', md: '0' },
          textShadow: '0 1px 2px rgba(0,0,0,0.16)',
        }}
      >
        {props.item.description_bn}
      </Typography>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '600',
          fontSize: { xs: '12px', sm: '14px' },
          color: 'white',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: { xs: '8px', md: '0' },
          fontFamily: 'Poppins',
        }}
      >
        {toBengaliNumber(props.item.temperature)}
      </Typography>
    </Box>
  );
};

export default DailyForecastItem;

// Add keyframes for icon bounce animation
<style jsx global>{`
@keyframes weatherIconBounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px) scale(1.08); }
}`}</style>

import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DailyForecastItem from './DailyForecastItem';
import ErrorBox from '../../Reusable/ErrorBox';
import Layout from '../../Reusable/Layout';

// Helper to get current time in HH:mm
function getCurrentTimeHHMM() {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

const DailyForecast = ({ data, forecastList }) => {
  const noDataProvided =
    !data ||
    !forecastList ||
    Object.keys(data).length === 0 ||
    data.cod === '404' ||
    forecastList.cod === '404';

  let subHeader;

  if (!noDataProvided && forecastList.length > 0)
    subHeader = (
      <Typography
        variant="h5"
        component="h5"
        sx={{
          fontSize: { xs: '10px', sm: '12px' },
          textAlign: 'center',
          lineHeight: 1,
          color: '#04C4E0',
          fontFamily: 'Roboto Condensed',
          marginBottom: '1rem',
        }}
      >
        {/* Optionally add a subheader here */}
      </Typography>
    );

  // Always declare hooks at the top
  const scrollRef = useRef(null);
  const activeItemRef = useRef(null);

  // Find the index of the first forecast after current time
  let activeIdx = 0;
  if (!noDataProvided && forecastList.length > 0) {
    const now = getCurrentTimeHHMM();
    const idx = forecastList.findIndex(item => item.time > now);
    if (idx > 0) {
      activeIdx = idx;
    }
  }

  useEffect(() => {
    if (!noDataProvided && forecastList.length > 0 && activeItemRef.current && scrollRef.current) {
      activeItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [activeIdx, noDataProvided, forecastList.length]);

  let content;

  if (noDataProvided) {
    content = <ErrorBox flex="1" type="error" />;
  } else {
    content = (
      <Box 
        ref={scrollRef} 
        sx={{ 
          display: 'flex', 
          overflowX: 'auto', 
          gap: 2, 
          pb: 2, 
          width: '100%', // Ensure it takes full available width to allow overflow
          // Add some padding to prevent scrollbar from overlapping content too much
          // or use a custom scrollbar solution if needed later
        }}
      >
        {forecastList.map((item, idx) => (
          <Box
            key={item.time}
            ref={idx === activeIdx ? activeItemRef : null}
            sx={{ minWidth: 90, flex: '0 0 auto' }}
          >
            <DailyForecastItem {...item} active={idx === activeIdx} />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Layout
      title="দৈনিক পূর্বাভাস"
      content={content}
      sectionSubHeader={subHeader}
      mb="1rem"
      sx={{ marginTop: '2.9rem' }}
    />
  );
};

export default DailyForecast;

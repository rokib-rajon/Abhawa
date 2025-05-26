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

  let content;

  // Find the index of the first forecast after current time
  let activeIdx = 0;
  if (!noDataProvided && forecastList.length > 0) {
    const now = getCurrentTimeHHMM();
    const idx = forecastList.findIndex(item => item.time > now);
    if (idx > 0) {
      activeIdx = idx;
    }
  }

  // Ref for scrolling to active item
  const scrollRef = useRef(null);
  const activeItemRef = useRef(null);

  useEffect(() => {
    if (activeItemRef.current && scrollRef.current) {
      const parent = scrollRef.current;
      const child = activeItemRef.current;
      // Scroll so the active item is visible (centered if possible)
      parent.scrollLeft = child.offsetLeft - parent.offsetWidth / 2 + child.offsetWidth / 2;
    }
  }, [forecastList]);

  if (noDataProvided) content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided && forecastList.length > 0)
    content = (
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          gap: '8px',
          width: '100%',
          paddingBottom: '8px',
        }}
      >
        {forecastList.map((item, idx) => (
          <Box
            key={idx}
            ref={idx === activeIdx ? activeItemRef : null}
            sx={{
              minWidth: '90px',
              flex: '0 0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: idx === activeIdx ? '2px solid #1976d2' : 'none',
              borderRadius: idx === activeIdx ? '10px' : '8px',
              boxShadow: idx === activeIdx ? '0 0 8px #1976d2' : 'none',
              background: idx === activeIdx ? 'rgba(25, 118, 210, 0.08)' : 'none',
            }}
          >
            <DailyForecastItem item={item} data={data} isActive={idx === activeIdx} />
          </Box>
        ))}
      </Box>
    );

  return (
    <Layout
      title="আজকের সারাদিনের আবহাওয়া"
      content={content}
      sectionSubHeader={subHeader}
      sx={{ marginTop: '2.9rem' }}
      mb="0.3rem"
    />
  );
};

export default DailyForecast;

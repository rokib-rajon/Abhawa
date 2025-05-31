import { Grid, Box, Typography } from '@mui/material';
import React from 'react';
import AirConditions from './AirConditions/AirConditions';
import DailyForecast from './Forecast/DailyForecast';
import Details from './Details/Details';
import LoadingBox from '../Reusable/LoadingBox';

const TodayWeather = ({ data, forecastList, isLoading }) => {
  if (isLoading && !data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '200px', // Adjust height as needed
        }}
      >
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '10px', sm: '12px' },
              color: 'rgba(0,0,0, .8)', // Darker text for better visibility on light background
              lineHeight: 1,
              fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif, sans-serif",
            }}
          >
            আজকের আবহাওয়া লোড হচ্ছে...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  if (!data) {
    // Optional: render a placeholder or null if no data and not loading
    return null; 
  }

  return (
    <Grid container sx={{ padding: '3rem 0rem 0rem' }}>
      <Details data={data} />
      <AirConditions data={data} />
      <DailyForecast data={data} forecastList={forecastList} />
    </Grid>
  );
};

export default TodayWeather;

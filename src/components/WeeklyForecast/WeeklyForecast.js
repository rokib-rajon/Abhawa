import React from 'react';
import { Grid } from '@mui/material';
import { getWeekDays } from '../../utilities/DatetimeUtils';
import { weatherIcon } from '../../utilities/IconsUtils';
import WeeklyForecastItem from './WeeklyForecastItem';
import ErrorBox from '../Reusable/ErrorBox';
import DayWeatherDetails from './DayWeatherDetails';
import Layout from '../Reusable/Layout';
import LoadingBox from '../Reusable/LoadingBox'; // Import LoadingBox
import { Box, Typography } from '@mui/material'; // Import Box and Typography for LoadingBox content

const WeeklyForecast = ({ data, isLoading }) => {
  const forecastDays = getWeekDays();

  const noDataProvided =
    !data ||
    Object.keys(data).length === 0 ||
    !data.list ||
    data.list.length === 0;

  let content = (
    <div style={{ width: '100%' }}>
      <ErrorBox type="error" />
    </div>
  );

  if (isLoading && (!data || !data.list || data.list.length === 0)) {
    content = (
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
              color: 'rgba(0,0,0, .8)', // Darker text for better visibility
              lineHeight: 1,
              fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif, sans-serif",
            }}
          >
            সাপ্তাহিক পূর্বাভাস লোড হচ্ছে...
          </Typography>
        </LoadingBox>
      </Box>
    );
  } else if (!noDataProvided) {
    content = (
      // Existing content rendering logic
      <Grid
        item
        container
        display="flex"
        flexDirection="column"
        xs={12}
        gap="4px"
      >
        {data.list.slice(0, 7).map((item, idx) => {
          return (
            <Grid
              item
              key={idx}
              xs={12}
              display="flex"
              alignItems="center"
              sx={{
                padding: '2px 0 2px',
                background:
                  'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                borderRadius: '8px',
              }}
            >
              <DayWeatherDetails
                day={forecastDays[idx]}
                src={weatherIcon(`${item.icon}`)}
                description={item.description}
                animated={true}
              />

              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WeeklyForecastItem
                  type="temperature"
                  value={Math.round(item.temp) + ' °C'}
                  color="black"
                />
                <WeeklyForecastItem
                  type="clouds"
                  value={item.clouds + ' %'}
                  color="black"
                />
              </Grid>

              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WeeklyForecastItem
                  type="wind"
                  value={item.wind + ' m/s'}
                  color="green"
                />
                <WeeklyForecastItem
                  type="humidity"
                  value={item.humidity + ' %'}
                  color="green"
                />
              </Grid>
            </Grid>
          );
        })}
        {/* Remove UnfedForecastItem for 8th day since only 7 days shown */}
      </Grid>
    );
  } else {
    // This case handles when not loading and noDataProvided is true (e.g. error state or empty data after load)
    // The initial 'content' with ErrorBox will be used, or you can define other specific UI
  }
    // Removed duplicated block from here

  return (
    <Layout
      title="সাপ্তাহিক পুর্বাভাস"
      content={content}
      mb=".8rem"
      sx={{
      
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 0 0',
      }}
    />
  );
};

export default WeeklyForecast;

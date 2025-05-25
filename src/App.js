import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, SvgIcon, Typography } from '@mui/material';
import Search from './components/Search/Search';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import TodayWeather from './components/TodayWeather/TodayWeather';
import { fetchWeatherData } from './api/OpenWeatherService';
import { transformDateFormat } from './utilities/DatetimeUtils';
import UTCDatetime from './components/Reusable/UTCDatetime';
import LoadingBox from './components/Reusable/LoadingBox';
import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
import Logo from './assets/logo.png';
import ErrorBox from './components/Reusable/ErrorBox';
import { ALL_DESCRIPTIONS } from './utilities/DateConstants';
import Footer from './components/Reusable/footer';
import { Routes, Route } from 'react-router-dom';
import About from './components/Reusable/about';
import Contact from './components/Reusable/contact';
import Privacy from './components/Reusable/privacy';

import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from './utilities/DataUtils';

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Try to get user's location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // Use a dummy label for city, will be replaced by actual city after fetch
          searchChangeHandler({ label: 'Your Location', value: `${latitude} ${longitude}` });
        },
        (err) => {
          // If permission denied or error, fallback to Dhaka
          searchChangeHandler({ label: 'Dhaka', value: '23.8103 90.4125' });
        }
      );
    } else {
      // If geolocation not supported, fallback to Dhaka
      searchChangeHandler({ label: 'Dhaka', value: '23.8103 90.4125' });
    }
    // eslint-disable-next-line
  }, []);
  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(' ');

    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);

    try {
      // met.no returns a single forecast object
      const forecastResponse = await fetchWeatherData(latitude, longitude);
      console.log('MET.no API Response:', forecastResponse);
      
      if (!forecastResponse) {
        console.error('No response from MET.no API');
        setError(true);
        setIsLoading(false);
        return;
      }
      
      const all_today_forecasts_list = getTodayForecastWeather(
        forecastResponse,
        currentDate,
        dt_now
      );
      console.log('Today forecasts:', all_today_forecasts_list);

      const all_week_forecasts_list = getWeekForecastWeather(
        forecastResponse,
        ALL_DESCRIPTIONS
      );
      console.log('Week forecasts:', all_week_forecasts_list);

      // Get current weather data from the first timeseries entry
      const currentWeather = forecastResponse.properties.timeseries[0];
      const currentDetails = currentWeather.data.instant.details;
      const currentSummary = currentWeather.data.next_1_hours?.summary || currentWeather.data.next_6_hours?.summary || currentWeather.data.next_12_hours?.summary;
      
      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ 
        city: enteredData.label,
        main: {
          temp: Math.round(currentDetails.air_temperature),
          feels_like: Math.round(currentDetails.air_temperature),
          humidity: currentDetails.relative_humidity
        },
        weather: [{
          description: currentSummary ? currentSummary.symbol_code : 'unknown',
          icon: currentSummary ? currentSummary.symbol_code : 'unknown'
        }],
        wind: {
          speed: currentDetails.wind_speed
        },
        clouds: {
          all: currentDetails.cloud_area_fraction
        },
        pressure: currentDetails.air_pressure_at_sea_level
      });
      setWeekForecast({
        city: enteredData.label,
        list: all_week_forecasts_list,
      });
      console.log('Today weather set:', { 
         city: enteredData.label,
         temperature: Math.round(currentDetails.air_temperature),
         humidity: currentDetails.relative_humidity,
         wind: currentDetails.wind_speed,
         clouds: currentDetails.cloud_area_fraction,
         pressure: currentDetails.air_pressure_at_sea_level,
         description: currentSummary ? currentSummary.symbol_code : 'unknown'
       });
    } catch (error) {
      console.error('Error in searchChangeHandler:', error);
      setError(true);
    }

    setIsLoading(false);
  };

  let appContent = (
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '500px',
      }}
    >
      <SvgIcon
        component={SplashIcon}
        inheritViewBox
        sx={{ fontSize: { xs: '100px', sm: '120px', md: '140px' } }}
      />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '18px', sm: '20px' },
          color: 'rgba(255,255,255, .85)',
          fontFamily: 'Poppins',
          textAlign: 'center',
          margin: '2rem 0',
          maxWidth: '80%',
          lineHeight: '22px',
        }}
      >
        বাংলাদেশের সবচাইতে সমৃদ্ধ আবহাওয়া ওয়েবসাইট। শীঘ্রই আসছে আরো উন্নত অনেক ফিচার নিয়ে। 
      </Typography>
    </Box>
  );

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={todayWeather ? 6 : 12}>
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <WeeklyForecast data={weekForecast} />
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '500px',
        }}
      >
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '10px', sm: '12px' },
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1,
              fontFamily: 'Poppins',
            }}
          >
            লোড হচ্ছে...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', px: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
        <a href="/">
          <img src={Logo} alt="Abhawa Logo" style={{ height: 56 }} />
        </a>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={
            <React.Fragment>
              <UTCDatetime />
              <Search onSearchChange={searchChangeHandler} />
              {appContent}
            </React.Fragment>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Box>
      <Footer />
    </Container>
  );
}

export default App;

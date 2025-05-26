import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, SvgIcon, Typography } from '@mui/material';
import Search from './components/Search/Search';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import TodayWeather from './components/TodayWeather/TodayWeather';
import { fetchWeatherData } from './api/OpenWeatherService';
import { transformDateFormat } from './utilities/DatetimeUtils';
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
import Ticker from './components/Reusable/Ticker';

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [locationName, setLocationName] = useState('');

  // Helper: Reverse geocode coordinates to location name
  async function reverseGeocode(lat, lon) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      if (data && data.address) {
        return data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.county || data.address.state || data.address.country || '';
      }
      return '';
    } catch (e) {
      return '';
    }
  }

  useEffect(() => {
    // Try to get user's location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // Reverse geocode for display
          const locName = await reverseGeocode(latitude, longitude);
          setLocationName(locName || 'আপনার অবস্থান');
          searchChangeHandler({ label: locName || 'আপনার অবস্থান', value: `${latitude} ${longitude}` });
        },
        (err) => {
          // If permission denied or error, fallback to Dhaka
          setLocationName('Dhaka');
          searchChangeHandler({ label: 'Dhaka', value: '23.8103 90.4125' });
        }
      );
    } else {
      // If geolocation not supported, fallback to Dhaka
      setLocationName('Dhaka');
      searchChangeHandler({ label: 'Dhaka', value: '23.8103 90.4125' });
    }
    // eslint-disable-next-line
  }, []);

  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(' ');
    setIsLoading(true);
    const currentDate = transformDateFormat();
    const currentDateOnly = currentDate.substring(0, 10);
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);
    try {
      const forecastResponse = await fetchWeatherData(latitude, longitude);
      if (!forecastResponse) {
        setError(true);
        setIsLoading(false);
        return;
      }
      const all_today_forecasts_list = getTodayForecastWeather(
        forecastResponse,
        currentDateOnly,
        dt_now
      );
      const all_week_forecasts_list = getWeekForecastWeather(
        forecastResponse,
        ALL_DESCRIPTIONS
      );
      // Reverse geocode if city label is missing or generic
      let cityLabel = enteredData.label;
      if (!cityLabel || cityLabel === 'আপনার অবস্থান' || cityLabel === 'Dhaka') {
        const locName = await reverseGeocode(latitude, longitude);
        setLocationName(locName || cityLabel);
        cityLabel = locName || cityLabel;
      } else {
        setLocationName(cityLabel);
      }
      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ 
        city: cityLabel,
        main: {
          temp: Math.round(forecastResponse.properties.timeseries[0].data.instant.details.air_temperature),
          feels_like: Math.round(forecastResponse.properties.timeseries[0].data.instant.details.air_temperature),
          humidity: forecastResponse.properties.timeseries[0].data.instant.details.relative_humidity
        },
        weather: [{
          description: forecastResponse.properties.timeseries[0].data.next_1_hours?.summary?.symbol_code || forecastResponse.properties.timeseries[0].data.next_6_hours?.summary?.symbol_code || forecastResponse.properties.timeseries[0].data.next_12_hours?.summary?.symbol_code || 'unknown',
          icon: forecastResponse.properties.timeseries[0].data.next_1_hours?.summary?.symbol_code || forecastResponse.properties.timeseries[0].data.next_6_hours?.summary?.symbol_code || forecastResponse.properties.timeseries[0].data.next_12_hours?.summary?.symbol_code || 'unknown'
        }],
        wind: {
          speed: forecastResponse.properties.timeseries[0].data.instant.details.wind_speed
        },
        clouds: {
          all: forecastResponse.properties.timeseries[0].data.instant.details.cloud_area_fraction
        },
        pressure: forecastResponse.properties.timeseries[0].data.instant.details.air_pressure_at_sea_level
      });
      setWeekForecast({
        city: cityLabel,
        list: all_week_forecasts_list,
      });
    } catch (error) {
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
        বাংলাদেশের সবচাইতে সমৃদ্ধ আবহাওয়া ওয়েবসাইট। 
        শীঘ্রই আসছে আরো উন্নত অনেক ফিচার নিয়ে।
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
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', px: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
        <a href="/">
          <img src={Logo} alt="Abhawa Logo" style={{ height: 80 }} />
        </a>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
       <Ticker />
        </Box>
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={
            <React.Fragment>
              
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

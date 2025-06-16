import { Box, Container, Grid, SvgIcon, Typography, Button } from '@mui/material';
 import React, { useState, useEffect } from 'react';
import Search from './components/Search/Search';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import TodayWeather from './components/TodayWeather/TodayWeather';
import { fetchWeatherData } from './api/OpenWeatherService';
import { transformDateFormat } from './utilities/DatetimeUtils';

import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
import Logo from './assets/logo.svg';
import ErrorBox from './components/Reusable/ErrorBox';
import { ALL_DESCRIPTIONS } from './utilities/DateConstants';
import Footer from './components/Reusable/footer';
import { Routes, Route } from 'react-router-dom';
import About from './components/Reusable/about';
import Contact from './components/Reusable/contact';
import Privacy from './components/Reusable/privacy';
import { Helmet } from 'react-helmet';
import NotFound from './components/Reusable/NotFound';


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
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstall(false);
      }
      setDeferredPrompt(null);
    }
  };

  // Helper: Reverse geocode coordinates to location name
  async function reverseGeocode(lat, lon) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`, {
        headers: {
          'User-Agent': 'Abhawa Weather App/1.0 (https://www.abhawa.com)' // Replace with your actual app info
        }
      });
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
          // console.error("Error getting location or permission denied: ", err);
          setLocationName('Dhaka');
          searchChangeHandler({ label: 'Dhaka', value: '23.8103 90.4125' });
        }
      );
    } else {
      // If geolocation not supported, fallback to Dhaka
      // console.log("Geolocation is not supported by this browser.");
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

  let appContentBase = (
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
          fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif, sans-serif",
          textAlign: 'center',
          margin: '2rem 0',
          maxWidth: '80%',
          lineHeight: '22px',
        }}
      > আপনার অবস্থানের আজকের আবহাওয়ার অথ্য লোড হচ্ছে। </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{
          fontSize: { xs: '14px', sm: '16px' },
          color: 'rgba(255,255,255,.85)',
          fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', serif, sans-serif",
          textAlign: 'center',  
        }}>
        বাংলাদেশের সবচাইতে সমৃদ্ধ আবহাওয়া ওয়েবসাইট। 
        শীঘ্রই আসছে আরো উন্নত অনেক ফিচার নিয়ে।
      </Typography>
    </Box>
  );

  let appContent;

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  } else if (todayWeather || (todayForecast && todayForecast.length > 0) || weekForecast || isLoading) {
    // This condition means:
    // - We have some weather data (today, forecast, or weekly) OR
    // - We are currently in a loading state (isLoading is true)
    // In either of these cases, we render the weather components.
    // They will internally manage displaying data or their specific loading indicators.
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={6} sx={{ minHeight: { xs: 'auto', md: '400px' } }}> {/* Added minHeight */}
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} isLoading={isLoading} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ minHeight: { xs: 'auto', md: '400px' } }}> {/* Added minHeight */}
          <WeeklyForecast data={weekForecast} isLoading={isLoading} />
        </Grid>
      </React.Fragment>
    );
  } else {
    // Default to splash screen if no error, not initial loading, and no data yet (e.g. after location permission denied without fallback)
    appContent = appContentBase;
  }

  return (
    <>
      <Helmet>
        <title>আবহাওয়া | বাংলার আবহাওয়া বাংলায়</title>
        <meta name="description" content="বাংলাদেশের সবচেয়ে নির্ভরযোগ্য আবহাওয়া ওয়েবসাইট।" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WeatherForecast",
            "name": "আবহাওয়া | Weather",
            "url": "https://www.abhawa.com/",
            "description": "বাংলাদেশের সবচেয়ে নির্ভরযোগ্য আবহাওয়া ওয়েবসাইট।",
            "inLanguage": "bn-BD",
            "publisher": {
              "@type": "Organization",
              "name": "Abhawa Team"
            }
          }
        `}</script>
        <meta property="og:updated_time" content={new Date().toISOString()} />
      </Helmet>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', px: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
          <a href="/">
            <img src={Logo} alt="Abhawa Logo" style={{ height: 80 }} width="240" height="80" />
          </a>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={
              <React.Fragment>
                <Search onSearchChange={searchChangeHandler} />
              
                <Ticker sx={{ justifyContent: 'center', alignItems: 'center', }}/>
                {/* Removed the location request button */}
                <Typography variant="h1" component="h1" sx={{
                  fontFamily: "'Hind Siliguri', sans-serif",
                  fontWeight: 700,
                  color: '#0099ff',
                  fontSize: { xs: '28px', sm: '36px', md: '44px' },
                  textAlign: 'center',
                  mb: 2
                }}>
                  বাংলাদেশের আবহাওয়া
                </Typography>
                
                {/* appContent will now render the loading spinner, error, splash, or weather data below these titles */}
                {appContent}
                <Box sx={{ display: 'flex', justifyContent: 'center',mt: 2, mb: 2 }}>
                  <Button variant="contained" color="primary" sx={{ fontFamily: "'Hind Siliguri', 'Noto Serif Bengali', serif, sans-serif", fontWeight: 600, fontSize: 16 }}
                    onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=https://www.abhawa.com', '_blank')}
                  >
                    শেয়ার করুন
                  </Button>
                </Box>
                
              </React.Fragment>
              
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <Footer />
      </Container>
      {showInstall && (
        <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000 }}>
          <button
            onClick={handleInstallClick}
            style={{
              background: '#0099ff',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 20px',
              fontSize: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
            }}
          >
            অ্যাপ ইন্সটল করুন
          </button>
        </Box>
      )}
    </>
  );
}

export default App;

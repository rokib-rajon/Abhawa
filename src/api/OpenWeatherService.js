const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

// MET Norway Locationforecast API endpoint (compact version)
const MET_API_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact';

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

/**
 * Fetch weather data from MET Norway Locationforecast API.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather forecast data
 * @see https://api.met.no/weatherapi/locationforecast/2.0/documentation
 */
export async function fetchWeatherData(lat, lon) {
  try {
    const response = await fetch(
      `${MET_API_URL}?lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'AbhawaWeatherApp/1.0 support@abhawa.com',
          'Accept': 'application/json'
        }
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather data from MET Norway');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error);
    return null;
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error);
  }
}

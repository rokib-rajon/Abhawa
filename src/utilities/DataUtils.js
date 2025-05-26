import { ALL_DESCRIPTIONS_BN } from './DateConstants';

export function groupBy(key) {
  return function group(array) {
    return array.reduce((acc, obj) => {
      const property = obj[key];
      const { date, ...rest } = obj;
      acc[property] = acc[property] || [];
      acc[property].push(rest);
      return acc;
    }, {});
  };
}

export function getAverage(array, isRound = true) {
  let average = 0;
  if (isRound) {
    average = Math.round(array.reduce((a, b) => a + b, 0) / array.length);
    if (average === 0) {
      average = 0;
    }
  } else average = (array.reduce((a, b) => a + b, 0) / array.length).toFixed(2);

  return average;
}

export function getMostFrequentWeather(arr) {
  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}

 export const descriptionToIconName = (desc, descriptions_list) => {
  const iconName = descriptions_list.find((item) => item.description === desc);
  if (!iconName || !iconName.icon) {
    return "unknown";
  }
  return iconName.icon;
};

export const getWeekForecastWeather = (response, descriptions_list) => {
  let forecast_data = [];
  let descriptions_data = [];

  // met.no Locationforecast API: response.properties.timeseries is the main array
  if (!response || !response.properties || !response.properties.timeseries) return [];
  response.properties.timeseries.slice().map((item) => {
    const date = item.time.substring(0, 10);
    const details = item.data.instant.details;
    const summary = item.data.next_1_hours?.summary || item.data.next_6_hours?.summary || item.data.next_12_hours?.summary;
    descriptions_data.push({
      description: summary ? summary.symbol_code : 'unknown',
      date: date,
    });
    forecast_data.push({
      date: date,
      temp: details.air_temperature,
      humidity: details.relative_humidity,
      wind: details.wind_speed,
      clouds: details.cloud_area_fraction,
    });
    return item;
  });

  // Exclude today's date from weekly forecast
  const todayDate = new Date().toISOString().substring(0, 10);
  forecast_data = forecast_data.filter(item => item.date !== todayDate);
  descriptions_data = descriptions_data.filter(item => item.date !== todayDate);

  const groupByDate = groupBy('date');
  let grouped_forecast_data = groupByDate(forecast_data);
  let grouped_forecast_descriptions = groupByDate(descriptions_data);

  const description_keys = Object.keys(grouped_forecast_descriptions);
  let dayDescList = [];
  description_keys.forEach((key) => {
    let singleDayDescriptions = grouped_forecast_descriptions[key].map((item) => item.description);
    let mostFrequentDescription = getMostFrequentWeather(singleDayDescriptions);
    dayDescList.push(mostFrequentDescription);
  });

  const forecast_keys = Object.keys(grouped_forecast_data);
  let dayAvgsList = [];
  forecast_keys.forEach((key, idx) => {
    let dayTempsList = [];
    let dayHumidityList = [];
    let dayWindList = [];
    let dayCloudsList = [];
    for (let i = 0; i < grouped_forecast_data[key].length; i++) {
      dayTempsList.push(grouped_forecast_data[key][i].temp);
      dayHumidityList.push(grouped_forecast_data[key][i].humidity);
      dayWindList.push(grouped_forecast_data[key][i].wind);
      dayCloudsList.push(grouped_forecast_data[key][i].clouds);
    }
    dayAvgsList.push({
      date: key,
      temp: getAverage(dayTempsList),
      humidity: getAverage(dayHumidityList),
      wind: getAverage(dayWindList, false),
      clouds: getAverage(dayCloudsList),
      description: dayDescList[idx],
      icon: descriptionToIconName(dayDescList[idx], descriptions_list),
    });
  });
  return dayAvgsList;
};

export const getTodayForecastWeather = (response, current_date, current_datetime) => {
  let all_today_forecasts = [];

  // met.no Locationforecast API: response.properties.timeseries is the main array
  if (!response || !response.properties || !response.properties.timeseries) return [];
  // Convert current_date to English numerals for comparison
  const enCurrentDate = String(current_date).replace(/[০-৯]/g, d => ({'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'}[d]||d));
  response.properties.timeseries.slice().map((item) => {
    // Debug log for date filtering
    if (typeof window !== 'undefined' && window.console) {
      console.log('Checking timeseries item:', item.time, 'against current_date:', current_date, 'enCurrentDate:', enCurrentDate);
    }
    // Only include forecasts for today and not beyond
    if (item.time.startsWith(enCurrentDate.substring(0, 10))) {
      const details = item.data.instant.details;
      const summary = item.data.next_1_hours?.summary || item.data.next_6_hours?.summary || item.data.next_12_hours?.summary;
      const timeStr = item.time.split('T')[1].substring(0, 5);
      all_today_forecasts.push({
        time: timeStr,
        icon: summary ? summary.symbol_code : 'unknown',
        temperature: Math.round(details.air_temperature) + ' °C',
      });
    }
    return item;
  });
  return all_today_forecasts;
};

// Bengali numeral conversion utility
export function toBengaliNumber(input) {
  const enToBn = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return String(input).replace(/[0-9]/g, d => enToBn[d] || d);
}

// Bengali month and day names
export const bengaliMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];
export const bengaliDays = [
  'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
];

// Format date to Bengali (YYYY-MM-DD or Date object)
export function formatDateToBengali(dateInput) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const day = toBengaliNumber(date.getDate());
  const month = bengaliMonths[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());
  const weekday = bengaliDays[date.getDay()];
  return `${weekday}, ${day} ${month} ${year}`;
}

// Format time to Bengali (HH:mm)
export function formatTimeToBengali(dateInput) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const hour = toBengaliNumber(date.getHours().toString().padStart(2, '0'));
  const minute = toBengaliNumber(date.getMinutes().toString().padStart(2, '0'));
  return `${hour}:${minute}`;
}

// Weather description translation

export function translateWeatherDescriptionBn(desc) {
  if (!desc) return '';
  // Try exact match
  if (ALL_DESCRIPTIONS_BN[desc]) return ALL_DESCRIPTIONS_BN[desc];
  // Try lowercase match
  if (ALL_DESCRIPTIONS_BN[desc.toLowerCase()]) return ALL_DESCRIPTIONS_BN[desc.toLowerCase()];
  return desc;
}

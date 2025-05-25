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
  let all_today_forecasts_all = [];

  // met.no Locationforecast API: response.properties.timeseries is the main array
  if (!response || !response.properties || !response.properties.timeseries) return [];
  response.properties.timeseries.slice().map((item) => {
    // Only include forecasts for today and not beyond
    if (item.time.startsWith(current_date.substring(0, 10))) {
      const details = item.data.instant.details;
      const summary = item.data.next_1_hours?.summary || item.data.next_6_hours?.summary || item.data.next_12_hours?.summary;
      const timeStr = item.time.split('T')[1].substring(0, 5);
      // Use ISO string for comparison
      const itemTimestamp = Math.floor(new Date(item.time).getTime() / 1000);
      if (itemTimestamp > current_datetime) {
        all_today_forecasts.push({
          time: timeStr,
          icon: summary ? summary.symbol_code : 'unknown',
          temperature: Math.round(details.air_temperature) + ' °C',
        });
      }
      all_today_forecasts_all.push({
        time: timeStr,
        icon: summary ? summary.symbol_code : 'unknown',
        temperature: Math.round(details.air_temperature) + ' °C',
      });
    }
    return item;
  });
  // Only return today's forecasts, not future days
  if (all_today_forecasts.length === 0 && all_today_forecasts_all.length > 0) {
    return [...all_today_forecasts_all];
  } else if (all_today_forecasts.length < 7) {
    return [...all_today_forecasts];
  } else {
    return all_today_forecasts.slice(0, 6);
  }
};

// Bengali numeral conversion utility
export function toBengaliNumber(input) {
  const enToBn = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return String(input).replace(/[0-9]/g, d => enToBn[d] || d);
}

import React from 'react';
import ErrorBox from '../../Reusable/ErrorBox';
import AirConditionsItem from './AirConditionsItem';
import Layout from '../../Reusable/Layout';

const TodayWeatherAirConditions = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === '404';

  let content;

  if (noDataProvided) {
    content = <ErrorBox flex="1" type="error" />;
  } else {
    content = (
      <>
        <AirConditionsItem
          title="অনুভূত তাপমাত্রা"
          value={`${Math.round(data.main.feels_like)} °C`}
          type="temperature"
        />
        <AirConditionsItem
          title="বাতাসের গতি"
          value={`${data.wind.speed} m/s`}
          type="wind"
        />
        <AirConditionsItem
          title="মেঘাচ্ছন্নতা"
          value={`${Math.round(data.clouds.all)} %`}
          type="clouds"
        />
        <AirConditionsItem
          title="আর্দ্রতা"
          value={`${Math.round(data.main.humidity)} %`}
          type="humidity"
        />
      </>
    );
  }
  return (
    <Layout
      title="বাতাসের অবস্থা"
      content={content}
      mb="1rem"
      sx={{ marginTop: '2.9rem' }}
    />
  );
};

export default TodayWeatherAirConditions;

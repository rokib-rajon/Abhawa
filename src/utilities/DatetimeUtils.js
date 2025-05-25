import { MONTHS, DAYS, MONTHS_BN, DAYS_BN } from './DateConstants';

const date = new Date();

export function getWeekDays(locale = 'bn') {
  const dayInAWeek = new Date().getDay();
  const days = (locale === 'bn' ? DAYS_BN : DAYS).slice(dayInAWeek, (locale === 'bn' ? DAYS_BN : DAYS).length).concat(
    (locale === 'bn' ? DAYS_BN : DAYS).slice(0, dayInAWeek)
  );
  return days;
}

export function getDayMonthFromDate(locale = 'bn') {
  const month = (locale === 'bn' ? MONTHS_BN : MONTHS)[date.getMonth()].slice(0, 3);
  const day = date.getUTCDate();

  return day + ' ' + month;
}

export function transformDateFormat(locale = 'bn') {
  const month = date.toLocaleString(locale === 'bn' ? 'bn-BD' : 'en-US', { month: '2-digit' });
  const day = date.toLocaleString(locale === 'bn' ? 'bn-BD' : 'en-US', { day: '2-digit' });
  const year = date.getFullYear();
  const time = date.toLocaleString(locale === 'bn' ? 'bn-BD' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const newFormatDate = year.toString().concat('-', month, '-', day, ' ', time);
  return newFormatDate;
}

export function getUTCDatetime(locale = 'bn') {
  const utcTime = date.toLocaleString(locale === 'bn' ? 'bn-BD' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'Asia/Dhaka',
  });

  const isoDateString = new Date().toISOString();
  const utcDate = isoDateString.split('T')[0].concat(' ', utcTime);
  return utcDate;
}

export function getUTCTime(locale = 'bn') {
  const utcTime = date.toLocaleString(locale === 'bn' ? 'bn-BD' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    timeZone: 'Asia/Dhaka',
  });

  return utcTime;
}

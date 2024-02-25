import * as Localization from 'expo-localization';

export const convertDateStr = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month}-${day}`;
}

export const getDayName = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/');
  const isoFormattedDate = `${year}-${month}-${day}T00:00`;

  const date = new Date(isoFormattedDate);
  const locale = Localization.locale || 'es-ES';
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  
  let formattedDate = new Intl.DateTimeFormat(locale, options).format(date);
  return `${formattedDate.slice(0, 1).toUpperCase()}${formattedDate.slice(1)}`;
}

export const convertTimeTo12HourFormat = (timeStr: string) => {
  const [hours24, minutes] = timeStr.split(':').map(Number);
  const hours12 = hours24 % 12 || 12;
  const amOrPm = hours24 < 12 ? 'AM' : 'PM';
  return `${hours12}:${minutes < 10 ? '0' : ''}${minutes}${amOrPm}`;
}

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

export const convertTimeTo12HourFormat = (timeStr: string): string => {
  // Check if the time is in 12-hour format with AM/PM
  const regex12HourFormat = /\d{1,2}:\d{2}\s?(?:AM|PM|am|pm|a\.\s?m\.|p\.\s?m\.)/;
  if (regex12HourFormat.test(timeStr)) {
      const timePart = timeStr.split(/[:\s]/);
      let hours = parseInt(timePart[0], 10);
      const minutes = timePart[1];
      const amPm = timePart[2] ? timePart[2].toUpperCase() : 'AM';

      if (amPm.startsWith('P') && hours < 12) {
          hours += 12;
      } else if (amPm.startsWith('A') && hours === 12) {
          hours = 0;
      }

      return `${hours % 12 || 12}:${minutes} ${amPm.startsWith('A') ? 'AM' : 'PM'}`;
  }

  // Convert 24-hour format to 12-hour format
  const [hours24, minutes] = timeStr.split(':').map(Number);
  const hours12 = hours24 % 12 || 12;
  const amOrPm = hours24 < 12 ? 'AM' : 'PM';
  return `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
};


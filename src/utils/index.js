import { getDate, getMonth, getYear } from 'date-fns';

const SUFFIX = {
  AM: "am",
  PM: "pm",
}

export const convertToFormattedHour = (time) => {
  const minute = time.slice(2);
  let hour =  Number(time.slice(0,2));
  let suffix = (hour >= 12 && hour < 24) ? SUFFIX.PM : SUFFIX.AM;
  if (hour%12 === 0) {
    hour = 12;
    return hour.toString() + ":" + minute + " " + suffix;
  }
  return (hour%12).toString() + ":" + minute + " " + suffix;
}

export const convertToCode = (formattedHour) => {

  const suffix = formattedHour.split(" ")[1];
  const time = formattedHour.split(" ")[0];
  let hour = Number(time.split(":")[0]);
  let minute = time.split(":")[1];

  if (
    (suffix === SUFFIX.PM && hour !== 12) ||
    (suffix === SUFFIX.AM && hour === 12)
  ) {
    hour+= 12;
  }

  hour = hour < 10 ? "0" + hour.toString() : hour.toString();

  return hour + minute;
}

export const isPastDay = day => {
  const today = new Date();
  const currentDate = getDate(today);
  const currentMonth = getMonth(today);
  const currentYear = getYear(today);
  const pickedDate = getDate(day);
  const pickedMonth = getMonth(day);
  const pickedYear = getYear(day);

  if (
    pickedYear < currentYear ||
    (pickedYear === currentYear && pickedMonth < currentMonth) ||
    (pickedYear === currentYear && pickedMonth === currentMonth && pickedDate < currentDate)
  ) return true ;

  return false;
}

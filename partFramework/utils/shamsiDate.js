const jalaali = require('jalaali-js');

module.exports = function getShamsiDate(addDays = 0) {
  // Get the current date and time
  let now = new Date();

  // Add the number of days (default is 0 for current day)
  now.setDate(now.getDate() + addDays);

  // Convert the current Gregorian date to Shamsi (Jalali)
  const shamsiDate = jalaali.toJalaali(now);

  // Get time components (hour, minute, second, millisecond)
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

  // Combine into the desired format
  const formattedShamsiDate = `${shamsiDate.jy}${(shamsiDate.jm).toString().padStart(2, '0')}${(shamsiDate.jd).toString().padStart(2, '0')}${hours}${minutes}${seconds}${milliseconds}`;
  
  return formattedShamsiDate;
}


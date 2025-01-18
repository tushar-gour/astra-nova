import asyncHandler from "express-async-handler";

const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const getRashi = asyncHandler(async (dob, birthTime) => {
  const [year, month, day] = dob.split("-");
  const [hours, minutes] = birthTime.split(":");

  // Convert birth time to decimal hours
  const decimalHours = parseInt(hours) + parseInt(minutes) / 60;

  // Calculate Julian Day
  const calculateJulianDay = (year, month, day) => {
    if (month <= 2) {
      year -= 1;
      month += 12;
    }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    const julianDay =
      Math.floor(365.25 * (year + 4716)) +
      Math.floor(30.6001 * (month + 1)) +
      day +
      B -
      1524.5;
    return julianDay;
  };

  const julianDay = calculateJulianDay(parseInt(year), parseInt(month), parseInt(day));

  // Calculate Rashi based on the moon's position
  const rashiIndex = Math.floor((julianDay + decimalHours / 24) % 12);
  return ZODIAC_SIGNS[rashiIndex];
});

export default getRashi;

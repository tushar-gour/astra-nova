import asyncHandler from "express-async-handler";

// List of planets used for Kundali
const PLANETS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
];

// Sidereal Zodiac Degrees
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

const getLagnaKundali = asyncHandler(async (dob, birthTime, latitude, longitude) => {
  // Step 1: Parse Date and Time
  const [year, month, day] = dob.split("-");
  const [hours, minutes] = birthTime.split(":");

  // Convert birth time to decimal hours
  const decimalHours = parseInt(hours) + parseInt(minutes) / 60;

  // Validate latitude and longitude
  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error("Invalid latitude or longitude values.");
  }

  // Step 2: Calculate Julian Day
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

  // Step 3: Calculate Sidereal Time
  const calculateLST = (julianDay, longitude) => {
    const T = (julianDay - 2451545.0) / 36525; // Julian centuries since J2000.0
    const GMST =
      280.46061837 +
      360.98564736629 * (julianDay - 2451545) +
      T ** 2 * 0.000387933 -
      (T ** 3) / 38710000;

    // Convert GMST to 0-360° range and adjust for longitude
    const GMSTNormalized = ((GMST % 360) + 360) % 360;
    const LST = GMSTNormalized + longitude;

    // Normalize to 0-360°
    return ((LST % 360) + 360) % 360;
  };

  const localSiderealTime = calculateLST(julianDay, longitude);

  // Step 4: Calculate Ascendant Degree
  const calculateAscendant = (localSiderealTime, latitude) => {
    const ascendantDegree = localSiderealTime; // LST directly corresponds to the ascendant
    return ((ascendantDegree % 360) + 360) % 360; // Normalize to 0-360°
  };

  const ascendantDegree = calculateAscendant(localSiderealTime, latitude);

  // Step 5: Determine Zodiac Sign for Ascendant
  const getZodiacSign = (degree) => {
    const signIndex = Math.floor(degree / 30); // Each zodiac spans 30°
    return ZODIAC_SIGNS[signIndex];
  };

  const ascendantZodiac = getZodiacSign(ascendantDegree);

  // Step 6: Allocate Planets to Houses
  const allocatePlanetsToHouses = (ascendantDegree) => {
    const houses = Array(12).fill(null);

    // Calculate the starting degree of each house
    for (let i = 0; i < 12; i++) {
      houses[i] = {
        house: i + 1,
        startDegree: (ascendantDegree + i * 30) % 360,
        zodiac: getZodiacSign((ascendantDegree + i * 30) % 360),
        planets: [], // Planets to be assigned later
      };
    }

    // Simulate planetary positions for demonstration (use real ephemeris data for production)
    PLANETS.forEach((planet) => {
      const randomDegree = Math.random() * 360;
      const houseIndex = Math.floor((randomDegree - ascendantDegree + 360) % 360 / 30);
      houses[houseIndex].planets.push({
        planet,
        degree: randomDegree % 360,
      });
    });

    return houses;
  };

  const houses = allocatePlanetsToHouses(ascendantDegree);

  // Step 7: Structure South Indian Style Chart
  const southIndianKundali = houses.map((house) => ({
    house: house.house,
    zodiac: house.zodiac,
    planets: house.planets.map((p) => `${p.planet} (${p.degree.toFixed(2)}°)`),
  }));

  const result = {
    ascendantDegree: ascendantDegree.toFixed(2),
    ascendantZodiac,
    kundali: southIndianKundali,
  };

  console.log(result);

  return result;
});

export default getLagnaKundali;

import asyncHandler from "express-async-handler";
import getLagnaKundali from "./kundali.js"; // Importing the Lagna Kundali function

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

const getNavasmaKundali = asyncHandler(async (dob, birthTime, latitude, longitude) => {
  // Get the Lagna Kundali first
  const lagnaKundali = await getLagnaKundali(dob, birthTime, latitude, longitude);

  // Step 1: Calculate Navamsa for each house
  const navamsaKundali = lagnaKundali.kundali.map((house) => {
    const navamsaDegree = (house.startDegree % 30) / 30 * 9; // Calculate Navamsa degree
    const navamsaIndex = Math.floor(navamsaDegree); // Determine Navamsa index
    return {
      house: house.house,
      navamsa: ZODIAC_SIGNS[navamsaIndex], // Assign Navamsa based on index
      planets: house.planets, // Keep the same planets in the Navamsa
    };
  });

  return navamsaKundali;
});

export default getNavasmaKundali;

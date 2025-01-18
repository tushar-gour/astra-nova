from datetime import datetime
import math

# Nakshatra and Rashi Data (simplified for demonstration)
nakshatra_rashi_map = {
    "Ashwini": "Aries", "Bharani": "Aries", "Krittika": "Taurus", "Rohini": "Taurus",
    "Mrigashira": "Gemini", "Ardra": "Gemini", "Punarvasu": "Cancer", "Pushya": "Cancer",
    "Ashlesha": "Cancer", "Magha": "Leo", "Purva Phalguni": "Leo", "Uttara Phalguni": "Virgo",
    "Hasta": "Virgo", "Chitra": "Libra", "Swati": "Libra", "Vishakha": "Scorpio",
    "Anuradha": "Scorpio", "Jyeshtha": "Sagittarius", "Mula": "Sagittarius", "Purva Ashadha": "Capricorn",
    "Uttara Ashadha": "Capricorn", "Shravana": "Aquarius", "Dhanishta": "Aquarius",
    "Shatabhisha": "Pisces", "Purva Bhadrapada": "Pisces", "Uttara Bhadrapada": "Pisces"
}

# Simplified algorithm to calculate lunar longitude based on the birth date
def calculate_lunar_longitude(date_of_birth):
    # This is a simplified version and does not account for complex calculations
    # It would typically require actual lunar ephemerides or data for exact positions
    # For now, we simulate it as a simple function.
    base_date = datetime(2000, 1, 1)
    days_since_base = (date_of_birth - base_date).days
    lunar_longitude = (days_since_base * 13.2) % 360  # Approximation
    
    return lunar_longitude

# Function to determine Nakshatra from lunar longitude
def determine_nakshatra(lunar_longitude):
    nakshatra_boundaries = [
        (0, "Ashwini"), (13.33, "Bharani"), (26.66, "Krittika"), (40, "Rohini"),
        (53.33, "Mrigashira"), (66.66, "Ardra"), (80, "Punarvasu"), (93.33, "Pushya"),
        (106.66, "Ashlesha"), (120, "Magha"), (133.33, "Purva Phalguni"), (146.66, "Uttara Phalguni"),
        (160, "Hasta"), (173.33, "Chitra"), (186.66, "Swati"), (200, "Vishakha"),
        (213.33, "Anuradha"), (226.66, "Jyeshtha"), (240, "Mula"), (253.33, "Purva Ashadha"),
        (266.66, "Uttara Ashadha"), (280, "Shravana"), (293.33, "Dhanishta"), (306.66, "Shatabhisha"),
        (320, "Purva Bhadrapada"), (333.33, "Uttara Bhadrapada"), (346.66, "Revati")
    ]
    
    for boundary, nakshatra in nakshatra_boundaries:
        if lunar_longitude < boundary:
            return nakshatra
    return "Revati"

# Function to determine Rashi based on Nakshatra
def determine_rashi(nakshatra):
    return nakshatra_rashi_map.get(nakshatra, "Unknown")

# Main function
def get_rashi(date_of_birth):
    lunar_longitude = calculate_lunar_longitude(date_of_birth)
    nakshatra = determine_nakshatra(lunar_longitude)
    rashi = determine_rashi(nakshatra)
    return rashi

# Test case
birth_date = datetime(2004, 2, 29, 23, 0)  # February 29, 2004, at 11:00 PM
rashi = get_rashi(birth_date)
print("Your Rashi is:", rashi)

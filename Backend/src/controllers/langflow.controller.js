import getRashi from "../utils/rashi.js";
import getLagnaKundali from "../utils/kundali.js";
import getLatLong from "../utils/latlong.js";

const fetchAnalytics = async (req, res) => {
    try {
        const { dob, birthTime, birthCity = "Indore" } = req.body;

        const rashi = await getRashi(dob, birthTime);
        const latlong = await getLatLong(birthCity);

        // Check if latlong is null
        if (!latlong) {
            return res.status(400).json({ message: "City not found." });
        }

        const lagnaKundali = await getLagnaKundali(dob, birthTime, latlong["latitude"], latlong["longitude"]);

        // Send the lagnaKundali response
        return res.status(200).json({ rashi, lagnaKundali });
        
    } catch (error) {
        console.error("Error in fetchAnalytics:", error.stack);
        return res.status(500).json({ message: error.message });
    }
};

export default fetchAnalytics;

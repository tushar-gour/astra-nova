import langflowMain from "../services/langflowclient.js";

const fetchAnalytics = async (req, res) => {
    try {
        const { inputValue } = req.body;

        const response = await langflowMain(inputValue);
        return res.status(200).json({ message: response });
    } catch (error) {
        console.error("Error in fetchAnalytics:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export default fetchAnalytics;

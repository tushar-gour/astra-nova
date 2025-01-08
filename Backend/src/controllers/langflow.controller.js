import LangflowClient from "../services/langflowclient.js";

const langflowClient = new LangflowClient();

const fetchAnalytics = async (req, res) => {
    try {
        const {
            inputValue,
            inputType = "text",
            outputType = "chat",
            stream = false,
        } = req.body;

        const langflowID = process.env.LANGFLOW_ID;
        const flowID = process.env.FLOW_ID;

        if (!process.env.API_TOKEN) {
            return res.status(500).json({ message: "Missing API Token" });
        }

        const endPoint = `/lf/${langflowID}/api/v1/run/${flowID}`;
        const body = {
            input_value: inputValue,
            input_type: inputType,
            output_type: outputType,
            tweaks: {},
        };

        const response = await langflowClient.post(endPoint, body);

        res.status(200).json({ message: response });
    } catch (error) {
        console.error("Error in fetchAnalytics:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export default fetchAnalytics;

// Note: Replace **<YOUR_APPLICATION_TOKEN>** with your actual Application token

export default class LangflowClient {
    constructor() {
        this.baseURL = "https://api.langflow.astra.datastax.com";
        this.applicationToken = process.env.LANGFLOW_TOKEN;
    }
    async post(
        endpoint,
        body,
        headers = { "Content-Type": "application/json" }
    ) {
        headers["Authorization"] = `Bearer ${process.env.LANGFLOW_TOKEN}`;

        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(
                    `${response.status} ${
                        response.statusText
                    } - ${JSON.stringify(responseMessage)}`
                );
            }
        } catch (error) {
            console.error("Request Error:", error.message);
            throw error;
        }
    }

    async initiateSession(
        flowId,
        langflowId,
        inputValue,
        inputType = "chat",
        outputType = "chat",
        stream = false,
        tweaks = {}
    ) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, {
            input_value: inputValue,
            input_type: inputType,
            output_type: outputType,
            tweaks: tweaks,
        });
    }

    handleStream(streamUrl, onUpdate, onClose, onError) {
        const eventSource = new EventSource(streamUrl);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onUpdate(data);
        };

        eventSource.onerror = (event) => {
            console.error("Stream Error:", event);
            onError(event);
            eventSource.close();
        };

        eventSource.addEventListener("close", () => {
            onClose("Stream closed");
            eventSource.close();
        });

        return eventSource;
    }

    async runFlow(
        flowIdOrName,
        langflowId,
        inputValue,
        inputType = "chat",
        outputType = "chat",
        tweaks = {},
        stream = false,
        onUpdate,
        onClose,
        onError
    ) {
        try {
            const initResponse = await this.initiateSession(
                flowIdOrName,
                langflowId,
                inputValue,
                inputType,
                outputType,
                stream,
                tweaks
            );
            console.log("Init Response:", initResponse);
            if (
                stream &&
                initResponse &&
                initResponse.outputs &&
                initResponse.outputs[0].outputs[0].artifacts.stream_url
            ) {
                const streamUrl =
                    initResponse.outputs[0].outputs[0].artifacts.stream_url;
                console.log(`Streaming from: ${streamUrl}`);
                this.handleStream(streamUrl, onUpdate, onClose, onError);
            }
            return initResponse;
        } catch (error) {
            console.error("Error running flow:", error);
            onError("Error initiating session");
        }
    }
}

async function main(
    inputValue,
    inputType = "chat",
    outputType = "chat",
    stream = false
) {
    const flowIdOrName = "0cd30daa-42aa-48c7-a5d3-b316a2ec2e2d";
    const langflowId = "538b9a06-be1f-4b38-9182-f7bac66d1520";
    const applicationToken = process.env.LANGFLOW_TOKEN;
    const langflowClient = new LangflowClient(
        "https://api.langflow.astra.datastax.com",
        applicationToken
    );

    try {
        const tweaks = {
            "ParseData-55QZT": {},
            "ChatInput-v5Bdq": {},
            "AstraDBToolComponent-jGUkb": {},
            "Agent-BWNbQ": {},
            "ChatOutput-xCrgo": {},
            "Prompt-plbUp": {},
        };
        response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            inputValue,
            inputType,
            outputType,
            tweaks,
            stream,
            (data) => console.log("Received:", data.chunk), // onUpdate
            (message) => console.log("Stream Closed:", message), // onClose
            (error) => console.log("Stream Error:", error) // onError
        );
        if (!stream && response && response.outputs) {
            const flowOutputs = response.outputs[0];
            const firstComponentOutputs = flowOutputs.outputs[0];
            const output = firstComponentOutputs.outputs.message;

            console.log("Final Output:", output.message.text);
        }
    } catch (error) {
        console.error("Main Error", error.message);
    }
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error(
        'Please run the file with the message as an argument: node <YOUR_FILE_NAME>.js "user_message"'
    );
}
main(
    args[0], // inputValue
    args[1], // inputType
    args[2], // outputType
    args[3] === "true" // stream
);

import Groq from "groq-sdk";

async function groqMain(city) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_KEY });
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Give me the latitude and longitude of ${city} in JSON format with keys "latitude" and "longitude". Don't write anything else.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false, // Disable streaming to process the full JSON response
      stop: null,
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    const locationData = JSON.parse(responseContent);

    return locationData;
  } catch (error) {
    console.error("Error occurred:", error);
    return null;
  }
}

export default groqMain;

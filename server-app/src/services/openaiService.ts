import OpenAI from 'openai';

// For given meeting transcript, this method calls OpenAPI and fetches summary of the transcript.
const generateSummary = async (transcript: string): Promise<string> => {
  const apiKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI assistant that summarizes text transcripts from meetings." },
        { role: "user", content: `Please summarize the following transcript:\n\n${transcript}` }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Extract and return the summary from the correct property
    if (response.choices && response.choices.length > 0) {
      const message = response.choices[0].message;
      if (message && typeof message.content === 'string') {  
        return message.content.trim(); 
      }
    }
    
    throw new Error("ChatGPT API did not return a valid response.");

  } catch (error) {
    console.error("Error generating summary:", error);
    throw error; // Re-throw for handling in your route/controller
  }
};

export default generateSummary;
import OpenAI from 'openai';

// For given meeting transcript, this method calls OpenAPI and fetches summary of the transcript.
const generateActionItems = async (transcript: string): Promise<string> => {
  const apiKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI assistant that provides user-wise action items using the text transcripts from meetings." },
        { role: "user", content: `Please provide the action items for the following transcript:\n\n${transcript}. Provide response as a stringified array of JSON format: such that key of JSON is Name of person, and value is the action item for that person. Example: [{'John': 'My Tasks'}, {'Doe': 'My other tasks'}]` }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Extract and return the summary from the correct property
    if (response.choices && response.choices.length > 0) {
      const message = response.choices[0].message;
      if (message && typeof message.content === 'string') {  
        console.log(message.content);
        return (message.content || '').trim().replace('```json', '').replace('```', '').trim(); 
      }
    }
    
    throw new Error("ChatGPT API did not return a valid response.");

  } catch (error) {
    console.error("Error generating summary:", error);
    throw error; // Re-throw for handling in your route/controller
  }
};

export default generateActionItems;
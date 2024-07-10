import axios from 'axios';

// For given botId for a meeting url, this method gives prettified transcript content
const getFinalTranscript = async (botId: string): Promise<string> => {
    console.log(`Bot Id: ${botId}`)

    const transcriptObject = await fetchTranscriptFromMeeting(botId);
    if( transcriptObject === null ) throw 'Could not get transcript. Please try again later: '; // Return Empty string if meeting trancript could not be fetched

    return formatTranscript(transcriptObject); // Return formatted transcript
  };

// This method formats Recall API transcript response into prettified content.
const formatTranscript = (transcriptObject: object[]) => {
    let formattedText = "";
  
    for (const segment of transcriptObject) {
      const speaker = (segment as any).speaker;
      const words = (segment as any).words;
  
      for (const word of words) {
        formattedText += `${speaker}: ${word.text} `;
      }
  
      // Add a newline after each segment for better readability
      formattedText += "\n";
    }
    return formattedText;
}

// For given botId for a meeting url, this method calls Recall API to fetches transcript of the meeting.
const fetchTranscriptFromMeeting = async (botId: string) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.recall.ai/api/v1/bot/${botId}/transcript`,
        headers: { 
          'Authorization': `Token ${process.env.RECALL_API_KEY}`
        }
      };
      
      return await axios.request(config)
        .then((response: any) => {
            if (response.status === 200) {  // Transcript was successfully fetched.
                return response.data // return transcript
            }
            throw 'Could not get transcript. Please try again later.';
        })
        .catch((error: any) => {
            console.log(error);
            throw 'Could not get transcript. Please try again later: ' + error;
        });
}

export default getFinalTranscript;
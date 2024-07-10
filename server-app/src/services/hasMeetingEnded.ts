import axios from 'axios';

// This method checks the status of the meeting using the botId
const hasMeetingEnded = async (botId: string) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.recall.ai/api/v1/bot/${botId}`,
        headers: { 
          'Authorization': `Token ${process.env.RECALL_API_KEY}`
        }
      };
      
      return await axios.request(config)
        .then((response: any) => {
            if (response.status === 200) {
                return checkDoneStatus(response.data) // return response
            }
            throw 'Could not get meeting status';
        })
        .catch((error: any) => {
            console.log(error);
            throw 'Could not get meeting status';
        });
}

const checkDoneStatus = (response: any) => {
    return response.status_changes?.some((status: any) => status.code === "done") ?? false;
}

export default hasMeetingEnded;
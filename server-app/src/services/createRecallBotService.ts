import axios from 'axios';

// This method creates a recall Bot that listens in on a zoom meeting for which the url is provided
const createRecallBot = async (meetingLink: string) => {
    let data = JSON.stringify({
        "meeting_url": meetingLink,
        "bot_name": "Meeting Bot",
        "transcription_options": {
            "provider": "meeting_captions"
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.recall.ai/api/v1/bot/',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Token ${process.env.RECALL_API_KEY}`
        },
        data : data
    };

    return await axios.request(config)
        .then((response: any) => {
            if (response.status === 201) {  // Bot was successfully created.
                console.log(response.data)
                return response.data["id"] // return Bot ID
            }
            console.log(response.status, response.data)

            throw 'Create bot was not successful';
        })
        .catch((error: any) => { // Error calling API
            console.log(error);
            throw 'Create bot was not successful: ' + error;
        });
}

export default createRecallBot;
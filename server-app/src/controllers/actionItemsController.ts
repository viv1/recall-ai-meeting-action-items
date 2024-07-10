import { Request, Response } from 'express';
import getFinalTranscript from '../services/transcriptService';
import  generateActionItems from '../services/openaiService';
import  hasMeetingEnded from '../services/hasMeetingEnded';

const POLLING_INTERVAL = 5000; // 5 seconds
const MAX_POLLING_TIME = 3600000; // 1 hour

export const actionItemsController = async (req: Request, res: Response) => {
  try {
    const { botId } = req.body;

    const meetingEndResult = await checkForMeetingStatus(botId);

    if (typeof meetingEndResult === 'string') {
      // If meetingEndResult is a string, it's an error message
      res.status(500).json({ error: meetingEndResult});
    }

    if (meetingEndResult === true) {
      // Meeting has ended, proceed with getting transcript and generating summary
      const transcript = await getFinalTranscript(botId);
      const action_items = await generateActionItems(transcript);
      console.log(action_items)
      res.json({ action_items: JSON.parse(action_items) });
    } 
    else {
      res.status(204).json({ 'message': 'meeting in progress' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error: ' + error });
  }
};

const checkForMeetingStatus = (botId: string): Promise<boolean | string> => {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const checkMeetingStatus = async () => {
      try {
        const result = await hasMeetingEnded(botId);
        if (typeof result === 'string') {
          // If result is a string, it's an error message
          resolve(result);
        } else if (result) {
          // Meeting has ended
          resolve(true);
        } else if (Date.now() - startTime > MAX_POLLING_TIME) {
          // Max polling time reached
          resolve(false);
        }
        resolve(false);
      } catch (error) {
        resolve(`Error checking meeting status: ${error}`);
      }
    };

    checkMeetingStatus();
  });
};

export default actionItemsController;
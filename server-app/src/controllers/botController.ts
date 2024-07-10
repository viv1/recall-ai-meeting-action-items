import { Request, Response } from 'express';
import createRecallBot from '../services/createRecallBotService';

export const botController = async (req: Request, res: Response) => {
  try {
    const { meetingLink } = req.body;
    // Create Recall Meeting Bot
    const botId = await createRecallBot(meetingLink)
    res.json({ botId });

  } catch (error) {
    console.error('Error in creating Recall Meeting Bot:', error);
    res.status(500).json({ error: 'Error in creating Recall Meeting Bot' });
  }
};

export default botController;
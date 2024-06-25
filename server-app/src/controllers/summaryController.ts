import { Request, Response } from 'express';
import getFinalTranscript from '../services/transcriptService';
import generateSummary from '../services/openaiService';

export const summarizeMeeting = async (req: Request, res: Response) => {
  try {
    const { botId } = req.body;

    // Get transcript
    const transcript = await getFinalTranscript(botId);

    // Generate summary
    const summary = await generateSummary(transcript);

    res.json({ summary, transcript });
  } catch (error) {
    console.error('Error in summarizeMeeting:', error);
    res.status(500).json({ error: 'An error occurred while summarizing the meeting' });
  }
};

export default summarizeMeeting;
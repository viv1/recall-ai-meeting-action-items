import express from 'express';
import { summarizeMeeting } from '../controllers/summaryController';
import { botController } from '../controllers/botController';

const router = express.Router();

router.post('/create_bot', botController); // API for creating Recall Bot

router.post('/summarize', summarizeMeeting); // API for summarizing Meeting

export default router;


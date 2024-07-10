import express from 'express';
import { actionItemsController } from '../controllers/actionItemsController';
import botController from '../controllers/botController';

const router = express.Router();

router.post('/action_items', actionItemsController); // API for summarizing Meeting
router.post('/create_bot', botController); // API for summarizing Meeting

export default router;


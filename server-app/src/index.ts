import express from 'express';
import cors from 'cors';
import serviceRoutes from './routes/serviceRoutes';
import dotenv from 'dotenv';

dotenv.config();  // Load env

console.log(process.env.OPENAI_API_KEY)

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// app.use('/summarize', summaryRoutes);
app.use('/', serviceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

dotenv.config()
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.ts';

dotenv.config();

const app = express();
const PORT = 3000

app.use(express.json());

app.use('/', authRoutes);

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}` ));

import express from 'express';
import authRoutes from './routes/authRoutes.ts';
import todosRouter from "./routes/todosRouter.ts";
import cors from 'cors'

const app = express();
const PORT = 3000

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json());

app.use('/', authRoutes);
app.use('/',todosRouter)

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}` ));

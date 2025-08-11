import express from 'express';
import authRoutes from './routes/authRoutes.ts';
import todosRouter from "./routes/todosRouter.ts"


const app = express();
const PORT = 3000

app.use(express.json());

app.use('/', authRoutes);
app.use('/',todosRouter)

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}` ));

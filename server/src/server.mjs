import express, { request, response } from 'express';
import userRouter from './routes/users.mjs'
import cors from 'cors';
import { sequelize } from './models/index.mjs';
//import { injectDb } from './middlewares/injectDb.mjs';


const app = express();

app.use(cors());
app.use(express.json());
//app.use(injectDb);
app.use(userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

sequelize.sync().then(() => {
  console.log('Conectado ao BD')
})
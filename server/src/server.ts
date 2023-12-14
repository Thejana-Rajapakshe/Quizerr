import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import questionRouter from './routes/question.routes'
import quizRouter from './routes/quiz.routes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', questionRouter);
app.use('/', quizRouter);

mongoose.connect('mongodb://localhost:27017/quizzz-dev')
    .then(() => {
        console.log('Connected to database 100%');
    })
    .catch((err) => {
        console.log('Error: unable to connect to database', err);
    })


const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express Server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
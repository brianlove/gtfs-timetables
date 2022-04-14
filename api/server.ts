
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import BaseRouter from './src/routes';

const app = express();
app.use(cors({
    origin: ['http://localhost:8080', 'https://www.google.com'],
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api', BaseRouter);

export default app;

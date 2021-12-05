
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import BaseRouter from './src/routes';

import sequelize from './src/db/sequelize';

const app = express();
app.use(cors({
    origin: ['http://localhost:8080', 'https://www.google.com'],
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api', BaseRouter);

sequelize.sync();

export default app;

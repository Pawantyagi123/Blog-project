import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbConnection } from './database/dbConnection.js';
import {errorMiddleware} from './middlewares/error.js'
import userRouter from './routes/userRoute.js'
import blogRouter from './routes/blogRoute.js'
import fileUpload from 'express-fileupload';

const app = express();
dotenv.config({path: "./config/.env"});


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT","DELETE","HEAD"],
    credentials: true
})
    );

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use(fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
    );
    
    app.use("/user", userRouter);
    app.use("/blog", blogRouter);
dbConnection();

app.use(errorMiddleware);
export default app;


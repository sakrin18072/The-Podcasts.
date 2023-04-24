import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import podRoute from './routes/podRoute.js';
import { fileURLToPath } from 'url'
dotenv.config();
connectDB();


let app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))
app.use("*",(request,response)=>{
    response.sendFile(path.join(__dirname,'./client/build/index.html'))
  })

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/podcast',podRoute);
app.listen(process.env.PORT || 8080,()=>{console.log("Server is listening on port 8080")});

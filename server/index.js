import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute.js';


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, 
    console.log("CONNECTED TO THE DATABASE"))

const PORT = process.env.PORT || 5000;

app.use('/', userRoute);

app.listen(PORT , () => {
    console.log(`Server running on PORT ${PORT}`);
})
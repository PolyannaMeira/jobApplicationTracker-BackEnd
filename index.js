
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// import routes

import jobRoutes from './routes/job.js';
import userRoutes from './routes/user.js';

// Load environment variables
dotenv.config();

// set port
const PORT = process.env.PORT || 5000;

// Construct path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// initialize express
const app = express();

app.use(cors({
  origin: ['https://job-application-tracker-front-end-nu.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));



// parse body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(PATH, 'public')));




app.use('/jobs', jobRoutes);
app.use('/users', userRoutes);


// error
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// handle 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page is not found' });
});

export default app;

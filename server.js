import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import jobRoutes from './routes/job.js';
import userRoutes from './routes/user.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

const app = express();



const allowedOrigins = [
  'http://localhost:5173', // local
  'https://job-application-tracker-front-end-nu.vercel.app' // produção
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir chamadas sem origin (como postman) ou de origens autorizadas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

console.log('DATABASE_URL:', process.env.DATABASE_URL);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(PATH, 'public')));

app.use('/jobs', jobRoutes);
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Backend API is online' });
});


app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page is not found' });
});

export default app; 

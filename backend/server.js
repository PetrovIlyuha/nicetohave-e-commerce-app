import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config();
import fs from 'fs';
import path from 'path';

// creating express instance
const app = express();

// Routers
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// models registration
import('./models/userModel.js');

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`MongoDB cluster connection success`);
  })
  .catch(err => {
    console.log(`MongoDB connection was not established. Reason: ${err}`);
  });

// routes
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);

// Starting express server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});

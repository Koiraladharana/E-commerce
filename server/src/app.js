import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

import User from './models/userModel.js';

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
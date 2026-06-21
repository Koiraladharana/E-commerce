import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import User from './models/userModel.js';
import favoriteRoutes from './routes/favoriteRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'https://moviefetch-one.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
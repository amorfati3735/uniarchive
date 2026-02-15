import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db';
import resourceRoutes from './routes/resourceRoutes';
import statsRoutes from './routes/statsRoutes';
import aiRoutes from './routes/aiRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/resources', resourceRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('UniArchive API is running...');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;

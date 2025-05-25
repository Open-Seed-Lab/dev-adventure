import express from 'express'
import { config } from 'dotenv';
import { connectDB } from './lib/db';
import authRoutes from './routes/auth.route';
import messageRoutes from './routes/messages.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}));

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

const port = process.env.PORT || 5001

app.listen(port, () => {
	console.log(`[mern-chat-app] Server is running in Port: ${port}`);
	connectDB();
})

import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

import { connectDB } from "./lib/db.js";
import fileUpload from "express-fileupload";

import path from 'path'

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const isDev = process.env.NODE_ENV === 'development';
const __dirname = path.resolve()

app.use(express.json()) // to parse req.body

// Pass no parameters
app.use(clerkMiddleware()) /* This adds auth to req obj => req.user */
app.use(fileUpload({
	useTempFiles: true,
	tempFileDir: path.join(__dirname, "tmp"),
	createParentPath: true,
	limits: {
		fileSize: 10 * 1024 * 1024
	}
}))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.use((error, req, resp, next) => {
	resp.status(500).json({ success: false, message: isDev ? error.message : 'Internal Server Error' })
})

app.listen(PORT, () => {
	console.log('[spotify-clone] [backend] - is running on port: ', PORT);
	connectDB();
})


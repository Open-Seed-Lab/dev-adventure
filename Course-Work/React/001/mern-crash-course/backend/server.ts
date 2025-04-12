import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import productRouter from './routes/product.route';
import { ApiResponse } from "./models/apiresponse";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Enable JSON request body parsing

app.get("/", (req: Request, res: Response<ApiResponse<string>>) => {
	res.send({ success: true, data: "Server is Ready" }); // Basic server status route
});

app.use('/api/products/', productRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	connectDB(); // Connect to database
	console.log(`[mern-crash-course] Server started at http://localhost:${PORT}`);
});

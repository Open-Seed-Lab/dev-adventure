import { Response } from "express"
import { ApiResponse } from "../models/ApiResponse"
import { sign } from 'jsonwebtoken';
import mongoose from "mongoose";

export const generateJWTToken = (userId: mongoose.Types.ObjectId, res: Response<ApiResponse>) => {
	const jwtSecret = process.env.JWT_SECRET_KEY;
	if (!jwtSecret) {
		console.error(`[mern-chat-app] Error generating Auth Token missing Secret`)
		throw new Error('Internal Sever Error');
	}
	const token = sign({ userId }, jwtSecret, {
		expiresIn: "7d"
	})
	res.cookie('jwtToken', token, {
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
		httpOnly: true, // prevent xss
		sameSite: "strict",
		secure: process.env.NODE_ENV !== 'development',
	});
	return token;
}

export const handleErrorGeneric = (
	logPrefix: string,
	error: unknown,
	res: Response<ApiResponse, Record<string, any>>
) => {
	if (error instanceof Error) {
		console.error(`[mern-crash-course] Error ${logPrefix}: `, error.message);
	} else {
		console.error(`[mern-crash-course] An unknown Error ${logPrefix}: `, error);
	}
	res.status(500).json({ success: false, message: "Internal Server Error" });
}

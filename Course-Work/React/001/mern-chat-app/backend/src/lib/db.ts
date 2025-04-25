import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI || '')
		console.log(`[mern-chat-app] Mongo Db Connected to host: ${conn.connection.host}`);
	} catch (error) {
		console.log(`[mern-chat-app] Mongo Db Connection Error: ${error}`);
	}
}

import { connect } from 'mongoose'
import { handleErrorGeneric } from './utils.js';

export const connectDB = async () => {
	try {
		const conn = await connect(process.env.MONGO_URI);
		console.log(`[spotify-clone] [backend] Connected to MongoDB`)
	} catch (error) {
		handleErrorGeneric('Connecting to Database', error)
		process.exit(1)
	}
}

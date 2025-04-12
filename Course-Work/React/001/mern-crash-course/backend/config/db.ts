import mongoose from 'mongoose'

export const connectDB = async (): Promise<void> => {
	try {
		const { connection } = await mongoose.connect(process.env.MONGO_URI || '')
		console.log(`[mern-crash-course] mongoDB connected ${connection.host}`)
	} catch (error: any) {
		console.log(`[mern-crash-course] Error: ${error.message}`)
		process.exit(1); // 0: Success, 1: Failure
	}
}

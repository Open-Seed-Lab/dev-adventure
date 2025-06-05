import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	clerkId: {
		type: String,
		required: true,
		unique: true
	}
}, {
	timestamps: true /* created at and updated at */
})

export const User = mongoose.model('User', userSchema);

import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
	senderId: {
		type: String,
		required: true
	},
	receiverId: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
}, {
	timestamps: true /* created at and updated at */
})

export const Message = mongoose.model('Message', messageSchema);

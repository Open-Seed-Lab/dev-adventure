import mongoose from 'mongoose'

const songSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	audioUrl: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true,
	},
	albumId: {
		type: mongoose.Schema.Types.ObjectId,
		required: false
	},
}, {
	timestamps: true /* created at and updated at */
})

export const Song = mongoose.model('Song', songSchema);

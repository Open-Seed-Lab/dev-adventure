import { Song } from '../models/song.model.js'
import { Album } from '../models/album.model.js'
import cloudinary from '../lib//cloudinary.js'
import { handleErrorGeneric } from '../lib/utils.js'

const uploadToCloudinary = async (file) => {
	try {
		const result = await cloudinary.uploader.upload(file.tempFilePath, { "resource_type": "auto" })
		return result.secure_url;
	} catch (error) {
		handleErrorGeneric('Error uploading File to Cloudinary')
	}
}

export const createSong = async (req, res, next) => {
	console.log(`[spotify-clone] [backend] - admin - createSong: `)
	try {
		if (!req.files || !req.files.audioFile || !req.files.imageFile) {
			res.send(400).json({ success: false, message: "please upload all files" })
		}
		const {
			title, artist, albumId = null, duration,
			files: {
				audioFile,
				imageFile
			}
		} = req.body
		const imageUrl = await uploadToCloudinary(imageFile);
		const audioUrl = await uploadToCloudinary(audioFile);
		const song = new Song({
			title,
			artist,
			imageUrl,
			audioUrl,
			duration,
			albumId
		});
		await song.save();

		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: song._id }
			});
		}
		res.status(201).json({ success: true, data: song })
		return;
	} catch (error) {
		handleErrorGeneric('admin controller create song', error)
		next(error)
	}
}

export const deleteSong = async (req, resp, next) => {
	console.log(`[spotify-clone] [backend] - admin - deleteSong: `)
	try {
		const { id } = req.params
		const songToDelete = await Song.findById(id)
		const { albumId, _id } = songToDelete

		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$pull: { songs: _id }
			});
		}
		await Song.findByIdAndDelete(id)
		resp.status(201).json({ success: true, message: "song deleted successfully" })
		return;
	} catch (error) {
		handleErrorGeneric('Admin Controller Deleting Song', error)
		next(error)
	}
}

export const createAlbum = async (req, resp, next) => {
	try {
		const { title, artist, releaseYear } = req.body
		const { imageFile } = req.files
		const imageUrl = await uploadToCloudinary(imageFile);
		const albumToAdd = new Album({
			title, artist, releaseYear
		})
		await albumToAdd.save();
		resp.status(201).json({ success: true, data: albumToAdd })
	} catch (error) {
		handleErrorGeneric('Admin Controller Creating Album', error)
		next(error)
	}
}

export const deleteAlbum = async (req, resp, next) => {
	try {
		const { id: albumId } = req.params
		await Song.deleteMany({ albumId })
		await Album.findByIdAndDelete(albumId)
		resp.status(200).json({ success: true, message: "Deleted Album and It's songs Successfully" })
	} catch (error) {
		handleErrorGeneric('Admin Controller Deleting Album', error)
		next(error)
	}
}

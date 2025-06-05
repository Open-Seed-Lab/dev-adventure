import { handleErrorGeneric } from '../lib/utils.js';
import { Album } from '../models/album.model.js'

export const getAllAlbums = async (req, resp, next) => {
	console.log(`[spotify-clone] [backend] - get all albums: `);
	try {
		const albums = await Album.find();
		return resp.status(200).json({ success: true, data: albums })
	} catch (error) {
		handleErrorGeneric('Album Controller : Get all Albums :', error);
		next(error)
	}
}

export const getAlbumById = async (req, resp) => {
	console.log(`[spotify-clone] [backend] - get album by Id: `);
	const { albumId } = req.params;
	try {
		const album = await Album.findById(albumId);
		if (!album) {
			return resp.status(404).json({ success: false, message: 'Album Not Found' })
		}
		return resp.status(200).json({ success: true, data: album }).populate(songs)
	} catch (error) {
		handleErrorGeneric(`Album Controller : Get Album by Id : ${albumId} :`, error);
		next(error)
	}
}


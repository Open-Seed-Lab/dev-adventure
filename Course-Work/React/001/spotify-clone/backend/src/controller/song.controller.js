import { Song } from '../models/song.model.js'

export const getAllSongs = async (req, resp, next) => {
	console.log(`[spotify-clone] [backend] - Get All Songs: `)
	try {
		const songs = await Song.find()
		return resp.status(200).json({ success: true, data: songs })
	} catch (error) {
		handleErrorGeneric('Songs Controller : Get all Songs :', error);
		next(error)
	}
}


export const getSongById = async (req, resp, next) => {
	console.log(`[spotify-clone] [backend] - Get Song by Id: `)
	const { songId } = req.params
	try {
		const songs = await Song.findById(songId)
		return resp.status(200).json({ success: true, data: songs })
	} catch (error) {
		handleErrorGeneric('Songs Controller : Get all Songs :', error);
		next(error)
	}
}

export const getFeaturedSongs = async (req, resp, next) => {
	console.log(`[spotify-clone] [backend] - Get Featured Songs: `)
	try {
		const songs = await Song.aggregate([
			{ $sample: { size: 6 } },
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				}
			}
		])
		return res.status(200).json({ success: true, data: songs })
	} catch (error) {
		handleErrorGeneric('Songs Controller : Get Favourite Songs :', error);
		next(error)
	}
}

export const getMadeForYou = async (req, resp, next) => {
	console.log(`[spotify-clone] [backend] - Get Made For You Songs: `)
	try {
		const songs = await Song.aggregate([
			{ $sample: { size: 4 } },
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				}
			}
		])
		return resp.status(200).json({ success: true, data: songs })
	} catch (error) {
		handleErrorGeneric('Songs Controller : Get Made For You Songs :', error);
		next(error)
	}
}

export const getTrending = async (req, resp, next) => {
	console.log(`[spotify-clone] [backend] - Get Trending Songs: `)
	try {
		const songs = await Song.aggregate([
			{ $sample: { size: 10 } },
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				}
			}
		])
		return resp.status(200).json({ success: true, data: songs })
	} catch (error) {
		handleErrorGeneric('Songs Controller : Get Trending Songs :', error);
		next(error)
	}
}

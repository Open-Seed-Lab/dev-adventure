import { handleErrorGeneric } from '../lib/utils.js'
import { Song } from '../models/song.model.js'

export const getAllSongs = async (req, res, next) => {
	console.log(`[spotify-clone] [backend] - Get All Songs: `)
	try {
		const songs = await Song.find().sort({ createdAt: -1 });
		return res.status(200).json({ success: true, data: songs })
	} catch (error) {
		handleErrorGeneric('Songs Controller : Get all Songs :', error);
		next(error)
	}
}


// export const getSongById = async (req, resp, next) => {
// 	console.log(`[spotify-clone] [backend] - Get Song by Id: `)
// 	const { songId } = req.params
// 	try {
// 		const songs = await Song.findById(songId)
// 		console.log(songs)
// 		return resp.status(200).json({ success: true, data: songs })
// 	} catch (error) {
// 		handleErrorGeneric('Songs Controller : getSongById :', error);
// 		next(error)
// 	}
// }

export const getFeaturedSongs = async (req, res, next) => {
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
		handleErrorGeneric('Songs Controller : getFeaturedSongs :', error);
		next(error)
	}
}

export const getMadeForYou = async (req, res, next) => {
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
		return res.status(200).json({ success: true, data: songs })
	} catch (error) {
		handleErrorGeneric('Songs Controller : Get Made For You Songs :', error);
		next(error)
	}
}

export const getTrending = async (req, res, next) => {
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
		return res.status(200).json({ success: true, data: songs })
	} catch (error) {
		handleErrorGeneric('Songs Controller : Get Trending Songs :', error);
		next(error)
	}
}

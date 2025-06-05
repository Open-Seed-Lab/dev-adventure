import { handleErrorGeneric } from "../lib/utils.js";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, resp, next) => {
	console.log(`[spotify-clone] [backend] - stats controller : get Stats : `)
	try {
		const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
			Song.countDocuments(),
			Album.countDocuments(),
			User.countDocuments(),
			Song.aggregate([
				{
					$unionWith: {
						col: 'albums',
						pipeline: []
					}
				},
				{ $group: { _id: 'artist' } },
				{ $count: 'count' }
			])
		]);

		return resp.status(200).json({
			success: true,
			data: {
				totalAlbums, totalSongs, totalUsers,
				totalArtists: uniqueArtists[0]?.count || 0
			}
		})

	} catch (error) {
		handleErrorGeneric('stats controller : get Stats :', error)
		next(error)
	}
}

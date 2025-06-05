import { handleErrorGeneric } from "../lib/utils.js"
import { User } from "../models/user.model.js";

export const authCallback = async (req, resp) => {
	console.log('[spotify-clone] [backend] Auth Controller - auth Callback')
	try {
		const { id, firstName, lastName, imageUrl } = req.body
		const user = await User.findOne({ clerkId: id })

		if (!user) {
			await User.create({
				clerkId: id,
				fullName: `${firstName} ${lastName}`,
				imageUrl
			})
		}

		resp.status(200).json({ success: true })
	} catch (error) {
		handleErrorGeneric('Auth Controller ', error)
		next(error)
	}
}

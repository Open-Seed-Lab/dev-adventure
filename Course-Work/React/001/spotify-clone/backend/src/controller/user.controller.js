import { handleErrorGeneric } from "../lib/utils.js";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
	console.log('[spotify-clone] [backend] - User Controller : Gett All users :')
	try {
		const { userId } = req.auth
		const users = await User.find({ clerkId: { $ne: userId } });
		return res.status(200).json({ success: true, data: users });
	} catch (error) {
		handleErrorGeneric('User Controller : Gett All users :', error)
		next(error);
	}
};

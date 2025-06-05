import { clerkClient } from "@clerk/express";
import { handleErrorGeneric } from "../lib/utils.js";

export const protectRoute = async (req, res, next) => {
	console.log('[spotify-clone] [backend] - protectRoute')
	if (!req.auth?.userId) {
		return res.status(401).send({ success: false, message: 'Unauthorised - Please Login' })
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
	try {
		const { userId: currentuserId } = req.auth
		const currentUser = await clerkClient.users.getUser(currentuserId);
		if (!currentUser) {
			return res.status(401).send({ success: false, message: 'Unauthorised - Please login before checking if you are an admin' })
		}
		const isAdmin = process.env.ADMIN_EMAIl === currentUser.primaryEmailAddress?.emailAddress
		if (!isAdmin) {
			return res.status(403).send({ success: false, message: 'Unauthorised - Not an Admin' })
		}
		next();
	} catch (error) {
		handleErrorGeneric('Require Admin Middleware', error)
		next(error)
	}
}

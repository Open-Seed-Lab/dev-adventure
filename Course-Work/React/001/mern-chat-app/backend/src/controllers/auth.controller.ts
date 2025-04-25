import { Request, Response } from "express"
import { ApiResponse } from '../models/ApiResponse';
import User, { IUser } from "../models/user.model";
import { genSaltSync, hash, compare } from 'bcryptjs';
import { generateJWTToken, handleErrorGeneric } from "../lib/utils";
import { AuthenticatedRequest } from "../models/AuthenticatedRequest";
import cdnry from "../lib/cloudinary";
import { IMongooseDocumentModel } from "../models/custommongoose.model";

export const signup = async (
	req: Request,
	res: Response<ApiResponse<Omit<IUser, 'password'>>>
) => {
	const { fullName, email, password } = req.body
	try {
		if ((fullName || '').length === 0 || (email || '').length === 0 || (password || '').length == 0) {
			res.status(400).json({ success: false, message: 'Missing Fileds' })
			return;
		}
		if ((password || '').length < 6) {
			res.status(400).json({ success: false, message: 'Password Must be at Least 6 characters' })
			return;
		}
		const user = await User.findOne({ email })

		if (user) {
			res.status(400).json({ success: false, message: 'Email Already Exists' })
			return;
		}

		const salt = genSaltSync(10)
		const hashedPassword = await hash(password, salt)

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			generateJWTToken(newUser._id, res);
			await newUser.save();
			res.status(201).json({
				success: true,
				data: {
					_id: newUser._id,
					fullName: newUser.fullName,
					email: newUser.email,
					profilePic: newUser.profilePic,
				}
			})
		} else {
			res.status(400).json({ success: false, message: 'Invalid UserData' })
		}
	} catch (error) {
		handleErrorGeneric('signing up the user', error, res);
	}
}
export const login = async (
	req: Request,
	res: Response<ApiResponse<Omit<IUser, 'password'>>>
) => {
	const { email, password } = req.body
	try {
		if ((email || '').length == 0) {
			res.status(400).json({ success: false, message: 'Email is empty' });
			return;
		}
		if ((password || '').length < 6) {
			res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
			return;
		}
		const user = await User.findOne({ email })

		if (!user || !(await compare(password, user.password))) {
			res.status(400).json({ success: false, message: 'Invalid Credentials' })
			return;
		}

		generateJWTToken(user._id, res);

		const { password: _pwd, ...dataToSend } = user;

		res.status(200).json({ success: true, data: dataToSend })

	} catch (error) {
		handleErrorGeneric('logging in the user', error, res);
	}
}
export const logout = (
	req: Request,
	res: Response<ApiResponse>
) => {
	try {
		res.clearCookie('jwtToken', {
			maxAge: 0
		})
		// res.cookie('jwtToken', "", {
		// 	maxAge: 0,
		// });
		res.status(200).json({ success: true, message: "LoggedOut Successfully" })
	} catch (error) {
		handleErrorGeneric('logging out the user', error, res);
	}
}

export const updateProfile = async (
	req: AuthenticatedRequest,
	res: Response<ApiResponse<Omit<IMongooseDocumentModel<IUser>, 'password'>>>
) => {
	try {
		const { profilePic } = req.body
		const userId = req.user?._id

		if (!profilePic || profilePic.length === 0) {
			res.status(400).json({ success: false, message: "Profile Pic is required" })
		}

		if (!userId || userId.length === 0) {
			res.status(400).json({ success: false, message: "Profile Pic is required" })
		}

		const uploadResp = await cdnry.uploader.upload(profilePic);
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ profilePic: uploadResp.secure_url },
			{ new: true }
		).select("-password");

		res.status(200).json({ success: true, data: updatedUser })

	} catch (error) {
		handleErrorGeneric('Update Profile', error, res)
	}
}

export const checkAuth = async (
	req: AuthenticatedRequest,
	res: Response<ApiResponse<Omit<IMongooseDocumentModel<IUser>, 'password'>>>
) => {
	try {
		const user = req.user
		res.status(200).json({ success: user ? true : false, data: user })
	} catch (error) {
		handleErrorGeneric('Check Auth', error, res)
	}
}


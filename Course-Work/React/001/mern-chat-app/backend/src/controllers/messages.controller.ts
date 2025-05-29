
import { Response } from "express"
import { ApiResponse } from '../models/ApiResponse';
import User, { IUser } from "../models/user.model";
import Message, { IMessage } from "../models/message.model";
import { handleErrorGeneric } from "../lib/utils";
import { AuthenticatedRequest } from "../models/AuthenticatedRequest";
import cdnry from "../lib/cloudinary";
import { IMongooseDocumentModel } from "../models/custommongoose.model";
import { getUserSocketId, io } from "../lib/socket";

export const getUsersForSidebar = async (
	req: AuthenticatedRequest,
	res: Response<ApiResponse<Omit<IMongooseDocumentModel<IUser>, 'password'>[]>>
) => {
	try {
		const loggedInUserId = req.user?._id
		if (!loggedInUserId) {
			res.status(401).json({ success: false, message: "Unauthorised Access" });
			return;
		}
		const filteredUsers: Omit<IMongooseDocumentModel<IUser>, 'password'>[] = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')
		res.status(200).json({ success: true, data: filteredUsers })
	} catch (error) {
		handleErrorGeneric('Check Auth', error, res)
	}
}

interface GetMessagesRequest extends AuthenticatedRequest { }

export const getMessages = async (
	req: GetMessagesRequest,
	res: Response<ApiResponse<IMessage[]>>
) => {
	try {
		const loggedInUserId = req.user?._id
		if (!loggedInUserId) {
			res.status(401).json({ success: false, message: "Unauthorised Access" });
			return;
		}
		const { id: userToChatId } = req.params
		const messages = await Message.find({
			$or: [
				{ senderId: loggedInUserId, receiverId: userToChatId },
				{ senderId: userToChatId, receiverId: loggedInUserId }
			]
		})
		res.status(201).json({ success: true, data: messages });
	} catch (error) {
		handleErrorGeneric('Check Auth', error, res)
	}
}

export const sendMessage = async (
	req: GetMessagesRequest,
	res: Response<ApiResponse<IMessage>>
) => {
	try {
		const senderId = req.user?._id
		if (!senderId) {
			res.status(401).json({ success: false, message: "Unauthorised Access" });
			return;
		}
		const { id: receiverId } = req.params
		const { text, image } = req.body
		let imageUrl: string | null = null;
		if (image) {
			const uploadResp = await cdnry.uploader.upload(image)
			imageUrl = uploadResp.secure_url
		}
		const newMessage = new Message({
			senderId, receiverId, image: imageUrl, text
		})
		await newMessage.save()
		const receiverSocketid = getUserSocketId(receiverId)
		if (receiverSocketid?.length > 0) {
			io.to(receiverSocketid).emit('newMessage', newMessage);
		}
		res.status(201).json({ success: true, data: newMessage, })
	} catch (error) {
		handleErrorGeneric('Check Auth', error, res)
	}
}


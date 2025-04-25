import { Schema, model } from 'mongoose';
import { ObjectId } from 'mongoose';
import User from './user.model';

export interface IMessage {
	senderId: ObjectId,
	receiverId: ObjectId,
	text?: string,
	image?: string,
	[key: string]: any | undefined | null,
}

const messageSchema = new Schema<IMessage>({
	senderId: {
		type: Schema.Types.ObjectId,
		ref: User,
		required: true
	},
	receiverId: {
		type: Schema.Types.ObjectId,
		ref: User,
		required: true
	},
	text: {
		type: String
	},
	image: {
		type: String
	}
}, {
	timestamps: true
})

const Message = model('Message', messageSchema);

export default Message;

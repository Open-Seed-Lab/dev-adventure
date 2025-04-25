import { Schema, model } from 'mongoose';

export interface IUser {
	email: string,
	fullName: string,
	password: string,
	profilePic?: string,
	[key: string]: any | undefined | null,
}

const userSchema = new Schema<IUser>({
	//_id: {
	//	type: Schema.Types.ObjectId,
	//},
	email: {
		type: String,
		required: true,
		unique: true
	},
	fullName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	profilePic: {
		type: String,
		required: false,
		default: "",
	}
}, {
	timestamps: true
})

const User = model('User', userSchema);

export default User;

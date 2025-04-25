import { Request } from "express";
import { IUser } from "./user.model";
import { IMongooseDocumentModel } from "./custommongoose.model";

export interface AuthenticatedRequest extends Request {
	user?: Omit<IMongooseDocumentModel<IUser>, 'password'>
}

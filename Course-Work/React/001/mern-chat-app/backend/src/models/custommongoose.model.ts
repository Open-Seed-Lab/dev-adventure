import { Document, ObjectId } from "mongoose";

export type IMongooseDocumentModel<T> = Document<unknown, {}, T> & T & { _id: ObjectId; } & { __v: number; }
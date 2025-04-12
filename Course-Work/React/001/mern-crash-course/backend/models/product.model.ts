import mongoose, { Schema } from 'mongoose'

// Define the interface for a Product document
export interface IProduct extends Document {
	name: string;
	price: number;
	image: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const productSchema: Schema<IProduct> = new Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
}, {
	timestamps: true // createdat and updatedat
});

const Product = mongoose.model<IProduct>('Product', productSchema)

export default Product;

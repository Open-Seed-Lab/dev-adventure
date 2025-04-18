import { create } from 'zustand';
import { IProduct } from '../models/product.model';

interface ApiResponse {
	success: boolean,
	message: string,
}

interface ProductState {
	products: IProduct[]
	setProducts: (prods: IProduct[]) => void
	createProduct: (prod: IProduct) => Promise<ApiResponse>,
	getProducts: () => Promise<ApiResponse>,
	deleteProduct: (prodId: string) => Promise<ApiResponse>,
	updateProduct: (prod: IProduct) => Promise<ApiResponse>,
}

const prodStore = create<ProductState>()

export const useProductStore = prodStore(set => ({
	products: [],
	setProducts: (products: IProduct[]) => set({ products }),
	createProduct: async (product: IProduct) => {
		if (!product) {
			return { success: false, message: 'Form is Empty. Please fill details to create new Product.' }
		}
		const { name, image, price } = product
		if (!name || !image || !price) {
			return { success: false, message: 'Please fill missing fields.' }
		}
		const res = await fetch('api/products', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(product)
		});
		const data = await res.json();
		console.log(`[mern-crash-course] create product response`)
		console.log(JSON.stringify(data, null, 2))
		set(({ products }) => ({ products: [...products, data.data] }))
		return { success: true, message: 'Successfully Created New Product with given Details.' }
	},
	getProducts: async () => {
		const res = await fetch('api/products', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			}
		});
		const data = await res.json();
		console.log(`[mern-crash-course] fetch products response`)
		console.log(JSON.stringify(data, null, 2))
		set({ products: data.data })
		return { success: true, message: 'Successfully Fetched Products.' }
	},
	deleteProduct: async (prodId: string) => {
		const res = await fetch(`api/products/${prodId}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
			}
		})
		console.log(`[mern-crash-course] delete product response`)
		console.log(JSON.stringify(res, null, 2))
		const data = await res.json();
		if (!data.success)
			return { success: false, message: data.message }
		set(({ products }) => ({ products: products.filter(p => p._id !== prodId) }))
		return { success: true, message: 'Successfully deleted the chosen product' }
	},
	updateProduct: async (prod) => {
		const { _id: prodId } = prod;
		const res = await fetch(`api/products/${prodId}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(prod)
		})

		const data = await res.json();
		console.log(`[mern-crash-course] update product response`)
		console.log(JSON.stringify(data, null, 2))
		if (!data.success)
			return { success: false, message: data.message }
		set(({ products }) => ({ products: products.map(p => p._id === prodId ? data.data : p) }))
		return { success: true, message: data.message || 'Successfully updated the chosen product' }
	}
}))

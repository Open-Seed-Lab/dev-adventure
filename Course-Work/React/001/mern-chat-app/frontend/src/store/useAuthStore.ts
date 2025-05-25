import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { handleErrorGeneric } from '../lib/utils';
import { ILoginForm, ISignupForm, IProfileForm } from '../models/signupform.model';
import toast from 'react-hot-toast';

interface AuthState {
	authUser: any | null,
	isCheckingAuth: boolean,
	isSigningUp: boolean,
	isLoggingIn: boolean,
	isUpdatingProfile: boolean,

	checkAuth: () => Promise<void>
	signUp: (data: ISignupForm) => Promise<void>
	logout: () => Promise<void>
	login: (data: ILoginForm) => Promise<void>
	uploadProfilePic: (data: IProfileForm) => Promise<void>
}

export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
}

export const useAuthStore = create<AuthState>(set => ({
	authUser: null,
	isCheckingAuth: true,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	checkAuth: async () => {
		axiosInstance.post('auth/check').then(res => {
			const apires = res.data as ApiResponse<any>
			if (!apires) {
				throw new Error(`Improper Response`)
			}
			const { success, data: userData } = apires;
			if (!success || !userData) {
				//throw new Error(apires.message || 'Improper Response`)')
				set({ authUser: null })
			}
			set({ authUser: userData })
		}).catch(error => {
			handleErrorGeneric('checkAuth', error);
			set({ authUser: null })
		}).finally(() => {
			set({ isCheckingAuth: false })
		})
	},
	signUp: async (data: ISignupForm) => {
		set({ isSigningUp: true })
		try {
			const res = await axiosInstance.post('/auth/signup', data);
			const authUser = res.data;
			if (!authUser) {
				throw new Error('Authorised User Data is empty');
			}
			console.log(`[mern-chat-app] signup response: ${JSON.stringify(authUser, null, 2)}`)
			set({ authUser })
			toast.success('Account created Successfully');
		} catch (error) {
			handleErrorGeneric('Signup', error, true)
		} finally {
			set({ isSigningUp: false })
		}
	},
	logout: async () => {
		try {
			await axiosInstance.post('/auth/logout');
			set({ authUser: null })
			toast.success('User Logged Out Successfully');
		} catch (error) {
			handleErrorGeneric('Logout', error, true)
		}
	},
	login: async (data: ILoginForm) => {
		set({ isLoggingIn: true })
		try {
			const res = await axiosInstance.post('/auth/login', data);
			console.log(`[mern-chat-app] - frontend - login response: `, JSON.stringify(res))
			const authUser = res.data;
			if (!authUser) {
				throw new Error('Authorised User Data is empty');
			}
			console.log(`[mern-chat-app] login response authUser: ${JSON.stringify(authUser, null, 2)}`)
			set({ authUser })
			toast.success('LoggedIn Successfully');
		} catch (error) {
			handleErrorGeneric('Login', error, true)
		} finally {
			set({ isLoggingIn: false })
		}
	},
	uploadProfilePic: async (data: IProfileForm) => {
		set({ isUpdatingProfile: true })
		try {
			const res = await axiosInstance.post('/auth/update-profile', data)
			console.log(`[mern-chat-app] upload profile Pic response : ${JSON.stringify(res, null, 2)}`)
			if (!res.data) throw new Error("Unhandled Error")
			if (!res.data.success) throw new Error(`Error Uploading Profile Picture`)
			set({ authUser: res.data.data })
			toast.success("Profile Picture updated successfully")
		} catch (error) {
			handleErrorGeneric('Updating ProfilePic', error, true)
		} finally {
			set({ isUpdatingProfile: false })
		}
	}
}));

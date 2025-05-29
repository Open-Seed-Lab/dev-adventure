import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { handleErrorGeneric } from '../lib/utils';
import { ILoginForm, ISignupForm, IProfileForm } from '../models/signupform.model';
import toast from 'react-hot-toast';
import { io, Socket } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3001" : "/";

interface AuthState {
	authUser: any | null,
	isCheckingAuth: boolean,
	isSigningUp: boolean,
	isLoggingIn: boolean,
	isUpdatingProfile: boolean,
	onlineUsers: string[],
	socket: Socket | null,

	checkAuth: () => Promise<void>
	signUp: (data: ISignupForm) => Promise<void>
	logout: () => Promise<void>
	login: (data: ILoginForm) => Promise<void>
	uploadProfilePic: (data: IProfileForm) => Promise<void>
	connectSocket: () => void | any,

	disconnectSocket: () => void | any
}

export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	authUser: null,
	isCheckingAuth: true,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	onlineUsers: [],
	socket: null,
	checkAuth: async () => {
		axiosInstance.post('auth/check').then(res => {
			const apires = res.data as ApiResponse<any>
			if (!apires) {
				throw new Error(`Improper Response`)
			}
			const { success, data: userData, message: errorMessage } = apires;
			if (!success || !userData) {
				set({ authUser: null })
			} else {
				set({ authUser: userData })
			}
			get().connectSocket();
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
			set({ authUser })
			toast.success('Account created Successfully');
			get().connectSocket();
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
			get().disconnectSocket();
		} catch (error) {
			handleErrorGeneric('Logout', error, true)
		}
	},
	login: async (data: ILoginForm) => {
		set({ isLoggingIn: true })
		try {
			const apiRes = await axiosInstance.post('/auth/login', data);
			const apires = apiRes.data as ApiResponse<any>
			if (!apires) {
				throw new Error(`Improper Response`)
			}
			const { success, data: authUser, message: errorResponse } = apires;
			if (!success) {
				throw new Error(errorResponse);
			}
			if (!authUser) {
				throw new Error('Authorised User Data is empty');
			}
			set({ authUser })
			toast.success('LoggedIn Successfully');
			get().connectSocket()
		} catch (error) {
			handleErrorGeneric('Login', error, true)
		} finally {
			set({ isLoggingIn: false })
		}

	},
	uploadProfilePic: async (data: IProfileForm) => {
		set({ isUpdatingProfile: true })
		try {
			const apiRes = await axiosInstance.post('/auth/update-profile', data)

			const apires = apiRes.data as ApiResponse<any>
			if (!apires) {
				throw new Error(`Improper Response`)
			}
			const { success, data: res, message: errorResponse } = apires;

			if (!success) {
				throw new Error(errorResponse);
			}

			if (!res.data) throw new Error("Unhandled Error")
			if (!res.data.success) throw new Error(`Error Uploading Profile Picture`)
			set({ authUser: res.data.data })
			toast.success("Profile Picture updated successfully")
		} catch (error) {
			handleErrorGeneric('Updating ProfilePic', error, true)
		} finally {
			set({ isUpdatingProfile: false })
		}
	},

	connectSocket: () => {
		const { authUser } = get();
		if (!authUser || get().socket?.connected) return;

		const socket = io(BASE_URL, {
			query: {
				userId: authUser._id,
			},
		});
		socket.connect();

		set({ socket: socket });

		socket.on("getOnlineUsers", (userIds) => {
			set({ onlineUsers: userIds });
		});
	},

	disconnectSocket: () => {
		const { socket } = get();
		if (socket?.connected) {
			socket.disconnect();
		}
	},
}));

import { axiosInstance } from "@/lib/axios";
import { getErrorToShow, handleGenericError } from "@/lib/utils";
import type { Album, Song, Stats, User, Message } from "@/types";
import type { Socket } from "net";
// import toast from "react-hot-toast";
import { create } from "zustand";

interface ChatStore {
	users: User[];
	isLoading: boolean;
	error: string | null;
	socket: Socket | null;
	isConnected: boolean;
	onlineUsers: Set<string>;
	userActivities: Map<string, string>;
	messages: Message[];
	selectedUser: User | null;

	fetchUsers: () => Promise<void>;
	initSocket: (userId: string) => void;
	disconnectSocket: () => void;
	sendMessage: (receiverId: string, senderId: string, content: string) => void;
	fetchMessages: (userId: string) => Promise<void>;
	setSelectedUser: (user: User | null) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
	users: [],
	isLoading: false,
	error: null,
	socket: null,
	isConnected: false,
	onlineUsers: new Set<string>(),
	userActivities: new Map<string, string>(),
	messages: [],
	selectedUser: null,

	fetchUsers: async () => {
		console.log('[spotify-clone] [frontend] useChatStore - fetchUsers')
		set({ isLoading: true, error: null })
		try {
			const apiResponse = await axiosInstance.get('users')
			const { data: { success, data, message } = {} } = apiResponse;
			if (!success) {
				throw new Error(message)
			}
			set({ users: data })
		} catch (error: unknown) {
			handleGenericError('useChatStore - fetchUsers', error)
			set({ error: getErrorToShow(error) })
		} finally {
			set({ isLoading: false })
		}
	},
	initSocket: (userId: string) => { },
	disconnectSocket: () => { },
	sendMessage: (receiverId: string, senderId: string, content: string) => { },
	fetchMessages: async (userId: string) => { },
	setSelectedUser: (user: User | null) => { },
}));


import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { handleErrorGeneric } from '../lib/utils';
import { useAuthStore } from './useAuthStore';

interface ChatState {
	users: any[];
	messages: any[];
	selectedUser: any;
	isUsersLoading: boolean;
	isMessagesLoading: boolean;

	getUsers: () => Promise<void>
	getMessages: (userId: string) => Promise<void>
	setSelectedUser: (user: any) => void
	sendMessage: (message: any) => Promise<void>

	subscribeToMessages: () => void,
	unsubscribeToMessages: () => void,
}

export const useChatStore = create<ChatState>((set, get) => ({
	users: [],
	messages: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,

	getUsers: async () => {
		set({ isUsersLoading: true })
		try {
			const res = await axiosInstance.get('/messages/users');
			set({ users: res.data.data })
		} catch (error) {
			handleErrorGeneric('Chat - Get users', error)
		} finally {
			set({ isUsersLoading: false })
		}
	},

	getMessages: async (userId: string) => {
		set({ isMessagesLoading: true })
		try {
			const res = await axiosInstance.get(`/messages/${userId}`);
			set({ messages: res.data.data })
		} catch (error) {
			handleErrorGeneric('Chat - Get Messages', error)
		} finally {
			set({ isMessagesLoading: false })
		}
	},

	setSelectedUser: (selectedUser: any) => set({ selectedUser }),

	sendMessage: async (messageData: any) => {
		const { selectedUser, messages } = get();
		try {
			const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
			set({ messages: [...messages, res.data.data] })
		} catch (error) {
			handleErrorGeneric('Chat - send Message', error)
		}
	},


	subscribeToMessages: () => {
		const { selectedUser } = get()
		if (!selectedUser) return;

		const { socket } = useAuthStore.getState()
		if (socket)
			socket.on('newMessage', (newMessage) => {
				if (newMessage.senderId !== selectedUser._id) return;
				const { messages } = get();
				set({
					messages: [...messages, newMessage]
				})
			})
	},
	unsubscribeToMessages: () => {
		const { socket } = useAuthStore.getState();
		if (socket) {
			socket.off('newMessage');
		}
	},
}));

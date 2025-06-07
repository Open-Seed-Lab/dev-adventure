import { axiosInstance } from "@/lib/axios";
import { getErrorToShow, handleGenericError } from "@/lib/utils";
import { create } from "zustand";

interface AuthStore {
	isAdmin: boolean;
	error: string | null;
	isLoading: boolean;

	checkAdmin: () => Promise<void>;
	reset: () => void;

}

export const useAuthStore = create<AuthStore>((set) => ({
	isAdmin: false,
	error: null,
	isLoading: false,

	checkAdmin: async () => {
		set({ error: null, isLoading: true })
		try {
			const apiResponse = await axiosInstance.post('admin/check');
			console.log(apiResponse)
			const { data: { success, data, message } = {} } = apiResponse;
			if (!success) {
				throw new Error(message)
			}
			set({ isAdmin: data.admin })
		} catch (error: unknown) {
			handleGenericError('useAuthStore - checkAdmin', error)
			set({ error: getErrorToShow(error) })
		} finally {
			set({ isLoading: false })
		}
	},
	reset: () => {
		set({
			isAdmin: false,
			error: null,
			isLoading: false,
		})
	}
}));

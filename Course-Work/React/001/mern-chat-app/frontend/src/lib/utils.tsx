import toast from "react-hot-toast";

export const handleErrorGeneric = (
	logPrefix: string,
	error: any | Error,
	shouldToast: boolean = false
) => {
	let errorMessage: string = '';
	if (error instanceof Error) {
		errorMessage = error.message
		console.error(`[mern-chat-app] Error ${logPrefix}: `, error.message);
	} else {
		errorMessage = error?.response?.data?.message
		console.error(`[mern-chat-app] An unknown Error ${logPrefix}: `, error);
	}
	if (shouldToast) {
		toast.error(errorMessage)
	}
}

export const formatMessageTime = (value: number | string | Date): string => {
	return new Date(value).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}

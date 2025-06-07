import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function handleGenericError(logPrefix: string, error: Error | unknown) {
	if (error instanceof Error) {
		console.error(`[spotify-clone] [frontend] ::::: Error : ${logPrefix} ::::: ${error.message}`);
		console.error(error.stack);
	} else {
		console.error(`[spotify-clone] [frontend] ::::: Unknown Error : ${logPrefix} ::::: `);
		try {
			console.error(JSON.stringify(error, null, 2));
		} catch {
			console.error(error);
		}
	}
}

export function getErrorToShow(error: Error | unknown) {
	return (error instanceof Error) ? error.message : `${error}`
}

export const formatDuration = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

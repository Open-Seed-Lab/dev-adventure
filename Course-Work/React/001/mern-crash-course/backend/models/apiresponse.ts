// Define response types for better clarity
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}
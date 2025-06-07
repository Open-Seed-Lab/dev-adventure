import { axiosInstance } from "@/lib/axios";
import { getErrorToShow, handleGenericError } from "@/lib/utils";
import type { Album, Song, Stats } from "@/types";
// import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
	songs: Song[];
	albums: Album[];
	isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];
	stats: Stats;

	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<void>;
	fetchFeaturedSongs: () => Promise<void>;
	fetchMadeForYouSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
	fetchStats: () => Promise<void>;
	fetchSongs: () => Promise<void>;
	deleteSong: (id: string) => Promise<void>;
	deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
	albums: [],
	songs: [],
	isLoading: false,
	error: null,
	currentAlbum: null,
	featuredSongs: [],
	madeForYouSongs: [],
	trendingSongs: [],
	stats: {
		totalSongs: 0,
		totalAlbums: 0,
		totalUsers: 0,
		totalArtists: 0,
	},
	fetchAlbums: async () => {
		console.log('[spotify-clone] [frontend] useMusicStore - fetchAlbums')
		set({ isLoading: true, error: null })
		try {
			const apiResponse = await axiosInstance.get('albums')
			const { data: resp } = apiResponse;
			if (!resp.success) {
				throw new Error(resp.message || resp)
			}
			set({ albums: resp.data })
		} catch (error: unknown) {
			handleGenericError('useMusicStore - fetchAlbums', error)
			set({ error: getErrorToShow(error) })
		} finally {
			set({ isLoading: false })
		}
	},
	fetchAlbumById: async (id: string) => {
		console.log('[spotify-clone] [frontend] useMusicStore - fetchAlbumById: ', id)
		set({ isLoading: true, error: null })
		try {
			const apiResponse = await axiosInstance.get(`albums/${id}`)
			const { data: resp } = apiResponse;
			if (!resp.success) {
				throw new Error(resp.message || resp)
			}
			set({ currentAlbum: resp.data })
		} catch (error: unknown) {
			handleGenericError(`useMusicStore - fetchAlbumById: ${id}`, error)
			set({ error: getErrorToShow(error) })
		} finally {
			set({ isLoading: false })
		}
	},
	fetchFeaturedSongs: async () => {
		console.log('[spotify-clone] [frontend] useMusicStore - fetchFeaturedSongs: ')
		set({ isLoading: true, error: null })
		try {
			const apiResponse = await axiosInstance.get('songs/featured')
			const { data: resp } = apiResponse;
			if (!resp.success) {
				throw new Error(resp.message || resp)
			}
			set({ featuredSongs: resp.data })
		} catch (error: unknown) {
			handleGenericError(`useMusicStore - fetchFeaturedSongs`, error)
			set({ error: getErrorToShow(error) })
		} finally {
			set({ isLoading: false })
		}
	},
	fetchMadeForYouSongs: async () => {
		console.log('[spotify-clone] [frontend] useMusicStore - fetchMadeForYouSongs: ')
		set({ isLoading: true, error: null })
		try {
			const apiResponse = await axiosInstance.get('songs/made-for-you')
			const { data: resp } = apiResponse;
			if (!resp.success) {
				throw new Error(resp.message || resp)
			}
			set({ madeForYouSongs: resp.data })
		} catch (error: unknown) {
			handleGenericError(`useMusicStore - fetchMadeForYouSongs`, error)
			set({ error: getErrorToShow(error) })
		} finally {
			set({ isLoading: false })
		}
	},
	fetchTrendingSongs: async () => {
		console.log('[spotify-clone] [frontend] useMusicStore - fetchTrendingSongs: ')
		set({ isLoading: true, error: null })
		try {
			const apiResponse = await axiosInstance.get('songs/trending')
			const { data: resp } = apiResponse;
			if (!resp.success) {
				throw new Error(resp.message || resp)
			}
			set({ trendingSongs: resp.data })
		} catch (error: unknown) {
			handleGenericError(`useMusicStore - fetchTrendingSongs`, error)
			set({ error: getErrorToShow(error) })
		} finally {
			set({ isLoading: false })
		}
	},
	fetchStats: async () => { },
	fetchSongs: async () => { },
	deleteSong: async (id: string) => { },
	deleteAlbum: async (id: string) => { }
}));

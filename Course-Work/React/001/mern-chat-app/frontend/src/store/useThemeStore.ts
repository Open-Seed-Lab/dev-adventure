import { create } from 'zustand';

interface ThemeState {
	theme: any | null;
	setTheme: (theme: any) => void
}

export const useThemeStore = create<ThemeState>(set => ({
	theme: localStorage.getItem("chat-theme") || "coffee",
	setTheme: (theme) => {
		localStorage.setItem("chat-theme", theme);
		// document.documentElement.setAttribute('data-theme', theme);
		set({ theme });
	}
}));

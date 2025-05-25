import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import { useAuthStore } from './store/useAuthStore.ts';
import { useEffect } from 'react';
import { IconLoader } from '@tabler/icons-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.ts';

function App() {
	const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
	const { theme } = useThemeStore();

	useEffect(() => { checkAuth() }, [checkAuth]);

	console.log(`[mern-chat-app] authUser, ${JSON.stringify(authUser, null, 2)}`)

	if (isCheckingAuth && !authUser) {
		return <div className="flex items-center justify-center h-screen">
			{/*<Loader className="size-10 animate-spin hidden" />*/}
			<IconLoader className="size-10 animate-spin hidden" />
		</div>
	}
	return (
		<div data-theme={theme}>
			<Navbar />
			<Routes>
				<Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
				<Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
				<Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App

import { axiosInstance } from "@/lib/axios";
import { handleGenericError } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth } from "@clerk/clerk-react";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState, type ReactNode, type FC } from "react";

const updateApiToken = async (token: string | null) => {
	if (token) {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
	} else {
		delete axiosInstance.defaults.headers.common['Authorization']
	}
}

interface AuthProviderProps {
	children: ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const { getToken, } = useAuth();
	const [loading, setLoading] = useState(true);
	const { checkAdmin } = useAuthStore();

	useEffect(() => {
		const initAuth = async () => {
			try {
				const token = await getToken();
				updateApiToken(token);
				if (token)
					await checkAdmin()
			} catch (error: unknown) {
				updateApiToken(null)
				handleGenericError('Auth Provider', error)
			} finally {
				setLoading(false)
			}
		}
		initAuth()
	}, [getToken, checkAdmin]);

	if (loading) {
		return (<div className="h-screen w-full flex items-center justify-center">
			<LoaderIcon className="size-16 text-emerald-500 animate-spin" />
		</div>)
	}

	return <>{children}</>
}

export default AuthProvider;

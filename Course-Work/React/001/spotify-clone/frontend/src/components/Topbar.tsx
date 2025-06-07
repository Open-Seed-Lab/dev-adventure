import { LayoutDashboardIcon } from "lucide-react";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import SignedInOAuthButtons from "./SignedInOAuthButtons";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
	const { isAdmin } = useAuthStore();
	return <div className="flex items-venter justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
		<div className="flex gap-2 items-center ">
			<img src="/spotify.png" className="size-8" />
			Spotify Clone
		</div>
		<div className="flex gap-4 items-center">
			{isAdmin && (<Link to="/admin" className={cn(buttonVariants({ variant: "outline" }))}>
				<LayoutDashboardIcon className="size-4 mr-2" />
				Admin Dashboard
			</Link>)}
			<SignedOut>
				<SignedInOAuthButtons />
			</SignedOut>
			<UserButton />
		</div>
	</div>
}

export default Topbar;

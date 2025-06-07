import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistSkeleton from '@/components/skeletons/PlaylistSkeleton';
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";

const LeftSidebar = () => {
	const { isLoading, fetchAlbums, albums, songs } = useMusicStore()
	useEffect(() => {
		fetchAlbums()
	}, [fetchAlbums])
	return (
		<div className="h-full flex flex-col gap-2 w-full">
			{/* NavigationMenu */}
			<div className="rounded-lg bg-zinc-900 p-4">
				<div className="space-y-2">
					<Link
						to='/'
						className={cn(buttonVariants({
							variant: "ghost",
							className: "w-full justify-start text-white hover:bg-zinc-800"
						}))}
					>
						<HomeIcon className="r-2 size-6" />
						<span className="hidden md:inline">Home</span>
					</Link>
					<SignedIn>
						<Link
							to='/chat'
							className={cn(buttonVariants({
								variant: "ghost",
								className: "w-full justify-start text-white hover:bg-zinc-800"
							}))}
						>
							<MessageCircle className="r-2 size-6" />
							<span className="hidden md:inline">Messages</span>
						</Link>
					</SignedIn>
				</div>
			</div>
			{/*<LibrarySection />*/}
			<div className="flex-1 rounded-lg bg-zinc-900 p-4">
				<div className="flex items-center justify-between mb-4">
					<div className='flex items-center text-white px-2'>
						<Library className='size-6 mr-2' />
						<span className="hidden md:inline">Playlists</span>
					</div>
				</div>
				<ScrollArea className="h-[calc(100vh-300px)]">
					<div className="space-y-2">
						{isLoading ? <PlaylistSkeleton /> : (
							albums.map(album => (
								<Link to={`/albums/${album._id}`} key={album._id} className='p-2 hover:bg-zin
								rounded-md flex items-center gap-3 group cursor-pointer'>
									<img src={album.imageUrl} alt={"Album Image"} className='w-12 h-12 bg-zinc-800 rounded-md flex-shrink-0' />
									<div className='flex-1 min-w-0 hidden md:block space-y-2'>
										<p className='font-medium text-zinc-200 truncate'>{album.title}</p>
										<p className='text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
									</div>
								</Link>
							))
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
export default LeftSidebar

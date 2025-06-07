import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Outlet } from 'react-router-dom'
import LeftSidebar from './components/LeftSidebar'
import { useEffect, useState } from 'react';
import FriendsActivity from './components/FriendsActivity';
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className="h-screen bg-black text-white flex flex-col">
			<ResizablePanelGroup direction='horizontal'>
				<AudioPlayer />
				{/* Left Side Bar */}
				<ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30} className="flex-1 flex h-full overflow-hidden p-2 pr-0">
					<LeftSidebar />
				</ResizablePanel>
				<ResizableHandle className="w-2 bg-transparent rounded-lg transition-colors" />
				{/* Main Content Side Bar */}
				<ResizablePanel defaultSize={isMobile ? 80 : 60} className={`h-full py-2 ${!isMobile ? '' : 'pr-2'}`}>
					<Outlet />
				</ResizablePanel>
				{!isMobile && <>
					<ResizableHandle className="w-2 bg-transparent rounded-lg transition-colors" />
					{/* Right Side Bar */}
					<ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0} className={`h-full p-2 pl-0`}>
						<FriendsActivity />
					</ResizablePanel>
				</>}
			</ResizablePanelGroup>
			<PlaybackControls />
		</div>
	);
}
export default MainLayout;

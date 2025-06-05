import { Button } from './components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
	return (
		<>
			<header>
				<SignedOut>
					<SignInButton>
						<Button>Sign In</Button>
					</SignInButton>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</header>
			<h1 className="text-red-400 text-5xl">Hello</h1>
			<h2 className="">Welcome!</h2>
			<Button variant={"secondary"}> This is a button</Button>
		</>
	)
}

export default App

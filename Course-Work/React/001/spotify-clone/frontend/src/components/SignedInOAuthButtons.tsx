import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useCallback, type MouseEventHandler } from "react";

const SignedInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn()

	const signInWithGoogle: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
		signIn?.authenticateWithRedirect({
			strategy: 'oauth_google',
			redirectUrl: '/sso-callback',
			redirectUrlComplete: '/auth-callback'
		});
	}, [signIn]);

	if (!isLoaded) {
		return null
	}

	return <Button onClick={signInWithGoogle} variant="secondary" className="w-full text-white border-zinc-200 h-11" >Continue with Google</Button>

}

export default SignedInOAuthButtons;

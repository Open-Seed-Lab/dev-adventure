export interface ISignupForm {
	fullName: string;
	email: string;
	password: string;
}

export type ILoginForm = Omit<ISignupForm, 'fullName'>

export interface IProfileForm {
	profilePic: string | ArrayBuffer | null;
}

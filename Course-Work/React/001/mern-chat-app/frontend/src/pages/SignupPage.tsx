import { FormEventHandler, useCallback, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
//import { Eye, EyeOff, Loader2, Mail, MessageSquare, User, Lock } from "lucide-react";
import {
	IconEye,
	IconEyeFilled,
	IconMessage,
	IconUser,
	IconMail,
	IconLock,
	IconLoader2,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { toast } from "react-hot-toast";
import { ISignupForm } from "../models/signupform.model";

function SignupPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState<ISignupForm>({
		fullName: "",
		email: "",
		password: "",
	});
	const { isSigningUp, signUp } = useAuthStore();
	const validateForm = useCallback(() => {
		if (!formData.fullName.trim()) return toast.error("Full Name is Required");
		if (!formData.email.trim()) return toast.error("Email is Required");
		if (!/\S+@\S+\.\S+/.test(formData.email))
			return toast.error("Invalid email format");
		if (!formData.password) return toast.error("Password is Required");
		if (formData.password.length < 6)
			return toast.error("Password must be at least 6 characters");
		return true;
	}, [formData]);

	const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
		(e) => {
			e.preventDefault();
			console.log(
				`[mern-chat-app] SignUp Submit: ${JSON.stringify(formData, null, 2)}`
			);
			const success = validateForm();
			console.log(
				`[mern-chat-app] SignUp validation: ${success ? "success" : "failed"}`
			);
			if (success) {
				signUp(formData);
			}
		},
		[formData, signUp, validateForm]
	);
	return (
		<div className="min-h-screen grid lg:grid-cols-2">
			{/* Left Side */}
			<div className="flex flex-col items-center justify-center p-6 sm:p12">
				<div className="w-full max-w-md space-y-8">
					{/* LOGO */}
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div
								className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
						group-hover: bg-primary/20 transition-colors"
							>
								{/*<MessageSquare className="size-6 text-primary" />*/}
								<IconMessage className="size-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold mt-2">Create Account</h1>
							<p className="text-base-content/60">
								Get started with your free account
							</p>
						</div>
					</div>
					{/* FORM */}
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Full Name</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none signup-field-icon" >
									<IconUser className="size-5 text-base-content/40" />
								</div>{" "}
								<input
									type="text"
									className="input input-bordered w-full pl-10 focus:outline-none"
									placeholder="John Doe"
									value={formData.fullName}
									onChange={(e) =>
										setFormData({ ...formData, fullName: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Email</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none signup-field-icon">
									<IconMail className="size-5 text-base-content/40" />
								</div>
								<input
									type="email"
									className={`input input-bordered w-full pl-10`}
									placeholder="you@example.com"
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
								/>
							</div>
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Password</span>
							</label>
							<div className="relative">
								{/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none signup-field-icon">
                  <IconLock className="size-5 text-base-content/40" />
                </div> */}
								<button
									type="button"
									disabled={true}
									className="absolute inset-y-0 left-0 pl-3 flex items-center signup-field-icon"
									onClick={undefined}
								>
									{showPassword ? (
										<IconLock className="size-5 text-base-content/40" />
									) : (
										<IconLock className="size-5 text-base-content/40" />
									)}
								</button>
								<input
									type={showPassword ? "text" : "password"}
									className={`input input-bordered w-full pl-10`}
									placeholder="••••••••"
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center signup-field-icon"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<IconEyeFilled className="size-5 text-base-content/40" />
									) : (
										<IconEye className="size-5 text-base-content/40" />
									)}
								</button>
							</div>
						</div>

						<button
							type="submit"
							className="btn btn-primary w-full"
							disabled={isSigningUp}
						>
							{isSigningUp ? (
								<>
									<IconLoader2 className="size-5 animate-spin" />
									Loading...
								</>
							) : (
								"Create Account"
							)}
						</button>
					</form>
					<div className="text-center">
						<p className="text-base-content/60">
							Already have an account?{" "}
							<Link to="/login" className="link link-primary">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
			{/* Right Side */}
			<AuthImagePattern
				title="Join our community"
				subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
			/>
		</div>
	);
}
export default SignupPage;

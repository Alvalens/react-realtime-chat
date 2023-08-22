import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// css
import "../App.css"
const Home = () => {
	const [login] = useAuthState(auth);
	const [loading, setLoading] = useState(true);

	const googleSignIn = async () => {
		try {
			setLoading(true);
			const provider = new GoogleAuthProvider();
			await signInWithRedirect(auth, provider);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const logout = () => {
		setLoading(true);
		auth.signOut();
		setLoading(false);
	};
	console.log(login);
	// useEffect to check if user is logged in or not when page loads
	useEffect(() => {
		setLoading(true);
		if (login) {
			setLoading(false);
		}
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, [login]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="w-12 h-12 border-t-2 border-grey-900 border-b-2 rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<section className="flex justify-center items-center bg-white dark:bg-gray-900 min-h-[50rem]">
			<div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
				<div className="mr-auto place-self-center lg:col-span-7">
					<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
						React JS Realtime Chat App
					</h1>
					<p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
						This is my second React project, Realtime Chat App with
						Firebase and Tailwind CSS and Daisyui
					</p>
					{login ? (
						<>
							<button
								onClick={logout}
								className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
								Logout
							</button>
							<button className="ml-2 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
								Chat
							</button>
						</>
					) : (
						<div>
							<a
								href="#"
								onClick={googleSignIn}
								className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
								<FontAwesomeIcon
									icon={faGoogle}
									className="mr-2"
								/>{" "}
								Login with Google
							</a>

							<a
								href="#"
								className="inline-flex ml-2 items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
								<FontAwesomeIcon
									icon={faGithub}
									className="mr-2"
								/>{" "}
								Login with Github
							</a>
						</div>
					)}
				</div>
				<div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
					<img
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
						alt="mockup"
					/>
				</div>
			</div>
		</section>
	);
};

export default Home;

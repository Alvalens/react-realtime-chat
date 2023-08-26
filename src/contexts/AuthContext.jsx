import { useContext, createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signInWithRedirect, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
	const [user] = useAuthState(auth);
	const [loading, setLoading] = useState(true);

	const googleSignIn = async () => {
		try {
			setLoading(true);
			const provider = new GoogleAuthProvider();
			await signInWithRedirect(auth, provider);
			if (user) {
				setLoading(false);
			}
		} catch (err) {
			alert(err.message);
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const githubSignIn = async () => {
		try {
			setLoading(true);
			const provider = new GithubAuthProvider();
			await signInWithRedirect(auth, provider);
			if (user) {
				setLoading(false);
			}
		} catch (err) {
			alert(err.message);
			console.log(err);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (user) {
			setLoading(false);
		}
	}, [user]);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);
	const logout = () => {
		try{
			setLoading(true);
			auth.signOut();
			window.location.href = "/";
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const authContextValue = {
		user,
		googleSignIn,
		githubSignIn,
		logout,
		loading,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
}

import { useContext, createContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import Loader from "../components/Loader";
import { useEffect } from "react";

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
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const authContextValue = {
		user,
		googleSignIn,
		logout,
		loading,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
}

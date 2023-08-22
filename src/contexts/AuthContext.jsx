import { useContext, createContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import Loader from "../components/Loader";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
	const [user] = useAuthState(auth);
	const [loading, setLoading] = useState(false);

	const googleSignIn = async () => {
		try {
			setLoading(true);
			const provider = new GoogleAuthProvider();
			await signInWithRedirect(auth, provider);
			setLoading(false);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

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

		if (loading) {
			return (
				<Loader />
			);
		}
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

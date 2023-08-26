import { useContext, useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";

const themeContext = createContext();

export function useTheme() {
	return useContext(themeContext);
}

export function ThemeProvider({ children }) {
	const [Dark, setDark] = useState(localStorage.getItem("Dark") === "true" ? true : false);

	const toggleDark = () => {
		const newDark = !Dark;
		setDark(newDark);
	};

	useEffect(() => {
		const prefersDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		const localDark = localStorage.getItem("Dark");
		if (localDark !== null) {
			setDark(localDark === "true" ? true : false);
		} else if (prefersDarkMode) {
			setDark(true);
		} else {
			setDark(false);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("Dark", Dark);
		if (Dark) {
			document.documentElement.classList.add("dark");
			document.documentElement.setAttribute("data-theme", "dark");

		} else {
			document.documentElement.classList.remove("dark");
			document.documentElement.setAttribute("data-theme", "light");
		}
	}, [Dark]);

	return (
		<themeContext.Provider value={{ Dark, toggleDark }}>
			{children}
		</themeContext.Provider>
	);
}

ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

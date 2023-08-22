import "./App.css";
// import router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pages
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import About from "./pages/About";
import { AuthProvider } from "./contexts/AuthContext";
// import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="/about" element={<About />} />
					</Routes>
					<Footer />
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;

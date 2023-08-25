import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pages
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import About from "./pages/About";
import ChatHome from "./pages/ChatHome";
import Page404 from "./pages/Page404";
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
						<Route path="/chat" element={<ChatPage />} />
						<Route path="/about" element={<About />} />
						<Route path="/chat-home" element={<ChatHome />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
					<Footer />
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;

import { Link } from "react-router-dom";
import { Navbar, Button, Menu } from "react-daisyui";
import { useAuth } from "../contexts/AuthContext";

const NavbarC = () => {
	const { user } = useAuth();
	return (
		<>
			<Navbar>
				<Navbar.Start>
					<Link to="/" className="btn btn-ghost normal-case text-xl">
						React Chat
					</Link>
				</Navbar.Start>
				<Navbar.Center className="hidden lg:flex">
					<Menu horizontal className="px-1">
						<Menu.Item>
							<Link to="/">Home</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/about">About</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to="/chat">Chat</Link>
						</Menu.Item>
					</Menu>
				</Navbar.Center>
				<Navbar.End>
					{user ? (
						<Button>Logout</Button>
					)
					: (
						<Link to="/" >
						<Button>Login</Button>
						</Link>
					)}
				</Navbar.End>
			</Navbar>
		</>
	);
};

export default NavbarC;

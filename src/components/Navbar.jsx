import { Link } from "react-router-dom";
import { Navbar, Button, Menu } from "react-daisyui";

const NavbarC = () => {
	return (
		<>
			<Navbar>
				<Navbar.Start>
					<Link to="/" className="btn btn-ghost normal-case text-xl">
						daisyUI
					</Link>
				</Navbar.Start>
				<Navbar.Center className="hidden lg:flex">
					<Menu horizontal className="px-1">
						<Menu.Item>
							<Link to="/about">Home</Link>
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
					<Button tag="a">Button</Button>
				</Navbar.End>
			</Navbar>
		</>
	);
};

export default NavbarC;

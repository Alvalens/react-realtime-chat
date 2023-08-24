import { Link } from "react-router-dom";
import { Navbar, Button, Menu, Drawer } from "react-daisyui";
import { useAuth } from "../contexts/AuthContext";
import { useState, useCallback } from "react";

const NavbarC = () => {
	const { user } = useAuth();
	const [visible, setVisible] = useState(false);
	const toggleVisible = useCallback(() => {
		setVisible((visible) => !visible);
	}, []);
	return (
		<>
			<Drawer
				className=""
				open={visible}
				onClickOverlay={toggleVisible}
				side={
					<Menu className="p-4 w-60 md:w-80 h-full bg-base-200 z-50">
						{/* title */}
						<Menu.Title className=" text-gray-400 text-xl">
							Menu
						</Menu.Title>

						<Menu.Item>
							<Link
								to={"/"}
								className=" text-gray-700 text-lg hover:bg-gray-500 hover:text-white">
								Home
							</Link>
						</Menu.Item>
						<Menu.Item>
							<Link
								to={"about"}
								className=" text-gray-700 text-lg hover:bg-gray-500 hover:text-white">
								About
							</Link>
						</Menu.Item>
						<Menu.Item>
							<Link
								to={"chat-home"}
								className=" text-gray-700 text-lg hover:bg-gray-500 hover:text-white">
								Chat
							</Link>
						</Menu.Item>
					</Menu>
				}>
				<Navbar className="fixed w-full bg-gray-700 mt-1  rounded-2xl shadow-md border-2 border-gray-800 dark:bg-gray-900 dark:border-dark-700">
					<div className="flex-none lg:hidden">
						<Button
							shape="square"
							onClick={toggleVisible}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-6 h-6 stroke-current">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"></path>
							</svg>
						</Button>
					</div>
					<div className="flex-1 px-2 mx-2 font-bold text-white text-lg">
						<Link to={"/"}>React Chat</Link>
					</div>
					<div className="flex-none hidden lg:block">
						<Menu horizontal="true">
							<Menu.Item>
								<Link
									to={"/"}
									className=" text-white  text-lg hover:bg-gray-500 hover:text-white">
									Home
								</Link>
							</Menu.Item>
							<Menu.Item>
								<Link
									to={"about"}
									className=" text-white text-lg hover:bg-gray-500 hover:text-white">
									About
								</Link>
							</Menu.Item>
							<Menu.Item>
								<Link
									to={"chat-home"}
									className=" text-white text-lg hover:bg-gray-500 hover:text-white">
									Chat
								</Link>
							</Menu.Item>
						</Menu>
					</div>
					<Navbar.End className="max-w-[41%]">
						{user ? (
							<Button className="hover:bg-red-400 hover:border-gray-500 capitalize text-lg">Logout</Button>
						) : (
							<Link to="/">
								<Button>Login</Button>
							</Link>
						)}
					</Navbar.End>
				</Navbar>
			</Drawer>
		</>
	);
};

export default NavbarC;

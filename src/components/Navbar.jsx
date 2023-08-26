import { Link } from "react-router-dom";
import { Navbar, Button, Menu, Drawer, Swap } from "react-daisyui";
import { useAuth } from "../contexts/AuthContext";
import { useState, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";


const NavbarC = () => {
	const { user, logout } = useAuth();
	const [visible, setVisible] = useState(false);
	const toggleVisible = useCallback(() => {
		setVisible((visible) => !visible);
	}, []);
	const { Dark, toggleDark } = useTheme();


	return (
		<>
			<Drawer
				className="z-50"
				open={visible}
				onClickOverlay={toggleVisible}
				side={
					// project
					<Menu className="p-4 w-60 md:w-80 h-full bg-base-200 z-50">
						<Menu.Title className="py-3 text-gray-700 dark:text-gray-200 text-2xl">
							React Chat
							<hr className="mt-3 text-gray-900 dark:text-gray-100" />
						</Menu.Title>
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
						<Button shape="square" onClick={toggleVisible}>
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

					<Navbar.End className="max-w-[43%]">
						<Swap
							className="text-gray-200 mr-4 hover:text-white swap swap-rotate"
							onElement={
								<svg
									className="swap-on fill-current w-10 h-10"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24">
									<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
								</svg>
							}
							offElement={
								<svg
									className="swap-off fill-current w-10 h-10"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24">
									<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
								</svg>
							}
							{...Dark ? { on: true } : { on: false }}
							onChange={toggleDark}
						/>
						{user ? (
							<Button
								onClick={logout}
								className="hover:bg-red-400 hover:border-gray-500 capitalize text-lg">
								Logout
							</Button>
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

export default  NavbarC;

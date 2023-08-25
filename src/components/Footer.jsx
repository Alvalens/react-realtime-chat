import { Link } from "react-router-dom";

function Footer () {
  const year = new Date().getFullYear();
		return (
			<footer className="bg-slate-200 dark:bg-gray-900 rounded-lg shadow ">
				<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
					<div className="sm:flex sm:items-center sm:justify-between">
						<Link to="/" className="flex items-center mb-4 sm:mb-0">
							<i className="fa-brands fa-react text-black fa-3x mr-5 dark:text-white"></i>
							<span className="self-center text-2xl font-semibold text-black whitespace-nowrap dark:text-white">
								React Chat
							</span>
						</Link>
						<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
							<li>
								<Link
									to="/"
									className="mr-4 hover:underline md:mr-6">
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="mr-4 hover:underline md:mr-6">
									About
								</Link>
							</li>
							<li>
								<Link
									to="/chat-home"
									className="mr-4 hover:underline md:mr-6">
									Chat
								</Link>
							</li>
						</ul>
					</div>
					<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
					<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© {year}{" "}
						<a
							href="https://alvalens.my.id"
							className="hover:underline">
							Alvalens
						</a>
						. All Rights Reserved.
					</span>
				</div>
			</footer>
		);
	}

export default Footer;

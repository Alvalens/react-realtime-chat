// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";



const About = () => {
	return (
		<>
			<div className="container mx-auto bg-slate-200 dark:bg-gray-900 min-h-screen flex justify-center items-center my-24 md:my-0">
				<div className="text-center">
					<h1 className="text-2xl font-semibold">
						About This Project
					</h1>
					<p className="text-gray-500 dark:text-gray-300 px-2 md:px-36 pt-2">
						This is my second React project, Realtime Chat App with
						Firebase,Tailwind CSS, Daisyui. This is my ambitious project because i'am new to React JS and also this is my first time using firebase. But beside that, i'am also learning many things about react. If you want to know more about this project, you can visit <a href="http://">Github repository.</a>
					</p>
					{/* container 2 grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mx-3">
							<div className="flex flex-col items-center">
								<img
									className="w-32 h-32 rounded-full mt-2"
									src="https://avatars.githubusercontent.com/u/109880628?v=4"
									alt="profile"
								/>
								<div className="mt-4">
									<h2 className="text-xl font-medium dark:text-white">
										Alvalens |{" "}
										<span className="text-slate-400 text-sm font-light">
											Web Developer{" "}
										</span>
									</h2>
									<p className="text-sm text-gray-500 dark:text-gray-300 p-4 text-justify">
										Hello! I'm Alvalens, junior fullstack
										web developer. I'm from Indonesia. I'm
										currently learning React JS and Node JS.
										I'm also interested in UI/UX Design. If
										you want to know more about me, you can
										visit my website or contact me via
										social.
									</p>
								</div>
							</div>
						</div>
						{/* social */}
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mx-3">
							<div className="flex flex-col items-center">
								{/* head icon */}
								<div className="flex flex-col justify-center items-center pb-5">
									<FontAwesomeIcon
										icon={faAddressBook}
										className="text-8xl text-gray-500 dark:text-gray-300 py-3"
									/>
									<h2 className="text-xl font-semibold dark:text-white pt-4">
										Contact Me
									</h2>
								</div>
								<div className="flex items-center justify-center space-x-2 pt-2 flex-wrap">
									<a
										href="mailto:Alvalen.shafel04@gmail.com?subject=Hello&amp;body=Hello Alvalens, "
										className="my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										<FontAwesomeIcon
											icon={faEnvelope}
											className="text-3xl px-2"
										/>{" "}
										Email
									</a>
									<a
										href="https://github.com/Alvalens"
										className="my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										<FontAwesomeIcon
											icon={faGithub}
											className="text-3xl px-2"
										/>{" "}
										Github
									</a>
									<a
										href="https://www.instagram.com/alvalens_/"
										className="my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										<FontAwesomeIcon
											icon={faInstagram}
											className="text-3xl px-2"
										/>{" "}
										Instagram
									</a>
									<a
										href="https://www.linkedin.com/in/alvalen-shafel-8a081a254/"
										className="my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										<FontAwesomeIcon
											icon={faLinkedin}
											className="text-3xl px-2"
										/>{" "}
										Linkedin
									</a>
									<a
										href="https://discordapp.com/users/bloody#6118"
										className="my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										<FontAwesomeIcon
											icon={faDiscord}
											className="text-3xl px-2"
										/>{" "}
										Discord
									</a>
								</div>
							</div>
						</div>
						{/* stack used */}
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mx-3">
							<div className="flex flex-col items-center">
								<div className="flex flex-col justify-center items-center pb-5">
									<FontAwesomeIcon
										icon={faLayerGroup}
										className="text-8xl text-gray-500 dark:text-gray-300 py-3"
									/>
									<h2 className="text-xl font-semibold dark:text-white pt-4">
										Stack Used
									</h2>
								</div>
								<div className="flex items-center justify-center space-x-2 pt-2 flex-wrap">
									<button className="btn capitalize my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										React JS
									</button>
									<button className="btn capitalize my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										Firebase
									</button>
									<button className="btn capitalize my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										Tailwind CSS
									</button>
									<button className="btn capitalize my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										Daisy UI
									</button>
									<button className="btn capitalize my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										React Router
									</button>
									<button className="btn capitalize my-1 dark:text-gray-300 hover:text-gray-600 flex items-center bg-slate-600 hover:bg-white py-2 px-3 rounded-lg text-white">
										Font Awsome
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default About;

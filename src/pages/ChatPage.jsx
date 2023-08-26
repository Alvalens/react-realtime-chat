import { useEffect, useRef, useState } from "react";
import {
	query,
	collection,
	orderBy,
	onSnapshot,
	limit,
	where,
	doc,
	getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

// components
import Message from "../components/Message";
import SendMessage from "../components/SendMessage";
import Loader from "../components/Loader";

const ChatPage = () => {
	const { user, loading: authLoad } = useAuth();
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [group, setGroup] = useState(null);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const groupId = queryParams.get("groupId");
	const scroll = useRef();

	// query to check if groupId is valid
	useEffect(() => {
		if (!groupId || !user) {
			return;
		}

		const groupRef = doc(db, "groups", groupId);
		
		getDoc(groupRef)
			.then((docSnapshot) => {
				if (!docSnapshot.exists()) {
					alert("Group not found");
					window.location.href = "/chat-home";
				}
				setGroup(docSnapshot.data());
			})
			.catch((error) => {
				console.error("Error getting group document:", error);
			});
	}, [groupId, user]);

	useEffect(() => {
		if (authLoad || !user) {
			setLoading(false);
			return;
		}
		setLoading(true);

		const q = query(
			collection(db, "messages"),
			where("groupId", "==", groupId),
			orderBy("createdAt", "desc"), // Keep the descending order
			limit(30)
		);

		const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
			const fetchedMessages = [];
			QuerySnapshot.forEach((doc) => {
				fetchedMessages.push({ ...doc.data(), id: doc.id });
			});

			// Reverse the order of fetched messages before setting state
			const sortedMessages = fetchedMessages;

			setMessages(sortedMessages);
			setLoading(false);
		});

		return () => unsubscribe();
	}, [user, groupId, authLoad]);

	useEffect(() => {
		if (scroll.current) {
			scroll.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	if (loading || authLoad) {
		return <Loader />;
	} else if (!user) {
		return (
			<div className="flex items-center justify-center h-screen">
				<h1 className="text-3xl font-semibold text-center">
					Please Login to Chat
				</h1>
			</div>
		);
	} else if (!groupId) {
		return (
			<div className="flex items-center justify-center h-screen">
				<h1 className="text-3xl font-semibold text-center">
					Please Select a Group to Chat
				</h1>
			</div>
		);
	}
	return (
		<div className="flex flex-col">
			{/* fixed group name on mobile */}
			<div className="fixed z-10 top-20 flex flex-col items-center justify-center w-full md:hidden bg-slate-300  backdrop-filter backdrop-blur-sm  bg-opacity-20 rounded-lg">
				<div className="relative min-w-full flex justify-center items-center">
					<button
						className=" absolute left-0 text-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center active:scale-50  mr-3"
						onClick={() => window.history.back()}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-gray-700 dark:text-gray-200"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
					</button>
					<h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
						{group?.name}
					</h1>
				</div>
			</div>
			<div className="flex justify-center items-center min-w-full h-[67vh] md:h-[62vh] mb-10 bg-slate-200 dark:bg-gray-900 mt-20 py-10 box-border">
				{/* Group info */}
				<div className="hidden md:flex flex-col items-center justify-center w-[24rem] border-l-white border-l-4">
					<div className="flex flex-col items-center justify-center w-full">
						<h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-gray-200">
							{group?.name}
						</h1>
						<h2 className="text-sm text-center dark:text-gray-300">
							<span className="text-gray-400 ">Created by: </span>
							{group?.createdBy}
						</h2>
						{/* date created */}
						<h2 className="text-sm text-center dark:text-gray-300">
							<span className="text-gray-400 ">Created on: </span>
							{group?.createdAt?.toDate().toLocaleDateString()}
						</h2>
					</div>
					{/* back button */}
					<button
						className="btn capitalize text-lg text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mt-5"
						onClick={() => window.history.back()}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						Go Back
					</button>
				</div>
				<div className="chat-container flex flex-col h-[630px] w-full md:w-[700px] lg:max-w-[1200px] 2xl:w-[1600px] pt-12">
					<div className="flex flex-col-reverse space-y-2 overflow-y-scroll py-14 md:py-4">
						{messages.map((message) => (
							<Message key={message.id} message={message} />
						))}
						{messages.length === 0 && (
							<div className="flex justify-center items-center">
								<h1 className="text-2xl font-semibold text-center mt-10 bg-gray-700 dark:bg-gray-500 text-gray-200 rounded-lg px-2 py-1">
									No Messages yet
								</h1>
							</div>
						)}
					</div>
					<span ref={scroll}></span>
				</div>
			</div>
			<div className="ml-3 min-w-[90%] md:px-24 box-border z-10">
				<SendMessage scroll={scroll} groupId={groupId} />
			</div>
		</div>
	);
}

export default ChatPage;

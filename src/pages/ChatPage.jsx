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
			<div className="fixed top-20 flex flex-col items-center justify-center w-full md:hidden bg-slate-300  dark:bg-slate-800 rounded-lg">
				<h1 className="text-3xl font-semibold text-center">
					{group?.name}
				</h1>
			</div>
			<div className="flex justify-center items-center min-w-full h-[67vh] md:h-[62vh] mb-10 bg-slate-200 dark:bg-gray-900 mt-20 py-10 box-border">
				{/* Group info */}
				<div className="hidden md:flex flex-col items-center justify-center w-[24rem] border-l-white border-l-4">
					<div className="flex flex-col items-center justify-center w-full">
						<h1 className="text-3xl font-semibold text-center">
							{group?.name}
						</h1>
						<h2 className="text-sm text-center">
							<span className="text-gray-400">Created by: </span>
							{group?.createdBy}
						</h2>
						{/* date created */}
						<h2 className="text-sm text-center">
							<span className="text-gray-400">Created on: </span>
							{group?.createdAt?.toDate().toLocaleDateString()}
						</h2>
					</div>
				</div>
				<div className="flex flex-col h-[630px] w-full md:w-[700px] lg:max-w-[1200px] 2xl:w-[1600px] pt-12">
					<div className="flex flex-col-reverse space-y-2 overflow-y-scroll">
						{messages.map((message) => (
							<Message key={message.id} message={message} />
						))}
						{messages.length === 0 && (
							<div className="flex justify-center items-center">
								<h1 className="text-2xl font-semibold text-center mt-10">
									No Messages yet
								</h1>
							</div>
						)}
					</div>
					<span ref={scroll}></span>
				</div>
			</div>
			<div className="ml-3 min-w-[90%] md:px-24 box-border">
				<SendMessage scroll={scroll} groupId={groupId} />
			</div>
		</div>
	);
}

export default ChatPage;

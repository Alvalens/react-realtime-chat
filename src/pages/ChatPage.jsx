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
		<>
			<div className="flex justify-center items-center min-w-full h-[62vh] mb-16 bg-slate-200 overflow-y-scroll dark:bg-gray-900 mt-24">
				<div className="h-[630px] w-full md:w-[700px] lg:w-[1200px] pt-11">
					<div className="flex flex-col-reverse space-y-2">
						{messages.map((message) => (
							<Message key={message.id} message={message} />
						))}
						{messages.length === 0 && (
							<div className="flex justify-center items-center">
								<h1 className="text-2xl font-semibold text-center">
									No Messages
								</h1>
							</div>
						)}
					</div>
					<span ref={scroll}></span>
					<div className="ml-3 fixed min-w-[100%] md:min-w-[80%]  bottom-48">
						<SendMessage scroll={scroll} groupId={groupId} />
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatPage;

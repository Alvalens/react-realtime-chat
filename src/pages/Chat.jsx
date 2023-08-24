import { useEffect, useRef, useState } from "react";
import {
	query,
	collection,
	orderBy,
	onSnapshot,
	limit,
	where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

// components
import Message from "../components/Message";
import SendMessage from "../components/SendMessage";
import Loader from "../components/Loader";

const Chat = () => {
	const { user } = useAuth();
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const groupId = queryParams.get("groupId");
	const scroll = useRef();

	useEffect(() => {
		if (!groupId || !user) {
			setLoading(false);
			return;
		}
		setLoading(true);
		const q = query(
			collection(db, "messages"),
			where("groupId", "==", groupId),
			orderBy("createdAt", "desc"),
			limit(30)
		);

		const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
			const fetchedMessages = [];
			QuerySnapshot.forEach((doc) => {
				fetchedMessages.push({ ...doc.data(), id: doc.id });
			});
			const sortedMessages = fetchedMessages.sort(
				(a, b) => b.createdAt - a.createdAt
			);
			setMessages(sortedMessages);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (scroll.current) {
			scroll.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	if (loading) {
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
	console.log(messages);
	return (
		<>
			<div className="relative flex justify-center items-center min-w-full h-[69vh] bg-slate-200 overflow-y-scroll">
				<div className="h-[630px] w-full md:w-[700px] lg:w-[1200px] pt-11">
					<div className="flex flex-col-reverse space-y-2">
						{messages.map((message) => (
							<Message key={message.id} message={message} />
						))}
					</div>
					<span ref={scroll}></span>
					<div className="sticky min-w-[80%] bottom-1">
						<SendMessage scroll={scroll} groupId={groupId} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;

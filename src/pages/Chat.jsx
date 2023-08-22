import { useEffect, useRef, useState } from "react";
import {
	query,
	collection,
	orderBy,
	onSnapshot,
	limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "../components/Message";
import SendMessage from "../components/SendMessage";
import { useAuth } from "../contexts/AuthContext";

const Chat = () => {
	const { user } = useAuth();
	const [messages, setMessages] = useState([]);
	const [loadings, setLoading] = useState(true);
	const scroll = useRef();

	useEffect(() => {
		setLoading(true);
		const q = query(
			collection(db, "messages"),
			orderBy("createdAt", "desc"),
			limit(50)
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

	if (loadings ) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="w-12 h-12 border-t-2 border-grey-900 border-b-2 rounded-full animate-spin"></div>
			</div>
		);
	}

	if(!user)	{
		return (
			<div className="flex items-center justify-center h-screen">
				<h1 className="text-3xl font-semibold text-center">
					Please Login to Chat
				</h1>
			</div>
		);
	}
	return (
		<>
			<div className="relative flex justify-center items-center min-w-full h-[69vh] bg-slate-200 overflow-y-scroll">
				<div className="h-[630px] w-[400px] md:w-[700px] lg:w-[1200px] pt-11">
					<div className="flex flex-col-reverse space-y-2">
						{messages.map((message) => (
							<Message key={message.id} message={message} />
						))}
					</div>
					<span ref={scroll}></span>
					<div className="sticky min-w-[80%] bottom-1">
						<SendMessage scroll={scroll} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;

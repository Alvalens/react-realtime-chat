import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
	collection,
	addDoc,
	serverTimestamp,
	onSnapshot,
	getDocs,
	query,
	where,
	orderBy,
	limit,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Loader from "../components/Loader";
import Group from "../components/Group";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Groups = ({ data }) => {
	return (
		<>
			<div className="flex flex-col space-y-3">
				{data.map((group) => (
					<Link to={`/chat?groupId=${group.id}`} key={group.id}>
						<Group
							name={group.name}
							total={group.totalMessages}
							user={auth.currentUser.displayName}
							msg={group.lastMessage}
						/>
					</Link>
				))}
			</div>
		</>
	);
};

const ChatHome = () => {
	const [loading, setLoading] = useState(true);
	const [groupName, setGroupName] = useState("");
	const [groups, setGroups] = useState([]);
	const { user, loading: authLoad } = useAuth();

	const createGroup = async (event) => {
		event.preventDefault();
		if (groupName.trim() === "") {
			alert("Enter a valid group name");
			return;
		}
		const { uid } = auth.currentUser;
		setLoading(true);
		await addDoc(collection(db, "groups"), {
			name: groupName,
			createdAt: serverTimestamp(),
			uid,
		});
		setGroupName("");
		setLoading(false);
	};

	// get groups
	useEffect(() => {
		setLoading(true);
		const unsubscribe = onSnapshot(
			collection(db, "groups"),
			async (snapshot) => {
				// Create an array of promises
				const promises = snapshot.docs.map(async (doc) => {
					const groupData = { ...doc.data(), id: doc.id };

					const messagesSnapshot = await getDocs(
						query(collection(db, "messages"), where("groupId", "==", groupData.id))
					);
					groupData.totalMessages = messagesSnapshot.size;

					const lastMessageSnapshot = await getDocs(
						query(
							collection(db, "messages"),
							where("groupId", "==", groupData.id),
							orderBy("createdAt", "desc"),
							limit(1)
						)
					);
					if (!lastMessageSnapshot.empty) {
						const lastMessageDoc = lastMessageSnapshot.docs[0];
						groupData.lastMessage = lastMessageDoc.data().text;
					}

					return groupData;
				});

				// Wait for all promises to resolve
				const resolvedGroups = await Promise.all(promises);

				setGroups(resolvedGroups);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, []);

	if (loading || authLoad) {
		return (
			<div className="flex justify-center items-center h-[69vh]">
				<Loader />
			</div>
		);
	}
	console.log(groups);
	return (
		<>
			{user ? (
				<div className="flex flex-col items-center justify-start h-[640px] bg-gray-100">
					<div className="header min-w-full">
						<h1 className="text-3xl font-bold mb-4 text-center mt-3">
							Create a New Group
						</h1>
						<div className="newGroup min-w-full text-center">
							<form onSubmit={createGroup} className="send">
								<input
									type="text"
									placeholder="Enter Group Name"
									value={groupName}
									onChange={(e) => setGroupName(e.target.value)}
									className="input input-bordered min-w-[50%] md:min-w-[60%]"
								/>
								{loading ? (
									<button
										disabled
										className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 min-w-[10%]"
									>
										Loading
										<FontAwesomeIcon
											icon={faCircleNotch}
											className="animate-spin ml-2"
										/>
									</button>
								) : (
									<button
										type="submit"
										className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-3"
									>
										Send
										<FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
									</button>
								)}
							</form>
						</div>
					</div>
					<div className="body p-4 w-[400px] md:w-[700px] lg:w-[1200px]">
						{loading ? (
							<>
								<div className="flex justify-center items-center h-[69vh]">
									<Loader />
								</div>
							</>
						) : (
							<Groups data={groups} />
						)}
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center h-screen">
					<h1 className="text-3xl font-semibold text-center">
						Please Login to Chat
					</h1>
				</div>
			)}
		</>
	);
};

export default ChatHome;

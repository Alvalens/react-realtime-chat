import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import PropTypes from "prop-types";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

const SendMessage = ({scroll, groupId}) => {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const sendMessage = async (event) => {
		event.preventDefault();
		if (message.trim() === "") {
			alert("Enter valid message");
			return;
		}
		const { uid, displayName, photoURL } = auth.currentUser;
		setLoading(true);
		await addDoc(collection(db, "messages"), {
			text: message,
			name: displayName,
			avatar: photoURL,
			groupId: groupId,
			createdAt: serverTimestamp(),
			uid,
		});
		setMessage("");
		setLoading(false);
		scroll.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="min-w-full">
			<form className="send-message" onSubmit={sendMessage}>
				<label htmlFor="messageInput" hidden>
					Enter Message
				</label>
				<input
					type="text"
					id="messageInput"
					className="input input-bordered min-w-[70%] md:min-w-[75%] lg:min-w-[85%] ml-0 lg:ml-0 xl:ml-10 2xl:ml-16"
					placeholder="Enter Message"
					value={message}
					autoComplete="off"
					onChange={(e) => setMessage(e.target.value)}
				/>
				{loading ? (
					<button
						disabled
						className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 min-w-[10%]">
						<FontAwesomeIcon
							icon={faCircleNotch}
							className="animate-spin mr-2"
						/>
						Send
					</button>
				) : (
					<button
						type="submit"
						className="text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ml-3">
						Send
						<FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
					</button>
				)}
			</form>
		</div>
	);
};
// props validation
SendMessage.propTypes = {
	scroll: PropTypes.object.isRequired,
	groupId: PropTypes.string.isRequired,

};

export default SendMessage;

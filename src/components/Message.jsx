import PropTypes from "prop-types";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatBubble } from "react-daisyui";

const Message = ({ message }) => {
	const { text, uid, avatar, name, createdAt } = message;

	const [user] = useAuthState(auth);
	const messageClass = uid === user.uid ? "sent" : "received";
	const time = new Date(createdAt?.toDate()).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	return (
		<>
			{messageClass === "received" ? (
				<ChatBubble className="px-4 z-0">
					<ChatBubble.Avatar src={avatar} />
					<ChatBubble.Header className="text-gray-800 dark:text-gray-200">
						{name} <ChatBubble.Time>{time}</ChatBubble.Time>
					</ChatBubble.Header>
					<ChatBubble.Message>{text}</ChatBubble.Message>
					<ChatBubble.Footer className="text-gray-800 dark:text-gray-200">
						received
					</ChatBubble.Footer>
				</ChatBubble>
			) : (
				<ChatBubble end className="px-4 z-0">
					<ChatBubble.Avatar src={avatar} />
					<ChatBubble.Header className="text-gray-800 dark:text-gray-200">
						{name} <ChatBubble.Time>{time}</ChatBubble.Time>
					</ChatBubble.Header>
					<ChatBubble.Message>{text}</ChatBubble.Message>
					<ChatBubble.Footer className="text-gray-800 dark:text-gray-200">
						Sent
					</ChatBubble.Footer>
				</ChatBubble>
			)}
		</>
	);
};

Message.propTypes = {
	message: PropTypes.shape({
		text: PropTypes.string.isRequired,
		uid: PropTypes.string.isRequired,
		avatar: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		createdAt: PropTypes.shape({
			seconds: PropTypes.number.isRequired,
			nanoseconds: PropTypes.number.isRequired,
			toDate: PropTypes.func.isRequired,
		}),
	}).isRequired,
};

export default Message;
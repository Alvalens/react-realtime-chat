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
				<ChatBubble>
					<ChatBubble.Avatar src={avatar} />
					<ChatBubble.Header>
						{name} <ChatBubble.Time>{time}</ChatBubble.Time>
					</ChatBubble.Header>
					<ChatBubble.Message>{text}</ChatBubble.Message>
					<ChatBubble.Footer>received</ChatBubble.Footer>
				</ChatBubble>
			) : (
				<ChatBubble end>
					<ChatBubble.Avatar src={avatar} />
					<ChatBubble.Header>
						{name} <ChatBubble.Time>{time}</ChatBubble.Time>
					</ChatBubble.Header>
					<ChatBubble.Message>{text}</ChatBubble.Message>
					<ChatBubble.Footer>Sent</ChatBubble.Footer>
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
			toDate: PropTypes.func.isRequired,
		}).isRequired,
	}).isRequired,
};

export default Message;
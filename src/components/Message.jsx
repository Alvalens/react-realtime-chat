import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {ChatBubble} from "react-daisyui";

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


export default Message;
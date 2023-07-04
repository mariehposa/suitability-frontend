import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Send from "../../assets/send.png";
import "./Chat.scss";
import { socket } from "../../socket";
import { socketConstants } from "../../utils";

const Chat = () => {
	const user = useSelector((state) => state.user);
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const divRef = useRef(null);

	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		socket.on(socketConstants.newMessage, ({playerId, message}) => {

			setMessages([
				...messages,
				{ playerId, message, time: moment().calendar() },
			]);
		})
	})

	const sendMessage = (message) => {
		socket.emit(socketConstants.newMessage, message)
	}

	return (
		<div className="chat">
			<p className="heading">Chat Messages</p>
			<div className="chat-container">
				{messages.map((m) => (
					<div
						className={`chat-box ${
							m.playerId === user.userId ? "receiver" : "sender"
						}`}
					>
						<p>{`${
							m.playerId?.length > 6
								? `${m.playerId.substring(0, 6)}..`
								: m.playerId
						}: ${m.message}`}</p>
						<span className="time">{m.time}</span>
					</div>
				))}
                <div  ref={divRef} style={{height: '90px'}}><p>{" "}</p></div>
			</div>

			<div className="input-wrapper">
				<form onSubmit={(e) => {
                    e.preventDefault()
					sendMessage(newMessage)
						setNewMessage("");
					}}>
                <input
					type="text"
					className="chat-text"
					value={newMessage}
					onChange={(e) => {
						setNewMessage(e.target.value);
					}}
					placeholder="Type your message..."
				></input>
				<img
					onClick={() => {
						sendMessage(newMessage)
						setNewMessage("");
					}}
					src={Send}
					alt="send"
				/>
                </form>
			</div>
		</div>
	);
};

export default Chat;

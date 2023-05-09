import React, { useState } from "react";
import { socket } from "../../socket";
import "./Notification.scss";

const Notification = () => {
	const [players, setPlayers] = useState({});
    const [userInput, setUserInput] = useState("")

	socket.on("connected players", function (connectedPlayers) {
		var playersObj = JSON.parse(connectedPlayers);
		console.log(playersObj);
		setPlayers(playersObj);
	});

	socket.on("usernameSet", function (players) {
		console.log("set", players);
		setPlayers(JSON.parse(players));
	});

    const setUsername = (e) => {
        e.preventDefault();
        console.log(e);
      if (userInput) {
        socket.emit("setUsername", userInput);
        setUserInput("")
      }
    }

	return (
		<div className="notification-wrapper">
			<form id="form" onSubmit={setUsername} className="form">
                <label>Create a username</label>
				<input id="input" value={userInput} onChange={(e) => setUserInput(e.target.value)} autocomplete="off" />
				<button>Send</button>
			</form>

			<ul>
				{Object.entries(players).map((p) => (
					<li>{p[1]}</li>
				))}
			</ul>
		</div>
	);
};

export default Notification;

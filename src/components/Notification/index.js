import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updatePlayerScores } from "../../redux/actionCreators/board";
import { socket } from "../../socket";
import { useSelector } from "react-redux";
import { socketConstants } from "../../utils";
import "./Notification.scss";

const Notification = (props) => {
	const { tricks, updateScores, scores } = props;

	const [players, setPlayers] = useState({});
	const [userInput, setUserInput] = useState("");
	const [dealer, setDealer] = useState("");

	const user = useSelector((state) => state.user);
	const board = useSelector((state) => state.board);
	console.log("notif props", props, user);

	socket.on(
		socketConstants.connectedPlayers,
		function (connectedPlayers, host) {
			var playersObj = JSON.parse(connectedPlayers);
			console.log(playersObj);
			setPlayers(playersObj);
			// setDealer(host)
		}
	);

	socket.on(socketConstants.notifyDealer, (dealer) => {
		console.log("got notified");
		setDealer(dealer);
	});

	socket.on("usernameSet", function (players) {
		console.log("set", players);
		setPlayers(JSON.parse(players));
	});

	socket.on(socketConstants.playerScores, (scores) => {
		console.log("notif logs", socketConstants.playerScores, scores);
		updateScores(scores);
	});

	useEffect(() => {}, []);

	const setUsername = (e) => {
		e.preventDefault();
		console.log(e);
		if (userInput) {
			socket.emit("setUsername", userInput);
			setUserInput("");
		}
	};

	return (
		<div className="notification-wrapper">
			<form id="form" onSubmit={setUsername} className="form">
				<label>Create a username</label>
				<input
					id="input"
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					autocomplete="off"
				/>
				<button>Send</button>
			</form>

			<div>
				<p>Username: {players[user.userId]}</p>
				<p>Tricks Taken: {tricks[user.userId] ?? 0}</p>
				<p>Game Score: {scores[user.userId] ?? 0}</p>
			</div>

			<div className="score-board">
				<p>{`Number of players connected: ${Object.keys(players).length}`}</p>
				<table>
					<tr>
						<th>Player Name</th>
						<th>Tricks Taken</th>
						<th>Game Score</th>
					</tr>
					{Object.entries(players).map((p) => {
						console.log("checking", p, board);
						return (
							<tr>
								<td
									style={{
										color: p[0] === board.activePlayer ? "red" : "black",
										fontWeight: p[0] === dealer ? "500" : "normal",
									}}
								>
									{`${p[0] === dealer ? "HOST" : ""} ${p[1]}`}
								</td>
								<td>{tricks[p[0]] ?? 0}</td>
								<td>{scores[p[0]] ?? 0}</td>
							</tr>
						);
					})}
				</table>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	tricks: state.board.playerTricks,
	scores: state.notification.playerScores,
});

export default connect(mapStateToProps, {
	updateScores: (x) => updatePlayerScores(x),
})(Notification);

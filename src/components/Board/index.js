import "./Board.scss";
import React, { useState } from "react";
import { socket } from "../../socket";

const Board = () => {
	const [cards, setCards] = useState([]);
	const start = () => {
		socket.emit("start");
	};

	socket.on("player cards", function (cards) {
		console.log(cards, "player cards");
		setCards(JSON.parse(cards)[socket.id]);
	});
	return (
		<div className="board-wrapper">
			<div>
				{cards.map((e) => (
					<p>{e}</p>
				))}
			</div>
			<button onClick={start} className="start-btn">
				Start
			</button>
		</div>
	);
};

export default Board;

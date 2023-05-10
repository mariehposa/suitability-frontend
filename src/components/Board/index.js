import "./Board.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../../socket";

const Board = () => {
	const [cards, setCards] = useState([]);
    const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/message`)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
	const start = () => {
		socket.emit("start");
	};

	socket.on("player cards", function (cards) {
		console.log(cards, "player cards");
		setCards(JSON.parse(cards)[socket.id]);
	});
	return (
		<div className="board-wrapper">
            <p>{message}</p>
			<ol>
				{cards.map((e) => (
					<li>{e}</li>
				))}
			</ol>
			<button onClick={start} className="start-btn">
				Start
			</button>
		</div>
	);
};

export default Board;

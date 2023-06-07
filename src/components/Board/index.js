import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
	addItem,
	deleteItem,
	changePlayer,
	startGame,
	updateBoard,
	updatePlayerTricks,
	updatePlayerScores,
} from "../../redux/actionCreators/board";
import { socket } from "../../socket";
import { gameState, socketConstants } from "../../utils";
import "./Board.scss";
import Modal from "react-modal";
import check from "../../assets/cards/check.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
	content: {
		top: "50%",
		left: "33%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		padding: "30px",
		width: "400px",
	},
};

const Board = (props) => {
	const { board, updateTricks, tricks, activePlayer } = props;

	console.log("props", props);

	const [cards, setCards] = useState([]);
	const [gameStatus, setGameStatus] = useState(gameState.ready);
	const [selectedSuit, setSelectedSuit] = useState("");
	const [abilityToAssign, setAbilityToAssign] = useState("")
  const [assignedAbilities, setAssignedAbilities] = useState({})

	const dispatch = useDispatch();

	const [modalIsOpen, setIsOpen] = React.useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const suitNotify = () =>
		toast("Suit assigned successfully!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

	const selectSuit = (suit) => {
    console.log("suit", suit);
    if(!Object.values(assignedAbilities).includes(suit)){
      setSelectedSuit(suit);

      socket.emit(socketConstants.suitabilityChosen, abilityToAssign, suit)
    }
		// suitNotify();
	};

	const user = useSelector((state) => state.user);
  const playerTricks = tricks[user.userId]

	useEffect(() => {
		socket.on("player cards", function (cards) {
			// console.log(cards, "player cards");
			setCards(JSON.parse(cards)[socket.id]);
		});

		socket.on(socketConstants.board, (board) => {
			// console.log("current board", board);
			dispatch(updateBoard(board));
		});

		socket.on(socketConstants.activePlayer, (playerId) => {
			console.log("active player", playerId);
			dispatch(changePlayer(playerId));
		});

		socket.on(socketConstants.playerScores, (scores) => {
			// console.log("board logs", socketConstants.playerScores, scores);
		});

		socket.on(socketConstants.playerTricks, (tricks) => {
			// console.log(socketConstants.playerTricks, tricks);
			updateTricks(tricks);
		});

		socket.on(socketConstants.error, (e) => {
			// console.log("An error occured", e.msg);
		});

    socket.on(socketConstants.chooseSuitability, (ability, assignedAbilities) => {
      setAbilityToAssign(ability)
      // debugger
      setAssignedAbilities(assignedAbilities ?? {})
      openModal()
    })

    socket.on(socketConstants.suitabilityChosen, (ability) => {
      closeModal()
      setSelectedSuit("")
      toast.info(`${ability} suit selected successfully`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      }); 
    })

		return () => {
			socket.off("player cards", function (cards) {
				// console.log(cards, "player cards");
				setCards(JSON.parse(cards)[socket.id]);
			});

			socket.off(socketConstants.board, (board) => {
				// console.log("current board", board);
				dispatch(updateBoard(board));
			});

			socket.off(socketConstants.activePlayer, (playerId) => {
				// console.log("active player", playerId);
				// dispatch(changePlayer(playerId));
			});

			socket.off(socketConstants.error, (e) => {
				// console.log("An error occured", e.msg);
			});
		};
	}, [dispatch]);

  useEffect(() => {
    if (activePlayer === user.userId) {
      toast.info("Your turn", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      }); 
    } else { toast.dismiss() }
  }, [activePlayer, user.userId])

	const start = () => {
		socket.emit("start");
    console.log("emitting start")
		// setGameStatus(gameState.selectSuitabilities);
    setGameStatus(gameState.inPlay);
		dispatch(startGame());
	};

	function importAll(r) {
		let images = {};
		r.keys().map((item, index) => {
			images[item.replace("./", "")] = r(item);
		});
		return images;
	}

	const images = importAll(
		require.context("../../assets/cards/", true, /\.(png|jpe?g|svg)$/)
	);

	const suitCards = ["C13", "H13", "D13", "S13"];

	const lastCard = board?.slice(-1)[0];

	console.log("last card", props.board);

	const playCard = (card) => {
		socket.emit(socketConstants.playCard, card);
	};

	return (
		<div className="board-wrapper">
			<p className="game-name">Suitability</p>

			<div className="board">
				{board.length > 0 ? (board).map((card, index) => (
					<img
						className={`card ${
							board.length === 0 || index === board.length - 1 ? "active" : ""
						}`}
						src={images[`${card}.svg`]}
						alt={`Card ${index + 1}`}
						style={{ transform: `translateX(${index * 8}px)`, zIndex: index }}
					/>
				)): <div className="arena">Play card</div>}
				{/* {board.length > 0 ? board : <div className="arena">Play card</div>} */}
			</div>

			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					margin: "50px 0",
					justifyContent: "center",
				}}
			>
				{cards.sort().map((e) => (
					<img
						className={`card ${e === "J0" ? "joker-card" : ""}`}
						onClick={() => playCard(e)}
						key={e}
						src={images[`${e}.svg`]}
						alt={`card ${e}`}
					/>
				))}
			</div>

			{gameStatus === gameState.ready && (
				<button
					onClick={() => {
						setGameStatus(gameState.chooseMode);
					}}
					className="start-btn"
				>
					Start
				</button>
			)}

			{gameStatus === gameState.chooseMode && (
				<div className="mode-wrapper">
					<p>Choose game mode</p>
					<button onClick={start} className="mode-btn">
						Four deals
					</button>
					<button
						onClick={() => {
							start()
						}}
						className="mode-btn"
					>
						250 points
					</button>
				</div>
			)}

			{gameStatus === "select_suitabilities" && (
				<button onClick={() => {
          socket.emit(socketConstants.chooseSuitability)
        }} className="start-btn">
					Select suitabilities
				</button>
			)}

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<p className="modal-header">{`Select ${abilityToAssign} suit`}</p>

				<div className="modal-content">
					{suitCards.map((card) => (
						<>
							{/* {selectedSuit === card.charAt(0) && ( */}
							{/* <img
									src={check}
									alt="selected-suit"
									className="selected-suit-check"
								/> */}
							{/* // )} */}
							<div className="img-container">
								{selectedSuit === card.charAt(0) && (
									<img
                  
										src={check}
										alt="selected-suit"
										className="selected-suit-check"
									/>
								)}
								<img
									key={card}
                  style={{cursor: `${Object.values(assignedAbilities).includes(card.charAt(0))? 'not-allowed': 'pointer'}`}} 
									className={`card ${
										selectedSuit === card.charAt(0) ? "img-overlay" : ""
									}`}
									src={images[`${card}.svg`]}
									alt={`card ${card}`}
									onClick={() => selectSuit(card.charAt(0))}
								/>
								{/* {selectedSuit && <div className="img-overlay" />} */}
							</div>
						</>
					))}
				</div>
				<button onClick={closeModal} className="modal-close-btn">
					Close
				</button>
			</Modal>
			<ToastContainer />
			<div className="board">
				{[...Array(playerTricks ?? 0).keys()].map((t, index) => (
					<img
						className={`card ${
							playerTricks.length === 0 || index === playerTricks.length - 1 ? "active" : ""
						}`}
						src={images[`RED_BACK.svg`]}
						alt={`Card ${index + 1}`}
						style={{ transform: `translateX(${index * 8}px)`, zIndex: index }}
					/>
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	numOfItems: state.board.numOfItems,
	loading: state.board.loading,
	error: state.board.error,
	board: state.board.board,
	activePlayer: state.board.activePlayer,
	tricks: state.board.playerTricks,
	scores: state.board.playerScores,
});

export default connect(mapStateToProps, {
	addItem: () => addItem(),
	deleteItem: () => deleteItem(),
	updateTricks: (x) => updatePlayerTricks(x),
	updateScores: (x) => updatePlayerScores(x),
})(Board);

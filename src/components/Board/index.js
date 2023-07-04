import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
import { gameState, gameTypes, socketConstants } from "../../utils";
import "./Board.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuitabilityModal from "./SuitabilityModal";
import PrivilegeModal from "./PriviledgeModal";
import SuitabilitiesSelected from "./SuitabilitiesSelected";

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
	const { roomId: roomID } = useParams();

	useEffect(() => {
		if (roomID) {
			socket.emit(socketConstants.joinRoom, roomID);
		}
	}, [roomID]);

	const [cards, setCards] = useState([]);
	const [gameStatus, setGameStatus] = useState(gameState.lobby);
	const [dealer, setDealer] = useState("");
	const [selectedSuit, setSelectedSuit] = useState("");
	const [abilityToAssign, setAbilityToAssign] = useState("");
	const [assignedAbilities, setAssignedAbilities] = useState({});

	const dispatch = useDispatch();

	const [modalIsOpen, setIsOpen] = React.useState(false);

	const [privilegeModalOpen, setPrivilegeModalOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

  const navigate = useNavigate();

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
			containerId: "A",
		});

	const selectSuit = (suit) => {
		if (!Object.values(assignedAbilities).includes(suit)) {
			setSelectedSuit(suit);

			socket.emit(socketConstants.suitabilityChosen, abilityToAssign, suit);
		}
		// suitNotify();
	};

	const [roomId, setRoomId] = useState("");

	const user = useSelector((state) => state.user);
	const playerTricks = tricks[user.userId];

	useEffect(() => {
		socket.on(socketConstants.enteredRoom, function () {
			setGameStatus(gameState.ready);
		});
		socket.on(socketConstants.gameStart, function () {
			setGameStatus(gameState.inPlay);
		});
		socket.on(socketConstants.notifyDealer, (dealer) => {
			setDealer(dealer);
		});
		socket.on("player cards", function (cards) {
			setCards(JSON.parse(cards)[socket.id]);
		});

		socket.on(socketConstants.board, (board) => {
			dispatch(updateBoard(board));
		});

		socket.on(socketConstants.activePlayer, (playerId) => {
			dispatch(changePlayer(playerId));
		});

		socket.on(socketConstants.playerScores, (scores) => {});

		socket.on(socketConstants.playerTricks, (tricks) => {
			updateTricks(tricks);
		});

		socket.on(socketConstants.roundFinished, (winner) => {
			setTimeout(() => {
				toast.info(`${winner} takes this round! Starting next round`, {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					toastId: `${winner}-round-notif`,
					theme: "light",
					containerId: "A",
				});
			}, 1000);
		});

		socket.on(socketConstants.gameFinished, (winner, score) => {
			setTimeout(() => {
				toast.info(`${winner} wins the game with ${score} points`, {
					position: "top-center",
					autoClose: false,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					toastId: `${winner}-game-notif`,
					progress: undefined,
					theme: "light",
					containerId: "A",
				});
			}, 1000);
		});

		socket.on(socketConstants.error, (error) => {
			toast.error(`${error.msg}`, {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				toastId: `${error?.msg}-chosen`,
				progress: undefined,
				theme: "light",
				containerId: "A",
			});
		});

		socket.on(socketConstants.roomCreated, (roomId) => {
			toast.info(`Created room ${roomId}`, {
				position: "top-center",
				autoClose: false,
				hideProgressBar: false,
				toastId: roomId,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
				containerId: "A",
			});
		});

		socket.on(
			socketConstants.chooseSuitability,
			(ability, assignedAbilities) => {
				setAbilityToAssign(ability);
				// debugger
				setAssignedAbilities(assignedAbilities ?? {});
				if (ability.toLowerCase() === "privilege") setPrivilegeModalOpen(true);
				else openModal();
			}
		);

		socket.on(socketConstants.suitabilities, (abilities) => {
			setAssignedAbilities(abilities);
		});
		/**
     * state.board = [];
    state.currentSuit = "";
    state.highestPlayedCard = 0;
    setCurrentPlayer(state.highestPlayer);
    state.highestPlayer = null;
     */

		socket.on(socketConstants.suitabilityChosen, (ability) => {
			closeModal();
			setPrivilegeModalOpen(false);
			setSelectedSuit("");
			toast.info(`${ability} suit selected successfully`, {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				toastId: `${ability}-chosen`,
				progress: undefined,
				theme: "light",
				containerId: "A",
			});
		});

		return () => {
			socket.off("player cards", function (cards) {
				setCards(JSON.parse(cards)[socket.id]);
			});

			socket.off(socketConstants.board, (board) => {
				dispatch(updateBoard(board));
			});

			socket.off(socketConstants.activePlayer, (playerId) => {});

			socket.off(socketConstants.error, (e) => {});
		};
	}, [dispatch, updateTricks]);

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
				containerId: "A",
			});
		} else {
			toast.dismiss();
		}
	}, [activePlayer, user.userId]);

	const start = (gameType) => {
		socket.emit("start", gameType);
		// setGameStatus(gameState.selectSuitabilities);
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

	const playCard = (card) => {
		socket.emit(socketConstants.playCard, card);
	};

	return (
		<div className="board-wrapper">
			<div
				className="board"
				style={{ display: gameStatus === gameState.inPlay ? "" : "none" }}
			>
				{board.length > 0 ? (
					board.map((card, index) => (
						<img
							className={`card ${
								board.length === 0 || index === board.length - 1 ? "active" : ""
							}`}
							src={images[`${card}.svg`]}
							alt={`Card ${index + 1}`}
							style={{ transform: `translateX(${index * 8}px)`, zIndex: index }}
						/>
					))
				) : (
					<div className="arena">Play card</div>
				)}
			</div>

			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					margin: "50px 0",
					justifyContent: "center",
					visibility: gameStatus === gameState.inPlay ? "" : "hidden",
				}}
			>
				{cards.sort().map((e) => (
					<img
						className={`card ${e === "J0" ? "joker-card" : ""}`}
						onClick={() => playCard(e)}
						key={e}
						src={images[`${e}.svg`]}
						alt={`card ${e}`}
						style={{ cursor: "pointer" }}
					/>
				))}
			</div>

			{gameStatus === gameState.lobby && (
				<>
					<button
						className="start-btn"
						onClick={() => {
							socket.emit(socketConstants.createRoom);
						}}
					>
						Create room
					</button>

					<div>
						<input
							value={roomId}
							className="join-input"
							onChange={(e) => {
								setRoomId(e.target.value);
							}}
						></input>
						<button
							className="start-btn join-room-btn"
							onClick={() => {
								socket.emit(socketConstants.joinRoom, roomId);
							}}
						>
							Join room
						</button>
					</div>
				</>
			)}

			{gameStatus === gameState.ready && user.userId === dealer && (
				<button
					onClick={() => {
						setGameStatus(gameState.chooseMode);
					}}
					className="start-btn"
				>
					Start
				</button>
			)}

			{gameStatus === gameState.ready && user.userId !== dealer && (
				<div className="start-btn">waiting for host to start game...</div>
			)}

			{gameStatus === gameState.ready && user.userId !== dealer && (
				<button onClick={() => {
          socket.emit(socketConstants.leaveRoom)
          navigate("/http://localhost:3000/room/5YRr0Z")
          navigate(0)
        }} className="start-btn">Leave room</button>
			)}

			{gameStatus === gameState.chooseMode && (
				<div className="mode-wrapper">
					<p>Choose game mode</p>
					<button
						onClick={() => {
							start(gameTypes.Deals);
						}}
						className="mode-btn"
					>
						Four deals
					</button>
					<button
						onClick={() => {
							start(gameTypes.Points);
						}}
						className="mode-btn"
					>
						250 points
					</button>
				</div>
			)}
			{gameStatus === "select_suitabilities" && (
				<button
					onClick={() => {
						socket.emit(socketConstants.chooseSuitability);
					}}
					className="start-btn"
				>
					Select suitabilities
				</button>
			)}

			<SuitabilityModal
				modalIsOpen={modalIsOpen}
				abilityToAssign={abilityToAssign}
				suitCards={suitCards}
				selectedSuit={selectedSuit}
				assignedAbilities={assignedAbilities}
				selectSuit={selectSuit}
				images={images}
				customStyles={customStyles}
			/>
			<PrivilegeModal
				modalIsOpen={privilegeModalOpen}
				closeModal={() => {
					setPrivilegeModalOpen(false);
				}}
				selectSuit={(suit) => {
					socket.emit(socketConstants.suitabilityChosen, abilityToAssign, suit);
				}}
				cardImages={images}
				customStyles={customStyles}
			/>

			<ToastContainer containerId={"A"} />
			<ToastContainer containerId={"B"} />

			<div className="trick-suit">
				<div className="board">
					{[...Array(playerTricks ?? 0).keys()].map((t, index) => (
						<img
							className={`card ${
								playerTricks.length === 0 || index === playerTricks.length - 1
									? "active"
									: ""
							}`}
							src={images[`RED_BACK.svg`]}
							alt={`Card ${index + 1}`}
							style={{ transform: `translateX(${index * 8}px)`, zIndex: index }}
						/>
					))}
				</div>
				<SuitabilitiesSelected
					cardImages={images}
					assignedAbilities={assignedAbilities}
				/>
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

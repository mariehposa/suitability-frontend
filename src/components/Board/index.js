import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import {
  addItem,
  deleteItem,
  changePlayer,
  startGame,
  updateBoard,
} from "../../redux/actionCreators/board";
import { socket } from "../../socket";
import { socketConstants } from "../../utils";
import "./Board.scss";
// import second from '../../assets/c'

const Board = (props) => {
  const { numOfItems, addItem, deleteItem, board } = props;

  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_KEY}/message`)
  //     .then((res) => {
  //       setMessage(res.data.message);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    socket.on("player cards", function (cards) {
      console.log(cards, "player cards");
      setCards(JSON.parse(cards)[socket.id]);
    });

    socket.on(socketConstants.board, (board) => {
      console.log("current board", board);
      dispatch(updateBoard(board));
    });

    socket.on(socketConstants.activePlayer, (playerId) => {
      console.log("active player", playerId);
      dispatch(changePlayer(playerId));
    });

    socket.on(socketConstants.playerScores, (scores) => {
      console.log(socketConstants.playerScores, scores);
      
    });
    socket.on(socketConstants.playerTricks, (tricks) => {
      console.log(socketConstants.playerTricks, tricks);
      
    });

    socket.on(socketConstants.error, (e) => {
      console.log("An error occured", e.msg);
    });

    return () => {
      socket.on("player cards", function (cards) {
        console.log(cards, "player cards");
        setCards(JSON.parse(cards)[socket.id]);
      });

      socket.on(socketConstants.board, (board) => {
        console.log("current board", board);
        dispatch(updateBoard(board));
      });

      socket.on(socketConstants.activePlayer, (playerId) => {
        console.log("active player", playerId);
        dispatch(changePlayer(playerId));
      });

      socket.on(socketConstants.error, (e) => {
        console.log("An error occured", e.msg);
      });
    };
  }, [dispatch]);

  const start = () => {
    socket.emit("start");
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

  const lastCard = board?.slice(-1)[0];

  console.log("last card", props.board);

  const playCard = (card) => {
    socket.emit(socketConstants.playCard, card);
  };

  //src/assets/cards/C10.svg
  return (
    <div className="board-wrapper">
      {/* <p>{message}</p> */}
      <div className="board">
        {/* {lastCard ? <img style={{width: "40px", margin: "0 5px"}} src={images[`${lastCard}.svg`]} alt={`card ${lastCard}`}/> : <img style={{width: "40px", margin: "0 5px"}} src={images[`RED_BACK.svg`]} alt={`card RED_BACK`}/>} */}
        {(board.length > 0 ? board : ['RED_BACK']).map((card, index) => (

          <img
            className={`card ${(board.length === 0 || index === board.length - 1) ? "active" : ""}`}
            src={images[`${card}.svg`]}
            alt={`Card ${index + 1}`}
            style={{ transform: `translateX(${index * 8}px)`, zIndex: index }}
          />
          // </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: 'wrap', margin: "25px 0", justifyContent: 'center' }}>
        {cards.sort().map((e) => (
          <img
            className={`card ${e === 'J0' ? 'joker-card' : ''}`}
            onClick={() => playCard(e)}
            // style={{ width: "60px", margin: "0 5px" }}
            key={e}
            src={images[`${e}.svg`]}
            alt={`card ${e}`}
          />
        ))}
      </div>
      {!board.gameStart && (
        <button onClick={start} className="start-btn">
          Start
        </button>
      )}

      {/* <div className="cart">
        <h2>Number of items in Cart: {numOfItems}</h2>
        <button onClick={addItem}>Add Item to Cart</button>
        <button disabled={numOfItems > 0 ? false : true} onClick={deleteItem}>
          Remove Item to Cart
        </button>
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  numOfItems: state.board.numOfItems,
  loading: state.board.loading,
  error: state.board.error,
  board: state.board.board,
  activePlayer: state.board.activePlayer,
});

export default connect(mapStateToProps, {
  addItem: () => addItem(),
  deleteItem: () => deleteItem(),
})(Board);

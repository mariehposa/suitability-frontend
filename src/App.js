import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store";
import Board from "./components/Board";
import Notification from "./components/Notification";
import Rules from "./components/Rules";
import { socket } from "./socket";
import { socketConstants } from "./utils/index.js";
import { setUserId } from "./redux/actionCreators/user";
import "./App.css";

function App() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	useEffect(() => {
		// no-op if the socket is already connected
		socket.connect();

		socket.on(socketConstants.connect, () => {
			dispatch(setUserId(socket.id));
		});

		return () => {
			socket.off(socketConstants.connect);
			socket.disconnect();
		};
	}, []);

	return (
		<Provider store={store}>
			{/* <PersistGate loading={<Board />} persistor={persistor}> */}
			<div className="App">
				<div className="field">
					<p className="game-name">Suitability</p>
					<Board />
					<Rules />
				</div>
				<Notification />
			</div>
			{/* </PersistGate> */}
		</Provider>
	);
}

export default App;

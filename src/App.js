import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import Board from "./components/Board";
import Notification from "./components/Notification";
import Rules from "./components/Rules";
import { socket } from "./socket";
import { socketConstants } from "./utils/index.js";
import { setUserId } from "./redux/actionCreators/user";
import logo from "./assets/logo.png";
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
      <BrowserRouter>
        <Routes>
          <Route path="/:roomId" element={<AppStructure />} />
          <Route path="/*" element={<AppStructure />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

const AppStructure = () => {
  return (
    <div className="App">
      <div className="field">
        <div className="logo-img-wrapper">
          <img src={logo} alt="suitability-logo" />
          <p className="game-name">Suitability</p>
        </div>
        <Board />
        <Rules />
      </div>
      <Notification />
    </div>
  );
};

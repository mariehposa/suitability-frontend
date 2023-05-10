import React, { useEffect } from "react";
import Board from "./components/Board";
import Notification from "./components/Notification";
import { socket } from "./socket";
import "./App.css";

function App() {

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
	
	return (
		<div className="App">
			<Board />
      <Notification />
		</div>
	);
}

export default App;

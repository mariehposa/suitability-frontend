import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import BoardReducer from "../redux/reducers/board";
import UserReducer from "../redux/reducers/user";
import NotificationReducer from "../redux/reducers/notification";

const allReducers = combineReducers({
	board: BoardReducer,
	user: UserReducer,
	notification: NotificationReducer,
});

export const store = createStore(allReducers, compose(applyMiddleware(thunk)));

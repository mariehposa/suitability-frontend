import * as types from "../actionTypes/actionTypes";

const initialState = {
	numOfItems: 0,
	loading: false,
	error: "",
	gameStart: false,
	activePlayer: "",
	newCard: "",
	board: [],
	playerTricks: 0,
	playerScores: 0,
};

const BoardReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.ADD_ITEM:
			return {
				...state,
				numOfItems: state.numOfItems + 1,
				payload,
			};

		case types.GAME_START:
			return {
				...state,
				gameStart: true,
				board: [],
			};

		case types.PLAYER_CHANGE:
			return {
				...state,
				activePlayer: payload,
			};

		case types.PLAYER_TRICKS:
			return {
				...state,
				playerTricks: payload,
			};

		// case types.PLAYER_SCORES:
		// 	return {
		// 		...state,
		// 		playerScores: payload,
		// 	};

		case types.NEW_CARD:
			return {
				...state,
				board: payload,
				newCard: payload?.slice(-1)[0],
			};

		case types.DELETE_ITEM:
			return {
				...state,
				numOfItems: state.numOfItems - 1,
				payload,
			};

		default:
			return state;
	}
};

export default BoardReducer;

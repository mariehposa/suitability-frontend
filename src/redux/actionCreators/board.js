import * as types from "../actionTypes/actionTypes";

export const addItem = () => {
	return {
		type: types.ADD_ITEM,
	};
};

export const deleteItem = () => {
	return {
		type: types.DELETE_ITEM,
	};
};

export const updateBoard = (board) => {
	return {
		type: types.NEW_CARD,
		payload: board,
	};
};

export const updatePlayerTricks = (tricksObj) => (dispatch, getState) => {
	dispatch({
		type: types.PLAYER_TRICKS,
		payload: tricksObj, //[getState().user.userId] ?? 0
	});
};

export const updatePlayerScores = (scoresObj) => (dispatch, getState) => {
	dispatch({
		type: types.PLAYER_SCORES,
		payload: scoresObj,
	});
};

export const startGame = () => {
	return {
		type: types.GAME_START,
	};
};

export const changePlayer = (playerId) => {
	return {
		type: types.PLAYER_CHANGE,
		payload: playerId,
	};
};

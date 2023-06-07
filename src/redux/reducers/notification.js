import * as types from "../actionTypes/actionTypes";

const initialState = {
	playerScores: {},
};

const NotificationReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
      case types.PLAYER_SCORES:
        return {
          ...state,
          playerScores: payload,
        }
        default:
          return state;
      }
};

export default NotificationReducer;
import * as types from "../actionTypes/actionTypes";

const initialState = {
  user: ""
};

const NotificationReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ADD_USER:
          return {
            ...state,
            user: state.user + 1,
            payload,
          };
        default:
          return state;
      }
};

export default NotificationReducer;
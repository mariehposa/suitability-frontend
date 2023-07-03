import * as types from "../actionTypes/actionTypes";

const initialState = {
	userId: "0",
	loading: false,
	error: "",
};

const UserReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.SET_USER:
			return {
				...state,
				userId: payload,
			};

		default:
			return state;
	}
};

export default UserReducer;

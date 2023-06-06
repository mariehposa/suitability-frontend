import * as types from "../actionTypes/actionTypes";

export const setUserId = (id) => {
  return {
    type: types.SET_USER,
    payload: id
  };
};
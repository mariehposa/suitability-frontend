import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import BoardReducer from "../redux/reducers/board";
import UserReducer from "../redux/reducers/user";
import NotificationReducer from "../redux/reducers/notification";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const allReducers = combineReducers({
  board: BoardReducer,
  user: UserReducer,
  notification: NotificationReducer,
});

// const pReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(allReducers, compose(applyMiddleware(thunk)));

// export const persistor = persistStore(store);

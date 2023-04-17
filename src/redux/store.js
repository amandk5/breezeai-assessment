import {
  combineReducers,
  legacy_createStore,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

const createComposer = compose;

export const store = legacy_createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);

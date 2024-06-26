import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import conversationReducer from "./slices/conversation";

// slices
const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  // blacklist: ['navigation'], // navigation will not be persisted
  // whitelist: ['navigation'] // only navigation will be persisted
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversationReducer
});

export { rootPersistConfig, rootReducer };

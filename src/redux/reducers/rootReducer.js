import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import authReducer from "../features/AuthenticationSlice";
import messageReducer from "../features/Message";


const appReducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
})

const reducers = (state, action) => {
    if (action.type === "RESET") {
        // for all keys defined in your persistConfig(s)
        storage.removeItem('persist:root')
        return appReducer(undefined, action);
    }
    return appReducer(state, action)
}

export default reducers
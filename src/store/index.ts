import { combineReducers, createStore } from 'redux'
import { userReducer } from "./user"
import { postReducer } from './posts'

const rootReducer = combineReducers({
    userState: userReducer,
    postState: postReducer
});

export type AppState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer);

export default store;
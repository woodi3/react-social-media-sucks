import { UserState, UpdateUserAction, UPDATE_USER } from "./types";
import { User } from "../../models";

const initialState: UserState = {
    user: User.getUserFromLocalStorage() || {}
}

export function userReducer(state = initialState, action: UpdateUserAction): UserState {
    switch(action.type){
        case UPDATE_USER: {
            return {
                user: {...action.payload}
            }
        }
        default:
            return state
    }
}
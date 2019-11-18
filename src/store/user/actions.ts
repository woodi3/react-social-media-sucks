import { IUser } from "../../models";
import { UpdateUserAction, UPDATE_USER } from "./types";


export function updateUser(newUser: IUser): UpdateUserAction {
    return {
        type: UPDATE_USER,
        payload: newUser
    }
}
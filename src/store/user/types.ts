import { IUser } from "../../models";

export interface UserState {
    user: IUser
}

export const UPDATE_USER = 'UPDATE_USER';

export interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: IUser;
}

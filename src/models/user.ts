import {LOCAL_STORAGE_PREFIX} from '../constants';
export interface IUser {
    id?: string;
    username: string;
    password?: string;
}

export class User {
    username: string;
    password: string = "";
    id: string = "";

    private static localStorageKey = `${LOCAL_STORAGE_PREFIX}user`;

    constructor(username: string, password?: string, id?:string){
        this.username = username;
        if(password)
            this.password = password;
        if(id)
            this.id = id;
    }

    static getUserFromLocalStorage(): User {
        const userStr = localStorage.getItem(User.localStorageKey);
        if(userStr){
            const user = JSON.parse(userStr);
            return new User(user.username, '', user.id);
        }
        return new User("");
    }

    setUserLocalStorage() {
        localStorage.setItem(User.localStorageKey, JSON.stringify(this.getUser()));
    }

    getUser(): IUser {
        return {
            username: this.username,
            password: this.password,
            id: this.id
        };
    }

}
import {LOCAL_STORAGE_PREFIX} from '../constants';

export default class TokenService {

    static setToken(jwt: string) {
        localStorage.setItem(`${LOCAL_STORAGE_PREFIX}token`, jwt);
    }

    static getToken(): string {
        let token = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}token`);
        if(token){
            return token;
        }
        return "";
    }
}
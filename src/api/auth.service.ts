import TokenService from './token.service';
import {APIService} from './api.service';
import { APIResponse } from '../models';

export class AuthService {
    static async isAuthenticated(): Promise<boolean> {
        let isAuth: boolean = false;
        const token = TokenService.getToken();
        let api = new APIService(token).setMethod("GET");
        api = api.setHeaders([
            {
                key: 'Accept',
                value: 'application/json'
            }, 
            {
                key: 'Content-Type',
                value: 'application/json'
            },
            {
                key: 'Authorization',
                value: 'Bearer '+api.jwtToken
            }
        ]);
        const request = api.createRequest<APIResponse<boolean>>("user/token");
        try {
            const result = await api.send<APIResponse<boolean>>(request);
            if(result.data.item) {
                isAuth = true;
            }
        } catch (e) {
            isAuth = false;
        }
        return isAuth;
    }
}